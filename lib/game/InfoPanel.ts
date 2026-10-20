import Phaser from "phaser";
import { Analytics } from "./analytics";

interface ExperienceData {
    company: string;
    location: string;
    title: string;
    period: string;
    description: string;
    highlights: string[];
    technologies: string[];
}

interface GameData {
    id: number;
    title: string;
    description: string;
    status: string;
    tags: string[];
    image: string;
    link: string;
    engine: string;
}

export default class InfoPanel {
    private scene: Phaser.Scene;
    private container: Phaser.GameObjects.Container;
    private overlay: Phaser.GameObjects.Rectangle;
    private background: Phaser.GameObjects.Rectangle;
    private content: Phaser.GameObjects.Container;
    private footer: Phaser.GameObjects.Container;
    private footerDivider: Phaser.GameObjects.Rectangle;
    private footerButtons: Phaser.GameObjects.Container;
    private contentMaskGfx: Phaser.GameObjects.Graphics;
    private contentMask: Phaser.Display.Masks.GeometryMask;
    private closeCallback?: () => void;
    private buttons: Array<{ container: Phaser.GameObjects.Container; action: () => void }> = [];
    private focusedButtonIndex = 0;
    private keyboardListener?: (event: KeyboardEvent) => void;
    private updateListener?: (time: number, delta: number) => void;
    private lastMobileAxisX = 0;
    private lastMobileInteractState = false;
    private nextFocusMoveAt = 0;
    private pendingUnlock = false;
    private scrollY = 0;
    private maxScrollY = 0;
    private panelWidth = 700;
    private panelHeight = 500;

    private currentGame?: GameData;
    private currentExperience?: ExperienceData;
    private pendingImageKeys = new Set<string>();

    private readonly mobileFooterHeight = 86;
    private readonly desktopFooterHeight = 76;
    private readonly mobilePadding = 16;
    private readonly desktopPadding = 24;
    private readonly headerHeight = 0;

    private resizeListener?: () => void;
    private isDestroyed = false;

    private hudPrevState?: { active: boolean; visible: boolean };

    constructor(scene: Phaser.Scene) {
        this.scene = scene;

        // Create main container - will be positioned and scaled based on camera
        this.container = this.scene.add.container(0, 0);
        this.container.setScrollFactor(0);
        this.container.setDepth(15000); // Above HUD
        this.container.setVisible(false);

        // Render via UI camera (if available) so it isn't affected by world camera zoom.
        const baseScene = this.scene as any;
        if (baseScene.registerUIObject) {
            baseScene.registerUIObject(this.container);
        }

        // Background overlay (full screen)
        this.overlay = this.scene.add.rectangle(
            0,
            0,
            this.scene.scale.width,
            this.scene.scale.height,
            0x000000,
            0.75
        );
        this.overlay.setOrigin(0.5);
        this.overlay.setInteractive(); // Block clicks from passing through
        this.container.add(this.overlay);

        // Panel background
        this.background = this.scene.add.rectangle(
            0,
            0,
            this.panelWidth,
            this.panelHeight,
            0x000000,
            0.6
        );
        this.background.setStrokeStyle(3, 0x6e84e7);
        this.container.add(this.background);

        // Content container (scrollable)
        this.content = this.scene.add.container(0, 0);
        this.container.add(this.content);

        // Footer (fixed action bar)
        this.footer = this.scene.add.container(0, 0);
        this.footerDivider = this.scene.add.rectangle(0, 0, this.panelWidth, 2, 0x6e84e7, 0.35);
        this.footerButtons = this.scene.add.container(0, 0);
        this.footer.add([this.footerDivider, this.footerButtons]);
        this.container.add(this.footer);

        // Clip content to the panel viewport (prevents text/buttons from drawing under the footer)
        // IMPORTANT: don't add the mask Graphics to the display list, otherwise it will render
        // as a solid rectangle (Canvas renderer) or as a normal Graphics draw.
        this.contentMaskGfx = this.scene.make.graphics({ x: 0, y: 0, add: false } as any);
        this.contentMask = new Phaser.Display.Masks.GeometryMask(this.scene, this.contentMaskGfx);
        this.content.setMask(this.contentMask);

        // Initial layout; will be recomputed on show/resize.
        this.updateLayout();
        this.positionContainer();

        // Setup keyboard navigation
        this.setupKeyboardNavigation();

        // Keep layout/position correct when rotating/resizing.
        this.resizeListener = () => {
            this.updateLayout();
            if (this.container.visible) {
                this.positionContainer();

                // Re-render current content so wordWrap widths + layout update with the new panel size.
                // This keeps text from overflowing after desktop resize / mobile orientation changes.
                const prevScroll = this.scrollY;
                if (this.currentGame) {
                    this.renderGameContent(this.currentGame);
                } else if (this.currentExperience) {
                    this.renderExperienceContent(this.currentExperience);
                }

                this.recomputeScrollBounds();
                this.scrollY = Phaser.Math.Clamp(prevScroll, 0, this.maxScrollY);
                this.updateContentPosition();
            }
        };
        this.scene.scale.on("resize", this.resizeListener);

        // Ensure we clean up global listeners when the scene shuts down.
        this.scene.events.once(Phaser.Scenes.Events.SHUTDOWN, () => this.destroy());
        this.scene.events.once(Phaser.Scenes.Events.DESTROY, () => this.destroy());
    }

    private getPadding(): number {
        const isMobile = !this.scene.game.device.os.desktop;
        return isMobile ? this.mobilePadding : this.desktopPadding;
    }

    private getFooterHeight(): number {
        const isMobile = !this.scene.game.device.os.desktop;
        return isMobile ? this.mobileFooterHeight : this.desktopFooterHeight;
    }

    private updateLayout() {
        const isMobile = !this.scene.game.device.os.desktop;
        const gameWidth = this.scene.scale.width;
        const gameHeight = this.scene.scale.height;

        if (isMobile) {
            // Full-screen modal on mobile for readability
            this.panelWidth = gameWidth;
            this.panelHeight = gameHeight;
        } else {
            // Large centered modal on desktop
            this.panelWidth = Math.min(900, gameWidth * 0.92);
            this.panelHeight = Math.min(680, gameHeight * 0.9);
        }

        // Keep overlay and panel sized to current screen-space.
        this.overlay.setSize(gameWidth, gameHeight);
        this.overlay.setDisplaySize(gameWidth, gameHeight);
        this.background.setSize(this.panelWidth, this.panelHeight);
        this.background.setDisplaySize(this.panelWidth, this.panelHeight);

        // Footer sizing and placement (relative to panel)
        const footerHeight = this.getFooterHeight();
        this.footerDivider.setSize(this.panelWidth, 2);
        this.footerDivider.setDisplaySize(this.panelWidth, 2);
        this.footerDivider.setPosition(0, -footerHeight / 2);
        this.footer.setPosition(0, this.panelHeight / 2 - footerHeight / 2);

        // Update content base position and mask
        const padding = this.getPadding();
        const contentTopY = -this.panelHeight / 2 + this.headerHeight + padding;
        this.content.setPosition(0, contentTopY - this.scrollY);

        const viewportHeight = this.panelHeight - this.headerHeight - footerHeight - padding * 2;
        const viewportWidth = this.panelWidth - padding * 2;

        // Keep mask aligned with the container (content is drawn in container-local coords)
        this.contentMaskGfx.setPosition(this.container.x, this.container.y);

        this.contentMaskGfx.clear();
        this.contentMaskGfx.fillStyle(0xffffff, 1);
        this.contentMaskGfx.fillRect(
            -viewportWidth / 2,
            contentTopY,
            viewportWidth,
            Math.max(0, viewportHeight)
        );
    }

    private positionContainer() {
        const gameWidth = this.scene.scale.width;
        const gameHeight = this.scene.scale.height;

        // UI camera uses zoom=1, so keep it in screen-space coordinates.
        this.container.setScale(1);

        // Always center the modal in screen space.
        this.container.setPosition(gameWidth / 2, gameHeight / 2);

        // Keep mask aligned with the container (mask is defined in container-local coords)
        this.contentMaskGfx.setPosition(this.container.x, this.container.y);
    }

    private recomputeScrollBounds() {
        const padding = this.getPadding();
        const footerHeight = this.getFooterHeight();

        const contentBounds = this.getContentBounds();
        const viewportHeight = this.panelHeight - this.headerHeight - footerHeight - padding * 2;
        // Give extra bottom room so the last line/badges never sit under the footer.
        const extraBottom = padding;
        this.maxScrollY = Math.max(
            0,
            contentBounds.height + extraBottom - Math.max(0, viewportHeight)
        );
        this.scrollY = Phaser.Math.Clamp(this.scrollY, 0, this.maxScrollY);
        this.updateContentPosition();
    }

    private setupKeyboardNavigation() {
        this.keyboardListener = (event: KeyboardEvent) => {
            if (!this.container.visible) return;

            if (event.key === "ArrowRight" || event.key === "d" || event.key === "D") {
                this.moveFocus(1);
                event.preventDefault();
            } else if (event.key === "ArrowLeft" || event.key === "a" || event.key === "A") {
                this.moveFocus(-1);
                event.preventDefault();
            } else if (event.key === "ArrowUp" || event.key === "w" || event.key === "W") {
                this.scroll(-30);
                event.preventDefault();
            } else if (event.key === "ArrowDown" || event.key === "s" || event.key === "S") {
                this.scroll(30);
                event.preventDefault();
            } else if (event.key === "Enter") {
                this.activateButton();
                event.preventDefault();
            }
        };

        window.addEventListener("keydown", this.keyboardListener);
    }

    private ensureUpdateListener() {
        if (this.updateListener) return;

        this.updateListener = (_time: number, delta: number) => {
            const mobileInput = (this.scene.registry.get("mobileInput") as any) || {
                x: 0,
                y: 0,
                interact: false,
            };
            const axisX = typeof mobileInput.x === "number" ? mobileInput.x : 0;
            const axisY = typeof mobileInput.y === "number" ? mobileInput.y : 0;
            const interact = !!mobileInput.interact;

            // If we just closed the panel via the mobile interact button,
            // keep movement locked until the interact is released.
            if (this.pendingUnlock) {
                if (!interact) {
                    this.pendingUnlock = false;
                    const baseScene = this.scene as any;
                    if (baseScene.setMovementLocked) {
                        baseScene.setMovementLocked(false);
                    }

                    // If panel is hidden, we can stop polling.
                    if (!this.container.visible) {
                        this.removeUpdateListener();
                    }
                }

                this.lastMobileAxisX = axisX;
                this.lastMobileInteractState = interact;
                return;
            }

            if (!this.container.visible) return;

            // Joystick X: discrete focus navigation
            const now = typeof performance !== "undefined" ? performance.now() : Date.now();
            const xDeadZone = 0.65;
            if (now >= this.nextFocusMoveAt) {
                if (axisX > xDeadZone && this.lastMobileAxisX <= xDeadZone) {
                    this.moveFocus(1);
                    this.nextFocusMoveAt = now + 180;
                } else if (axisX < -xDeadZone && this.lastMobileAxisX >= -xDeadZone) {
                    this.moveFocus(-1);
                    this.nextFocusMoveAt = now + 180;
                }
            }
            this.lastMobileAxisX = axisX;

            // Joystick Y: continuous scroll (positive => down)
            const yDeadZone = 0.35;
            if (Math.abs(axisY) > yDeadZone) {
                const scrollSpeed = 0.35; // px/ms at full tilt
                this.scroll(axisY * scrollSpeed * delta);
            }

            // Mobile "A" button: activate focused button
            if (interact && !this.lastMobileInteractState) {
                this.activateButton();
            }
            this.lastMobileInteractState = interact;
        };

        this.scene.events.on("update", this.updateListener);
    }

    private removeUpdateListener() {
        if (!this.updateListener) return;
        this.scene.events.off("update", this.updateListener);
        this.updateListener = undefined;
    }

    private scroll(amount: number) {
        this.scrollY += amount;
        this.scrollY = Phaser.Math.Clamp(this.scrollY, 0, this.maxScrollY);
        this.updateContentPosition();
    }

    private updateContentPosition() {
        const padding = this.getPadding();
        const baseY = -this.panelHeight / 2 + this.headerHeight + padding;
        this.content.setY(baseY - this.scrollY);
    }

    private moveFocus(direction: number) {
        if (this.buttons.length === 0) return;

        // Remove highlight from current button
        this.updateButtonHighlight(this.focusedButtonIndex, false);

        // Move focus
        this.focusedButtonIndex =
            (this.focusedButtonIndex + direction + this.buttons.length) % this.buttons.length;

        // Add highlight to new button
        this.updateButtonHighlight(this.focusedButtonIndex, true);
    }

    private setFocus(index: number) {
        if (this.buttons.length === 0) return;
        if (index < 0 || index >= this.buttons.length) return;
        if (index === this.focusedButtonIndex) return;

        this.updateButtonHighlight(this.focusedButtonIndex, false);
        this.focusedButtonIndex = index;
        this.updateButtonHighlight(this.focusedButtonIndex, true);
    }

    private activateButton() {
        if (this.buttons.length > 0 && this.buttons[this.focusedButtonIndex]) {
            this.buttons[this.focusedButtonIndex].action();
        }
    }

    private updateButtonHighlight(index: number, highlighted: boolean) {
        if (!this.buttons[index]) return;

        const buttonContainer = this.buttons[index].container;
        const bg = buttonContainer.getAt(0) as Phaser.GameObjects.Rectangle;
        const label = buttonContainer.getAt(1) as Phaser.GameObjects.Text;

        // Determine if this is a Close button
        const isCloseButton = label.text === "Close";

        if (highlighted) {
            if (isCloseButton) {
                bg.setFillStyle(0x374151);
                bg.setStrokeStyle(3, 0xffffff);
            } else {
                bg.setFillStyle(0x2563eb);
                bg.setStrokeStyle(3, 0xffffff);
            }
        } else {
            if (isCloseButton) {
                bg.setFillStyle(0x4a5568);
                bg.setStrokeStyle(2, 0x374151);
            } else {
                bg.setFillStyle(0x3b82f6);
                bg.setStrokeStyle(2, 0x2563eb);
            }
        }
    }

    async showGame(gameIndex: number) {
        try {
            const response = await fetch("/data/games.json");
            const games: GameData[] = await response.json();
            //const game = games.find((g) => g.id.toString() === gameId);
            const game = games[gameIndex];

            if (!game) {
                this.showError("Game not found");
                return;
            }

            this.currentGame = game;
            this.currentExperience = undefined;
            this.renderGameContent(game);
            this.show();
        } catch (error) {
            console.error("Error fetching game data:", error);
            this.showError("Failed to load game data");
        }
    }

    async showExperience(experienceId: string) {
        try {
            const response = await fetch("/data/experiences.json");
            const experiences: ExperienceData[] = await response.json();
            const index = parseInt(experienceId, 10);
            const experience = experiences[index];

            if (!experience) {
                this.showError("Experience not found");
                return;
            }

            this.currentExperience = experience;
            this.currentGame = undefined;
            this.renderExperienceContent(experience);
            this.show();
        } catch (error) {
            console.error("Error fetching experience data:", error);
            this.showError("Failed to load experience data");
        }
    }

    private renderGameContent(game: GameData) {
        this.content.removeAll(true);

        // Small inset so top badges/text aren't clipped by the content mask.
        let yOffset = 18;

        // Status and Engine badges at top
        const statusColor = game.status === "released" ? "#4ade80" : "#fbbf24";
        const statusText = game.status === "released" ? "Released" : "In Development";

        const badgeContainer = this.scene.add.container(0, yOffset);
        const statusBadge = this.createBadge(statusText, statusColor, 0);
        const engineBadge = this.createBadge(game.engine.toUpperCase(), "#3b82f6", 0);

        // Space badges based on their real widths so longer text doesn't overlap.
        const gap = 14;
        const statusBg = statusBadge.getAt(0) as Phaser.GameObjects.Rectangle;
        const engineBg = engineBadge.getAt(0) as Phaser.GameObjects.Rectangle;
        const statusW = statusBg.displayWidth || statusBg.width;
        const engineW = engineBg.displayWidth || engineBg.width;
        const totalW = statusW + gap + engineW;

        const padding = this.getPadding();
        const maxW = this.panelWidth - padding * 2;
        const badgeH = Math.max(
            statusBg.displayHeight || statusBg.height,
            engineBg.displayHeight || engineBg.height
        );

        if (totalW > maxW) {
            // Too tight: stack vertically and keep centered.
            statusBadge.setPosition(0, 0);
            engineBadge.setPosition(0, badgeH + 10);
            yOffset += badgeH * 2 + 18;
        } else {
            // Side-by-side with consistent gap.
            statusBadge.setPosition(-totalW / 2 + statusW / 2, 0);
            engineBadge.setPosition(totalW / 2 - engineW / 2, 0);
            yOffset += badgeH + 12;
        }

        badgeContainer.add([statusBadge, engineBadge]);
        this.content.add(badgeContainer);

        // Title above image
        const title = this.scene.add.text(0, yOffset, game.title, {
            fontFamily: '"Press Start 2P"',
            fontSize: "20px",
            color: "#ffffff",
            fontStyle: "bold",
            align: "center",
            wordWrap: { width: this.panelWidth - 60 },
        });
        title.setOrigin(0.5, 0);
        this.content.add(title);
        yOffset += title.height;

        // Game image - load dynamically
        const imageKey = `game_image_${game.id}`;
        const imageUrl = `https://augustopolonio.vercel.app${game.image}`;

        // Check if already loaded; guard against adding duplicate load listeners during resize re-renders.
        if (this.scene.textures.exists(imageKey)) {
            this.addGameImage(imageKey, yOffset, game);
            return;
        }

        // If load is already in flight, keep the UI content without spamming load/start.
        if (this.pendingImageKeys.has(imageKey)) {
            // Render a placeholder; image will be injected when load completes.
            this.addGameImage(imageKey, yOffset, game);
            return;
        }

        this.pendingImageKeys.add(imageKey);
        this.scene.load.image(imageKey, imageUrl);
        this.scene.load.once("complete", () => {
            this.pendingImageKeys.delete(imageKey);
            // Only update if this panel is still showing the same game.
            if (this.container.visible && this.currentGame?.id === game.id) {
                this.addGameImage(imageKey, yOffset, game);
                this.recomputeScrollBounds();
            }
        });
        this.scene.load.start();
    }

    private addGameImage(imageKey: string, startYOffset: number, game: GameData) {
        // Remove loading placeholder if exists
        const existingImage = this.content
            .getAll()
            .find((obj: any) => obj.name === "game_image_container");
        if (existingImage) {
            existingImage.destroy();
        }

        const topMargin = 20;
        const imageTopY = startYOffset + topMargin;
        const imageContainer = this.scene.add.container(0, imageTopY);
        imageContainer.name = "game_image_container";

        const padding = this.getPadding();
        const isMobile = !this.scene.game.device.os.desktop;
        const maxWidth = Math.max(
            220,
            Math.min(isMobile ? 720 : 620, this.panelWidth - padding * 2 - 24)
        );
        // Let the image grow on larger panels, but keep a sensible bound.
        const maxHeight = Math.max(
            140,
            Math.min(isMobile ? 420 : 340, Math.floor(this.panelHeight * 0.45))
        );

        let imageDisplayHeight = 170;

        if (this.scene.textures.exists(imageKey)) {
            const gameImage = this.scene.add.image(0, 0, imageKey);
            // Scale to fit within responsive bounds
            const scale = Math.min(maxWidth / gameImage.width, maxHeight / gameImage.height, 1);
            gameImage.setScale(scale);
            imageDisplayHeight = gameImage.displayHeight;
            imageContainer.add(gameImage);
        } else {
            // Fallback if image fails to load
            const imageBox = this.scene.add.rectangle(
                0,
                0,
                maxWidth,
                Math.min(240, maxHeight),
                0x2a2a2a
            );
            imageBox.setStrokeStyle(2, 0x4a4a4a);
            const imageText = this.scene.add.text(0, 0, "🎮", {
                fontFamily: '"Press Start 2P"',
                fontSize: "48px",
            });
            imageText.setOrigin(0.5);
            imageContainer.add([imageBox, imageText]);

            imageDisplayHeight = imageBox.displayHeight;
        }

        // Top-align the image so it never overlaps the title above.
        imageContainer.setY(imageTopY + imageDisplayHeight / 2);

        this.content.add(imageContainer);

        // Advance yOffset based on actual image size.
        const bottomY = imageContainer.y + imageDisplayHeight / 2;
        let yOffset = bottomY + 22;

        // Description
        const description = this.scene.add.text(0, yOffset, game.description, {
            fontFamily: '"Press Start 2P"',
            fontSize: "14px",
            color: "#cccccc",
            align: "center",
            wordWrap: { width: this.panelWidth - padding * 2 - 24 },
            lineSpacing: 5,
        });
        description.setOrigin(0.5, 0);
        this.content.add(description);
        yOffset += description.height + 20;

        // Fixed footer actions
        if (game.link && !game.link.includes("/unreleased-projects")) {
            this.setFooterActions([
                {
                    text: "Play Game",
                    action: () => {
                        Analytics.trackExternalLinkClick(game.link, game.title);
                        window.open(game.link, "_blank");
                    },
                },
                { text: "Close", action: () => this.close() },
            ]);
        } else {
            this.setFooterActions([{ text: "Close", action: () => this.close() }]);
        }

        // Async image/content affects scroll bounds; recompute if panel is already showing.
        if (this.container.visible) {
            this.recomputeScrollBounds();
        }
    }

    private renderExperienceContent(experience: ExperienceData) {
        this.content.removeAll(true);

        let yOffset = 10;

        const padding = this.getPadding();
        const contentWidth = Math.max(180, this.panelWidth - padding * 2);
        const leftX = -(this.panelWidth / 2) + padding;

        // Company & Title
        const company = this.scene.add.text(0, yOffset, experience.company, {
            fontFamily: '"Press Start 2P"',
            fontSize: "28px",
            color: "#ffffff",
            fontStyle: "bold",
            align: "center",
            wordWrap: { width: contentWidth },
        });
        company.setOrigin(0.5, 0);
        this.content.add(company);
        yOffset += company.height + 10;

        // Job Title
        const jobTitle = this.scene.add.text(0, yOffset, experience.title, {
            fontFamily: '"Press Start 2P"',
            fontSize: "18px",
            color: "#60a5fa",
            align: "center",
            wordWrap: { width: contentWidth, useAdvancedWrap: true },
        });
        jobTitle.setOrigin(0.5, 0);
        this.content.add(jobTitle);
        yOffset += jobTitle.height + 10;

        // Period & Location
        const periodLocation = this.scene.add.text(
            0,
            yOffset,
            `${experience.period} • ${experience.location}`,
            {
                fontFamily: '"Press Start 2P"',
                fontSize: "16px",
                color: "#888888",
                align: "center",
                wordWrap: { width: contentWidth, useAdvancedWrap: true },
            }
        );
        periodLocation.setOrigin(0.5, 0);
        this.content.add(periodLocation);
        yOffset += periodLocation.height + 25;

        // Description
        const description = this.scene.add.text(0, yOffset, experience.description, {
            fontFamily: '"Press Start 2P"',
            fontSize: "14px",
            color: "#cccccc",
            align: "center",
            wordWrap: { width: contentWidth, useAdvancedWrap: true },
            lineSpacing: 5,
        });
        description.setOrigin(0.5, 0);
        this.content.add(description);
        yOffset += description.height + 25;

        // Highlights
        if (experience.highlights.length > 0) {
            const highlightsTitle = this.scene.add.text(0, yOffset, "Key Highlights:", {
                fontFamily: '"Press Start 2P"',
                fontSize: "16px",
                color: "#ffffff",
                fontStyle: "bold",
            });
            highlightsTitle.setOrigin(0.5, 0);
            this.content.add(highlightsTitle);
            yOffset += highlightsTitle.height + 15;

            experience.highlights.forEach((highlight) => {
                const bulletPoint = this.scene.add.text(leftX, yOffset, `• ${highlight}`, {
                    fontFamily: '"Press Start 2P"',
                    fontSize: "12px",
                    color: "#aaaaaa",
                    wordWrap: { width: contentWidth, useAdvancedWrap: true },
                    lineSpacing: 3,
                });
                bulletPoint.setOrigin(0, 0);
                this.content.add(bulletPoint);
                yOffset += bulletPoint.height + 10;
            });

            yOffset += 10;
        }

        // Technologies
        if (experience.technologies.length > 0) {
            const techTitle = this.scene.add.text(0, yOffset, "Technologies:", {
                fontFamily: '"Press Start 2P"',
                fontSize: "16px",
                color: "#ffffff",
                fontStyle: "bold",
            });
            techTitle.setOrigin(0.5, 0);
            this.content.add(techTitle);
            yOffset += techTitle.height + 35;

            // Create technology badges
            const techContainer = this.scene.add.container(0, yOffset);
            const maxWidth = contentWidth;
            const gap = 10;
            type BadgeInfo = {
                badge: Phaser.GameObjects.Container;
                width: number;
                height: number;
            };

            const allBadges: BadgeInfo[] = experience.technologies.map((tech) => {
                const badge = this.createTechBadge(tech);
                const badgeBg = badge.getAt(0) as Phaser.GameObjects.Rectangle;
                const width = badgeBg.displayWidth || badgeBg.width;
                const height = badgeBg.displayHeight || badgeBg.height;
                return { badge, width, height };
            });

            const rows: BadgeInfo[][] = [];
            let currentRow: BadgeInfo[] = [];
            let currentRowWidth = 0;

            for (const info of allBadges) {
                const nextWidth = (currentRow.length > 0 ? gap : 0) + info.width;
                if (currentRow.length > 0 && currentRowWidth + nextWidth > maxWidth) {
                    rows.push(currentRow);
                    currentRow = [];
                    currentRowWidth = 0;
                }
                currentRow.push(info);
                currentRowWidth += (currentRow.length > 1 ? gap : 0) + info.width;
            }
            if (currentRow.length > 0) rows.push(currentRow);

            let yPos = 0;
            const rowGap = 10;

            for (const row of rows) {
                const rowHeight = Math.max(...row.map((r) => r.height)) + rowGap;
                const rowWidth =
                    row.reduce((sum, r) => sum + r.width, 0) + gap * Math.max(0, row.length - 1);
                let x = -rowWidth / 2;

                for (const r of row) {
                    r.badge.setPosition(x + r.width / 2, yPos);
                    techContainer.add(r.badge);
                    x += r.width + gap;
                }

                yPos += rowHeight;
            }

            this.content.add(techContainer);

            // Compute total height of badge rows (container-local coords)
            let maxCenterY = 0;
            let maxHalfH = 0;
            techContainer.iterate((child: any) => {
                if (!child) return;
                if (typeof child.y === "number") {
                    maxCenterY = Math.max(maxCenterY, child.y);
                }
                if (typeof child.getBounds === "function") {
                    const b = child.getBounds();
                    const h = Math.max(0, b.height);
                    maxHalfH = Math.max(maxHalfH, h / 2);
                }
            });
            const containerHeight = maxCenterY + maxHalfH * 2;
            yOffset += containerHeight + 20;
        }

        // Fixed footer actions
        this.setFooterActions([{ text: "Close", action: () => this.close() }]);
    }

    private setFooterActions(actions: Array<{ text: string; action: () => void }>) {
        this.footerButtons.removeAll(true);
        this.buttons = [];

        const isMobile = !this.scene.game.device.os.desktop;
        const availableWidth = this.panelWidth - this.getPadding() * 2;

        const maxButtons = Math.max(1, actions.length);
        const gap = isMobile ? 12 : 16;
        const buttonWidth = Math.min(
            220,
            Math.floor((availableWidth - gap * (maxButtons - 1)) / maxButtons)
        );
        const buttonHeight = isMobile ? 44 : 40;

        const totalWidth = buttonWidth * maxButtons + gap * (maxButtons - 1);
        let x = -totalWidth / 2 + buttonWidth / 2;

        actions.forEach((a) => {
            const btn = this.createButton(a.text, a.action, {
                width: buttonWidth,
                height: buttonHeight,
                fontSize: isMobile ? 16 : 16,
            });
            btn.setPosition(x, 10);
            this.footerButtons.add(btn);
            x += buttonWidth + gap;
        });

        // Initial focus
        this.focusedButtonIndex = 0;
        if (this.buttons.length > 0) {
            this.updateButtonHighlight(0, true);
        }
    }

    private createBadge(
        text: string,
        color: string,
        xOffset: number
    ): Phaser.GameObjects.Container {
        const container = this.scene.add.container(xOffset, 0);
        const bg = this.scene.add.rectangle(0, 0, 10, 28, parseInt(color.replace("#", "0x")));
        bg.setStrokeStyle(2, parseInt(color.replace("#", "0x")));
        const label = this.scene.add.text(0, 0, text, {
            fontFamily: '"Press Start 2P"',
            fontSize: "14px",
            color: "#000000",
            fontStyle: "bold",
        });
        label.setOrigin(0.5);

        // Resize bg to fit the rendered text
        label.updateText();
        const padX = 14;
        bg.setSize(Math.ceil(label.width + padX * 2), 28);
        bg.setDisplaySize(bg.width, bg.height);
        container.add([bg, label]);
        return container;
    }

    private createTechBadge(text: string): Phaser.GameObjects.Container {
        const container = this.scene.add.container(0, 0);
        const bg = this.scene.add.rectangle(0, 0, 10, 28, 0x2d3748);
        bg.setStrokeStyle(1, 0x4a5568);
        const label = this.scene.add.text(0, 0, text, {
            fontFamily: '"Press Start 2P"',
            fontSize: "12px",
            color: "#e2e8f0",
        });
        label.setOrigin(0.5);

        // Resize bg to fit the rendered text
        label.updateText();
        const padX = 12;
        bg.setSize(Math.ceil(label.width + padX * 2), 28);
        bg.setDisplaySize(bg.width, bg.height);
        container.add([bg, label]);
        return container;
    }

    private createButton(
        text: string,
        action: () => void,
        options?: { width?: number; height?: number; fontSize?: number }
    ): Phaser.GameObjects.Container {
        const container = this.scene.add.container(0, 0);

        const buttonWidth = options?.width ?? 200;
        const buttonHeight = options?.height ?? 40;
        const fontSize = options?.fontSize ?? 16;

        // Use gray color for Close button, blue for others
        const isCloseButton = text === "Close";
        const bgColor = isCloseButton ? 0x4a5568 : 0x3b82f6;
        const borderColor = isCloseButton ? 0x374151 : 0x2563eb;

        const bg = this.scene.add.rectangle(0, 0, buttonWidth, buttonHeight, bgColor);
        bg.setStrokeStyle(2, borderColor);

        const label = this.scene.add.text(0, 0, text, {
            fontFamily: '"Press Start 2P"',
            fontSize: `${fontSize}px`,
            color: "#ffffff",
            fontStyle: "bold",
        });
        label.setOrigin(0.5);
        container.add([bg, label]);

        // Track button for navigation
        const buttonIndex = this.buttons.length;
        this.buttons.push({ container, action });

        const activate = () => {
            if (!this.container.visible) return;
            this.setFocus(buttonIndex);
            action();
        };

        // Pointer/touch support (mouse + mobile)
        bg.setInteractive({ useHandCursor: true });
        bg.on("pointerover", () => this.setFocus(buttonIndex));
        bg.on("pointerdown", activate);

        // Make the text clickable too (helps on small screens)
        label.setInteractive({ useHandCursor: true });
        label.on("pointerover", () => this.setFocus(buttonIndex));
        label.on("pointerdown", activate);

        return container;
    }

    private showError(message: string) {
        this.content.removeAll(true);
        const errorText = this.scene.add.text(0, 0, message, {
            fontFamily: '"Press Start 2P"',
            fontSize: "24px",
            color: "#ff6b6b",
            align: "center",
        });
        errorText.setOrigin(0.5);
        this.content.add(errorText);
        this.setFooterActions([{ text: "Close", action: () => this.close() }]);
        this.show();
    }

    show() {
        // Recompute layout for the current viewport
        this.updateLayout();
        this.positionContainer();

        // Reset scroll and compute bounds
        this.scrollY = 0;
        this.recomputeScrollBounds();

        this.container.setVisible(true);

        // Hide HUD while the panel is open (HUD is a separate Scene rendered above this one)
        this.setHudSceneVisible(false);

        this.scene.input.keyboard?.enabled && this.scene.input.keyboard.resetKeys();

        // Enable polling of mobileInput (virtual joystick + A button)
        const mobileInput = (this.scene.registry.get("mobileInput") as any) || {
            x: 0,
            y: 0,
            interact: false,
        };
        this.lastMobileAxisX = typeof mobileInput.x === "number" ? mobileInput.x : 0;
        // Important: if the panel was opened via the same interact button (A/E),
        // don't immediately treat that already-held press as a click.
        this.lastMobileInteractState = !!mobileInput.interact;
        this.nextFocusMoveAt = 0;
        this.pendingUnlock = false;
        this.ensureUpdateListener();

        // Block player movement (access through BaseScene)
        const baseScene = this.scene as any;
        if (baseScene.setMovementLocked) {
            baseScene.setMovementLocked(true);
        }
    }

    private getContentBounds(): { height: number } {
        // Use getBounds() so nested Containers (badges, tech rows, etc.) count toward height.
        // Containers often report height=0, which breaks scroll calculations.
        let minY = Number.POSITIVE_INFINITY;
        let maxY = Number.NEGATIVE_INFINITY;

        this.content.iterate((child: any) => {
            if (!child) return;

            if (typeof child.getBounds === "function") {
                const b = child.getBounds();
                if (Number.isFinite(b.top) && Number.isFinite(b.bottom)) {
                    minY = Math.min(minY, b.top);
                    maxY = Math.max(maxY, b.bottom);
                    return;
                }
            }

            // Fallback for objects without getBounds
            if (child.y !== undefined) {
                const childTop = child.y - (child.height || 0) * (child.originY || 0);
                const childBottom = child.y + (child.height || 0) * (1 - (child.originY || 0));
                minY = Math.min(minY, childTop);
                maxY = Math.max(maxY, childBottom);
            }
        });

        if (!Number.isFinite(minY) || !Number.isFinite(maxY)) {
            return { height: 0 };
        }

        return { height: Math.max(0, maxY - minY) };
    }

    close() {
        this.container.setVisible(false);

        // Clear current content pointers so we don't try to re-render after close.
        this.currentGame = undefined;
        this.currentExperience = undefined;

        // Restore HUD visibility when closing.
        this.setHudSceneVisible(true);

        // If close was triggered by the mobile interact button, the interact flag may still be true
        // for a short time. Keep movement locked until the button is released.
        const mobileInput = (this.scene.registry.get("mobileInput") as any) || {
            x: 0,
            y: 0,
            interact: false,
        };
        const isInteractStillPressed = !!mobileInput.interact;
        const baseScene = this.scene as any;
        if (baseScene.setMovementLocked) {
            if (isInteractStillPressed) {
                this.pendingUnlock = true;
                this.ensureUpdateListener();
            } else {
                baseScene.setMovementLocked(false);
                // Stop polling when hidden
                this.removeUpdateListener();
            }
        } else {
            // Stop polling when hidden
            this.removeUpdateListener();
        }

        if (this.closeCallback) {
            this.closeCallback();
            this.closeCallback = undefined;
        }
    }

    setCloseCallback(callback: () => void) {
        this.closeCallback = callback;
    }

    destroy() {
        if (this.isDestroyed) return;
        this.isDestroyed = true;

        // Ensure HUD is restored if the panel is destroyed while open.
        this.setHudSceneVisible(true);

        if (this.keyboardListener) {
            window.removeEventListener("keydown", this.keyboardListener);
        }

        if (this.resizeListener) {
            this.scene.scale.off("resize", this.resizeListener);
            this.resizeListener = undefined;
        }

        this.removeUpdateListener();
        this.contentMaskGfx?.destroy();
        this.container.destroy();
    }

    private setHudSceneVisible(visible: boolean) {
        const scenePlugin = this.scene.scene;
        if (!scenePlugin) return;

        let hud: Phaser.Scene | undefined;
        try {
            hud = scenePlugin.get("HUDScene") as Phaser.Scene;
        } catch {
            return;
        }
        if (!hud) return;

        if (!visible) {
            if (!this.hudPrevState) {
                this.hudPrevState = {
                    active: !!hud.sys.settings.active,
                    visible: !!hud.sys.settings.visible,
                };
            }
            hud.scene.setVisible(false);
            hud.scene.setActive(false);
        } else {
            if (this.hudPrevState) {
                hud.scene.setVisible(this.hudPrevState.visible);
                hud.scene.setActive(this.hudPrevState.active);
                this.hudPrevState = undefined;
            } else {
                // Default restore
                hud.scene.setVisible(true);
                hud.scene.setActive(true);
            }
        }
    }
}
