import Phaser from "phaser";
import { Analytics } from "./analytics";

export interface WelcomePanelOptions {
    message: string;
    url: string;
    primaryText?: string;
    secondaryText?: string;
    onClose?: () => void;
}

export default class WelcomePanel {
    private scene: Phaser.Scene;
    private container: Phaser.GameObjects.Container;
    private overlay: Phaser.GameObjects.Rectangle;
    private background: Phaser.GameObjects.Rectangle;
    private messageText: Phaser.GameObjects.Text;
    private buttonsContainer: Phaser.GameObjects.Container;

    private panelWidth = 520;
    private panelHeight = 230;

    private buttons: Array<{
        container: Phaser.GameObjects.Container;
        action: () => void;
        secondary: boolean;
    }> = [];
    private focusedButtonIndex = 0;

    private keyboardListener?: (event: KeyboardEvent) => void;
    private updateListener?: (time: number, delta: number) => void;
    private resizeListener?: () => void;

    private lastMobileAxisX = 0;
    private lastMobileInteractState = false;
    private nextFocusMoveAt = 0;
    private pendingUnlock = false;

    private hudPrevState?: { active: boolean; visible: boolean };
    private isDestroyed = false;

    private closeCallback?: () => void;

    private currentUrl = "";

    private fitLabelToWidth(
        label: Phaser.GameObjects.Text,
        maxWidth: number,
        maxFontSize: number,
        minFontSize: number
    ) {
        // Phaser text bounds update after changing font size; loop downward until it fits.
        for (let size = maxFontSize; size >= minFontSize; size--) {
            label.setFontSize(size);
            // Force bounds refresh
            label.updateText();
            if (label.width <= maxWidth) {
                return;
            }
        }
        label.setFontSize(minFontSize);
        label.updateText();
    }

    constructor(scene: Phaser.Scene) {
        this.scene = scene;

        this.container = this.scene.add.container(0, 0);
        this.container.setScrollFactor(0);
        this.container.setDepth(15000);
        this.container.setVisible(false);

        const baseScene = this.scene as any;
        if (baseScene.registerUIObject) {
            baseScene.registerUIObject(this.container);
        }

        this.overlay = this.scene.add.rectangle(
            0,
            0,
            this.scene.scale.width,
            this.scene.scale.height,
            0x000000,
            0.75
        );
        this.overlay.setOrigin(0.5);
        this.overlay.setInteractive();
        this.container.add(this.overlay);

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

        this.messageText = this.scene.add.text(0, 0, "", {
            fontFamily: '"Press Start 2P"',
            fontSize: "16px",
            color: "#ffffff",
            align: "center",
            wordWrap: { width: this.panelWidth - 48 },
            lineSpacing: 6,
        });
        this.messageText.setOrigin(0.5, 0.5);
        this.container.add(this.messageText);

        this.buttonsContainer = this.scene.add.container(0, 0);
        this.container.add(this.buttonsContainer);

        this.overlay.on("pointerdown", () => this.close());

        this.setupKeyboardNavigation();

        this.updateLayout();
        this.positionContainer();
        this.layoutElements();

        this.resizeListener = () => {
            this.updateLayout();
            if (this.container.visible) {
                this.positionContainer();
                this.layoutElements();
            }
        };
        this.scene.scale.on("resize", this.resizeListener);

        this.scene.events.once(Phaser.Scenes.Events.SHUTDOWN, () => this.destroy());
        this.scene.events.once(Phaser.Scenes.Events.DESTROY, () => this.destroy());
    }

    private updateLayout() {
        const isMobile = !this.scene.game.device.os.desktop;
        const gameWidth = this.scene.scale.width;
        const gameHeight = this.scene.scale.height;

        if (isMobile) {
            this.panelWidth = Math.min(620, Math.floor(gameWidth * 0.92));
            this.panelHeight = Math.min(320, Math.floor(gameHeight * 0.55));
            this.panelHeight = Math.max(240, this.panelHeight);
        } else {
            this.panelWidth = Math.min(560, Math.floor(gameWidth * 0.82));
            this.panelHeight = Math.min(240, Math.floor(gameHeight * 0.42));
            this.panelHeight = Math.max(200, this.panelHeight);
        }

        this.overlay.setSize(gameWidth, gameHeight);
        this.overlay.setDisplaySize(gameWidth, gameHeight);
        this.background.setSize(this.panelWidth, this.panelHeight);
        this.background.setDisplaySize(this.panelWidth, this.panelHeight);

        this.messageText.setWordWrapWidth(this.panelWidth - 48, true);
    }

    private positionContainer() {
        const gameWidth = this.scene.scale.width;
        const gameHeight = this.scene.scale.height;

        this.container.setScale(1);
        this.container.setPosition(gameWidth / 2, gameHeight / 2);
    }

    private layoutElements() {
        const padding = 18;
        const buttonHeight = !this.scene.game.device.os.desktop ? 44 : 40;

        const contentTop = -this.panelHeight / 2 + padding;
        const buttonsY = this.panelHeight / 2 - padding - buttonHeight / 2;

        // Center message in the remaining vertical space between top and buttons.
        const availableHeight = buttonsY - buttonHeight / 2 - contentTop;
        const messageY = contentTop + Math.max(0, (availableHeight - this.messageText.height) / 2);
        this.messageText.setPosition(0, messageY + this.messageText.height / 2);

        this.buttonsContainer.setPosition(0, buttonsY);

        // Reposition buttons (if they exist)
        this.repositionButtons();
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
            } else if (event.key === "Enter") {
                this.activateButton();
                event.preventDefault();
            } else if (event.key === "Escape") {
                this.close();
                event.preventDefault();
            }
        };

        window.addEventListener("keydown", this.keyboardListener);
    }

    private ensureUpdateListener() {
        if (this.updateListener) return;

        this.updateListener = (_time: number, _delta: number) => {
            const mobileInput = (this.scene.registry.get("mobileInput") as any) || {
                x: 0,
                y: 0,
                interact: false,
            };
            const axisX = typeof mobileInput.x === "number" ? mobileInput.x : 0;
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
                hud.scene.setVisible(true);
                hud.scene.setActive(true);
            }
        }
    }

    private createButton(
        text: string,
        action: () => void,
        opts: { width: number; height: number; secondary?: boolean; fontSize: number }
    ): Phaser.GameObjects.Container {
        const container = this.scene.add.container(0, 0);

        const isSecondary = !!opts.secondary;
        const bgColor = isSecondary ? 0x4a5568 : 0x3b82f6;
        const borderColor = isSecondary ? 0x374151 : 0x2563eb;

        const bg = this.scene.add.rectangle(0, 0, opts.width, opts.height, bgColor);
        bg.setStrokeStyle(2, borderColor);

        const label = this.scene.add.text(0, 0, text, {
            fontFamily: '"Press Start 2P"',
            fontSize: `${opts.fontSize}px`,
            color: "#ffffff",
            fontStyle: "bold",
        });
        label.setOrigin(0.5);

        // Ensure it fits even for longer labels.
        this.fitLabelToWidth(label, opts.width - 24, opts.fontSize, 10);

        container.add([bg, label]);

        const buttonIndex = this.buttons.length;
        this.buttons.push({ container, action, secondary: isSecondary });

        const activate = () => {
            if (!this.container.visible) return;
            this.setFocus(buttonIndex);
            action();
        };

        bg.setInteractive({ useHandCursor: true });
        bg.on("pointerover", () => this.setFocus(buttonIndex));
        bg.on("pointerdown", activate);

        label.setInteractive({ useHandCursor: true });
        label.on("pointerover", () => this.setFocus(buttonIndex));
        label.on("pointerdown", activate);

        return container;
    }

    private repositionButtons() {
        if (this.buttons.length === 0) return;

        const isMobile = !this.scene.game.device.os.desktop;
        const gap = isMobile ? 12 : 16;
        const availableWidth = this.panelWidth - 36;
        const count = this.buttons.length;
        const buttonWidth = Math.min(220, Math.floor((availableWidth - gap * (count - 1)) / count));
        const buttonHeight = isMobile ? 44 : 40;
        const fontSize = isMobile ? 14 : 14;

        const totalWidth = buttonWidth * count + gap * (count - 1);
        let x = -totalWidth / 2 + buttonWidth / 2;

        this.buttons.forEach((b) => {
            const bg = b.container.getAt(0) as Phaser.GameObjects.Rectangle;
            const label = b.container.getAt(1) as Phaser.GameObjects.Text;
            bg.setSize(buttonWidth, buttonHeight);
            bg.setDisplaySize(buttonWidth, buttonHeight);
            this.fitLabelToWidth(label, buttonWidth - 24, fontSize, 10);
            b.container.setPosition(x, 0);
            x += buttonWidth + gap;
        });

        // Keep focus highlight consistent after resize.
        this.buttons.forEach((_b, index) =>
            this.updateButtonHighlight(index, index === this.focusedButtonIndex)
        );
    }

    private updateButtonHighlight(index: number, highlighted: boolean) {
        const button = this.buttons[index];
        if (!button) return;

        const buttonContainer = button.container;
        const bg = buttonContainer.getAt(0) as Phaser.GameObjects.Rectangle;

        const isSecondary = button.secondary;

        if (highlighted) {
            if (isSecondary) {
                bg.setFillStyle(0x374151);
                bg.setStrokeStyle(3, 0xffffff);
            } else {
                bg.setFillStyle(0x2563eb);
                bg.setStrokeStyle(3, 0xffffff);
            }
        } else {
            if (isSecondary) {
                bg.setFillStyle(0x4a5568);
                bg.setStrokeStyle(2, 0x374151);
            } else {
                bg.setFillStyle(0x3b82f6);
                bg.setStrokeStyle(2, 0x2563eb);
            }
        }
    }

    private moveFocus(direction: number) {
        if (this.buttons.length === 0) return;

        this.updateButtonHighlight(this.focusedButtonIndex, false);
        this.focusedButtonIndex =
            (this.focusedButtonIndex + direction + this.buttons.length) % this.buttons.length;
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
        const button = this.buttons[this.focusedButtonIndex];
        if (!button) return;
        button.action();
    }

    private setActions(actions: Array<{ text: string; action: () => void; secondary?: boolean }>) {
        this.buttonsContainer.removeAll(true);
        this.buttons = [];

        const isMobile = !this.scene.game.device.os.desktop;
        const gap = isMobile ? 12 : 16;
        const availableWidth = this.panelWidth - 36;
        const count = Math.max(1, actions.length);

        const buttonWidth = Math.min(220, Math.floor((availableWidth - gap * (count - 1)) / count));
        const buttonHeight = isMobile ? 44 : 40;
        const fontSize = isMobile ? 16 : 16;

        const totalWidth = buttonWidth * count + gap * (count - 1);
        let x = -totalWidth / 2 + buttonWidth / 2;

        actions.forEach((a) => {
            const btn = this.createButton(a.text, a.action, {
                width: buttonWidth,
                height: buttonHeight,
                secondary: a.secondary,
                fontSize,
            });
            btn.setPosition(x, 0);
            this.buttonsContainer.add(btn);
            x += buttonWidth + gap;
        });

        this.focusedButtonIndex = 0;
        if (this.buttons.length > 0) {
            this.updateButtonHighlight(0, true);
        }
    }

    show(options: WelcomePanelOptions) {
        this.currentUrl = options.url;
        this.messageText.setText(options.message);

        this.closeCallback = options.onClose;

        const primaryText = options.primaryText ?? "Open Portfolio";
        const secondaryText = options.secondaryText ?? "Not now";

        this.setActions([
            {
                text: primaryText,
                action: () => {
                    if (this.currentUrl) {
                        Analytics.trackExternalLinkClick(this.currentUrl, "Portfolio");
                        if (
                            this.currentUrl.startsWith("#") ||
                            this.currentUrl.startsWith("/#") ||
                            this.currentUrl.startsWith("/")
                        ) {
                            if (typeof window !== "undefined") {
                                window.dispatchEvent(
                                    new CustomEvent("game:navigate", {
                                        detail: { url: this.currentUrl },
                                    })
                                );
                            }
                        } else {
                            window.open(this.currentUrl, "_blank");
                        }
                    }
                    this.close();
                },
            },
            {
                text: secondaryText,
                secondary: true,
                action: () => this.close(),
            },
        ]);

        Analytics.trackCustomEvent("portfolio_prompt_shown");

        this.updateLayout();
        this.positionContainer();
        this.layoutElements();

        this.container.setVisible(true);
        this.setHudSceneVisible(false);

        // Block player movement
        const baseScene = this.scene as any;
        if (baseScene.setMovementLocked) {
            baseScene.setMovementLocked(true);
        }

        // Input reset / mobile polling
        this.scene.input.keyboard?.enabled && this.scene.input.keyboard.resetKeys();

        const mobileInput = (this.scene.registry.get("mobileInput") as any) || {
            x: 0,
            y: 0,
            interact: false,
        };
        this.lastMobileAxisX = typeof mobileInput.x === "number" ? mobileInput.x : 0;
        this.lastMobileInteractState = !!mobileInput.interact;
        this.nextFocusMoveAt = 0;
        this.pendingUnlock = false;
        this.ensureUpdateListener();
    }

    close() {
        if (!this.container.visible) return;

        this.container.setVisible(false);
        this.setHudSceneVisible(true);

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
                this.removeUpdateListener();
            }
        } else {
            this.removeUpdateListener();
        }

        if (this.closeCallback) {
            const cb = this.closeCallback;
            this.closeCallback = undefined;
            cb();
        }
    }

    destroy() {
        if (this.isDestroyed) return;
        this.isDestroyed = true;

        this.setHudSceneVisible(true);

        if (this.keyboardListener) {
            window.removeEventListener("keydown", this.keyboardListener);
            this.keyboardListener = undefined;
        }

        if (this.resizeListener) {
            this.scene.scale.off("resize", this.resizeListener);
            this.resizeListener = undefined;
        }

        this.removeUpdateListener();
        this.container.destroy(true);
    }
}
