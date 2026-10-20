import Phaser from "phaser";

export interface DialogueOptions {
    text: string;
    keyWord?: string;
    keyWordColor?: string; // hex color string like '#ff0000'
    onClose?: () => void;
}

export default class DialogueBox {
    private scene: Phaser.Scene;
    private container!: Phaser.GameObjects.Container;
    private background!: Phaser.GameObjects.Rectangle;
    private text!: any; // BBCodeText instance
    private buttonSprite!: Phaser.GameObjects.Image;
    private isVisible = false;
    private pages: string[] = [];
    private currentPage = 0;
    private isTyping = false;
    private fullText = "";
    private charIndex = 0;
    private typewriterEvent?: Phaser.Time.TimerEvent;
    private visibleIndexToFormattedIndex: number[] = [];
    private onClose?: () => void;

    private processedText = "";

    private layoutWidth = 0;
    private layoutHeight = 0;

    private resizeListener?: () => void;
    private isDestroyed = false;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.create();
    }

    private cssPixelsToGamePixels(cssPixels: number, gameHeight: number): number {
        const canvas = this.scene.scale.canvas;
        const rect = canvas.getBoundingClientRect();
        if (!rect.height) return cssPixels;
        return cssPixels * (gameHeight / rect.height);
    }

    private getBottomCoveredGamePixels(gameHeight: number): number {
        // Mobile controls are DOM elements overlaying the canvas. Depending on layout/orientation,
        // they may overlap the canvas by less than their CSS height. Compute the real overlap.
        if (typeof document === "undefined") return 0;

        const controlsEl = document.querySelector(".mobile-controls") as HTMLElement | null;
        if (!controlsEl) return 0;

        const canvas = this.scene.scale.canvas;
        const canvasRect = canvas.getBoundingClientRect();
        const controlsRect = controlsEl.getBoundingClientRect();

        // Guard: on some browsers/layouts `controlsRect.top` can report unexpectedly,
        // which would yield an overlap larger than the controls themselves and push the UI too high.
        const rawOverlapCss = canvasRect.bottom - controlsRect.top;
        const overlapCss = Phaser.Math.Clamp(rawOverlapCss, 0, controlsRect.height);
        return this.cssPixelsToGamePixels(overlapCss, gameHeight);
    }

    private updateLayout() {
        if (this.isDestroyed) return;

        const isMobile = !this.scene.game.device.os.desktop;
        const screenWidth = this.scene.scale.width;
        const screenHeight = this.scene.scale.height;

        const nextWidth = isMobile
            ? Math.min(420, screenWidth * 0.88)
            : Math.min(600, screenWidth * 0.9);

        // Slightly shrink in very short viewports (common on landscape phones)
        const baseHeight = isMobile ? 120 : 100;
        const nextHeight = isMobile && screenHeight < 420 ? 100 : baseHeight;

        const sizeChanged = nextWidth !== this.layoutWidth || nextHeight !== this.layoutHeight;
        this.layoutWidth = nextWidth;
        this.layoutHeight = nextHeight;

        // If this instance was destroyed (scene transition), or if its game objects were
        // already destroyed by the Scene, skip.
        if (!this.background || !this.buttonSprite) return;
        if (!this.background.scene || !this.buttonSprite.scene) return;
        if (!this.background.active || !this.buttonSprite.active) return;
        if (!(this.background as any).geom) return;

        if (sizeChanged) {
            this.background?.setSize(this.layoutWidth, this.layoutHeight);
            this.background?.setDisplaySize(this.layoutWidth, this.layoutHeight);

            // RexBBCodeText supports fixed size; Text fallback supports wordWrap width.
            if (this.text?.setFixedSize) {
                this.text.setFixedSize(this.layoutWidth - 20, this.layoutHeight - 20);
            }
            if (this.text?.setWordWrapWidth) {
                this.text.setWordWrapWidth(this.layoutWidth - 20);
            }

            // Some rexBBCodeText versions use wrap.width instead of setWordWrapWidth.
            const wrapWidth = this.layoutWidth - 20;
            if ((this.text as any)?.setWrapWidth) {
                (this.text as any).setWrapWidth(wrapWidth);
            }
            if ((this.text as any)?.style?.wrap) {
                (this.text as any).style.wrap.width = wrapWidth;
            }
            if ((this.text as any)?.updateText) {
                (this.text as any).updateText();
            }

            this.buttonSprite?.setPosition(this.layoutWidth / 2 - 10, this.layoutHeight / 2 - 10);

            // If the dialogue is currently showing, re-paginate so wrapping/page length adapts.
            if (this.isVisible && this.processedText) {
                const prevPage = this.currentPage;
                this.pages = this.paginateText(this.processedText);
                this.currentPage = Phaser.Math.Clamp(
                    prevPage,
                    0,
                    Math.max(0, this.pages.length - 1)
                );
                this.typewriterEvent?.destroy();
                this.isTyping = false;
                this.showCurrentPage();
            }
        }
    }

    private positionContainer() {
        const gameWidth = this.scene.scale.width;
        const gameHeight = this.scene.scale.height;
        const isMobile = !this.scene.game.device.os.desktop;
        const isLandscape = isMobile && gameWidth > gameHeight;

        // Keep the dialogue at a fixed screen-space size and position (UI camera zoom=1).
        const boxHeight = this.layoutHeight || (isMobile ? 120 : 100);

        // Desktop: small bottom padding.
        // Mobile portrait: place just above whatever portion of the canvas is actually covered by the DOM controls.
        // Mobile landscape: anchor to the bottom of the screen (small padding) so it sits in the lower band.
        const gapGame = isMobile ? this.cssPixelsToGamePixels(10, gameHeight) : 20;
        const coveredGame =
            isMobile && !isLandscape ? this.getBottomCoveredGamePixels(gameHeight) : 0;
        const bottomMargin = coveredGame + gapGame;

        const yPosition = gameHeight - bottomMargin - boxHeight / 2;
        const clampedY = Phaser.Math.Clamp(
            yPosition,
            boxHeight / 2 + 6,
            gameHeight - boxHeight / 2 - 6
        );

        this.container.setScale(1);
        this.container.setPosition(gameWidth / 2, clampedY);
    }

    private create() {
        // Make dialogue box responsive
        const isMobile = !this.scene.game.device.os.desktop;
        const screenWidth = this.scene.scale.width;

        const width = isMobile
            ? Math.min(400, screenWidth * 0.85)
            : Math.min(600, screenWidth * 0.9);
        const height = isMobile ? 120 : 100;

        this.layoutWidth = width;
        this.layoutHeight = height;

        this.background = this.scene.add.rectangle(0, 0, width, height, 0x000000, 0.6);
        this.background.setStrokeStyle(3, 0x6e84e7);

        // Use the global plugin factory
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const add = this.scene.add as any;

        if (!add.rexBBCodeText) {
            console.error("RexBBCodeText plugin is not loaded into the factory!");
            // Fallback to standard Text if plugin fails, to at least show something
            this.text = this.scene.add.text(0, 0, "", {
                fontFamily: '"Press Start 2P"',
                fontSize: "14px",
                color: "#ffffff",
                wordWrap: { width: width - 20 },
            });
        } else {
            this.text = add.rexBBCodeText(0, 0, "", {
                fontFamily: '"Press Start 2P"',
                fontSize: "14px",
                color: "#ffffff",
                align: "left",
                fixedWidth: width - 20,
                fixedHeight: height - 20,
                padding: { top: 5, bottom: 5 },
                lineSpacing: 12,
                wrap: {
                    mode: "word",
                    width: width - 20,
                },
            });
        }

        this.text.setOrigin(0.5);

        // Create button sprite (will choose correct texture when showing)
        const buttonKey = isMobile ? "a_button" : "e_key_button";
        this.buttonSprite = this.scene.add.image(0, 0, buttonKey);
        this.buttonSprite.setOrigin(1, 1); // Bottom right origin
        this.buttonSprite.setPosition(width / 2 - 10, height / 2 - 10); // Bottom right corner with padding
        this.buttonSprite.setScale(2); // Scale down the button
        this.buttonSprite.setVisible(false);

        // Add pulsing animation to button
        this.scene.tweens.add({
            targets: this.buttonSprite,
            scale: 2.2,
            duration: 500,
            yoyo: true,
            repeat: -1,
            ease: "Sine.easeInOut",
        });

        this.container = this.scene.add.container(0, 0);
        this.container.add([this.background, this.text, this.buttonSprite]);
        this.container.setScrollFactor(0);
        this.container.setDepth(3000); // Always on top of everything (UI layer)
        this.container.setVisible(false);

        // Render via UI camera (if available) so it isn't affected by world camera zoom.
        const baseScene = this.scene as any;
        if (baseScene.registerUIObject) {
            baseScene.registerUIObject(this.container);
        }

        // Ensure we clean up global listeners when the scene shuts down.
        this.scene.events.once(Phaser.Scenes.Events.SHUTDOWN, () => this.destroy());
        this.scene.events.once(Phaser.Scenes.Events.DESTROY, () => this.destroy());

        // Keep layout/position correct when rotating/resizing.
        this.resizeListener = () => {
            this.updateLayout();
            if (this.isVisible) {
                this.positionContainer();
            }
        };
        this.scene.scale.on("resize", this.resizeListener);
    }

    private getMaxCharsPerPage(): number {
        // Heuristic based on current layout size; keeps the text readable across resize/orientation.
        // We don't have reliable per-character metrics for BBCode across renderers, so approximate.
        const padding = 20;
        const usableWidth = Math.max(120, this.layoutWidth - padding);
        const usableHeight = Math.max(60, this.layoutHeight - padding);

        // Dialogue uses ~14px pixel font. Approx character width ~8px.
        const approxCharWidth = 8;
        // Line height ~ (font size + line spacing). In create() lineSpacing is 12.
        const approxLineHeight = 26;

        const cols = Math.max(10, Math.floor(usableWidth / approxCharWidth));
        const rows = Math.max(2, Math.floor(usableHeight / approxLineHeight));

        // Clamp to reasonable range so huge screens don't create single mega-pages.
        return Phaser.Math.Clamp(cols * rows, 60, 180);
    }

    private paginateText(message: string): string[] {
        // Handle manual page breaks
        if (message.includes("|||")) {
            const sections = message.split("|||");
            let allPages: string[] = [];
            for (const section of sections) {
                allPages = allPages.concat(this.paginateText(section));
            }
            return allPages;
        }

        const maxChars = this.getMaxCharsPerPage();
        const pages: string[] = [];

        let currentIndex = 0;
        const len = message.length;

        while (currentIndex < len) {
            let visibleCount = 0;
            let tempIndex = currentIndex;
            let splitIndex = -1;
            let lastSpaceIndex = -1;

            while (tempIndex < len) {
                const char = message[tempIndex];

                if (char === "[") {
                    // Check if it's a tag start
                    const closingBracket = message.indexOf("]", tempIndex);
                    if (closingBracket !== -1) {
                        tempIndex = closingBracket + 1;
                        continue;
                    }
                }

                visibleCount++;
                if (char === " ") {
                    lastSpaceIndex = tempIndex;
                }

                if (visibleCount >= maxChars) {
                    splitIndex = tempIndex + 1;
                    break;
                }
                tempIndex++;
            }

            if (splitIndex === -1) {
                splitIndex = len;
            } else {
                if (lastSpaceIndex > currentIndex && lastSpaceIndex < splitIndex) {
                    splitIndex = lastSpaceIndex + 1;
                }
            }

            pages.push(message.slice(currentIndex, splitIndex));
            currentIndex = splitIndex;
        }

        return pages;
    }

    private startTypewriter() {
        this.isTyping = true;
        this.charIndex = 0;
        this.text.setText("");
        this.buttonSprite.setVisible(false); // Hide button while typing

        this.visibleIndexToFormattedIndex = [];
        for (let i = 0; i < this.fullText.length; i++) {
            const ch = this.fullText[i];

            if (ch === "[") {
                const closing = this.fullText.indexOf("]", i);
                if (closing !== -1) {
                    const tagContent = this.fullText.slice(i + 1, closing);
                    if (tagContent.indexOf("=") !== -1 || tagContent.startsWith("/")) {
                        i = closing;
                        continue;
                    }
                }
            }

            this.visibleIndexToFormattedIndex.push(i);
        }

        this.typewriterEvent = this.scene.time.addEvent({
            delay: 20,
            callback: () => {
                if (this.charIndex < this.visibleIndexToFormattedIndex.length) {
                    const endIdx = this.visibleIndexToFormattedIndex[this.charIndex];
                    this.text.setText(this.fullText.substring(0, endIdx + 1));
                    this.charIndex++;
                } else {
                    this.finishTyping();
                }
            },
            loop: true,
        });
    }

    private finishTyping() {
        this.isTyping = false;
        this.typewriterEvent?.destroy(); // Ensure timer is stopped
        this.text.setText(this.fullText);
        this.buttonSprite.setVisible(true); // Show button when text is complete
    }

    private skipTypewriter() {
        if (this.isTyping) {
            this.finishTyping();
            this.buttonSprite.setVisible(true); // Ensure button is visible after skip
        }
    }

    show(messageOrOptions: string | DialogueOptions) {
        const { text, keyWord, keyWordColor, onClose } =
            typeof messageOrOptions === "string"
                ? {
                      text: messageOrOptions,
                      keyWord: undefined,
                      keyWordColor: undefined,
                      onClose: undefined,
                  }
                : messageOrOptions;

        this.onClose = onClose;

        // Ensure we size and place based on the CURRENT viewport and real controls overlap.
        this.updateLayout();
        this.positionContainer();

        // Prepare text with replacements
        let processedText = text;
        if (keyWord) {
            let colorToUse = keyWordColor;

            // Fix Tiled #AARRGGBB format to #RRGGBB
            if (colorToUse && colorToUse.startsWith("#") && colorToUse.length === 9) {
                // Tiled exports as #AARRGGBB, we want #RRGGBB
                // Remove the Alpha channel (first 2 hex digits after #)
                colorToUse = "#" + colorToUse.substring(3);
            }

            const replacement = colorToUse ? `[color=${colorToUse}]${keyWord}[/color]` : keyWord;
            // Replace all occurrences
            processedText = processedText.split("{0}").join(replacement);
        }

        this.processedText = processedText;
        this.pages = this.paginateText(processedText);
        this.currentPage = 0;

        this.showCurrentPage();

        this.container.setVisible(true);
        this.isVisible = true;
    }

    private showCurrentPage() {
        this.fullText = this.pages[this.currentPage];
        this.startTypewriter();
    }

    advance(): boolean {
        if (this.isTyping) {
            this.skipTypewriter();
            return true;
        }

        if (this.currentPage < this.pages.length - 1) {
            this.currentPage++;
            this.showCurrentPage();
            return true;
        }

        return false;
    }

    hide() {
        this.typewriterEvent?.destroy();
        this.buttonSprite.setVisible(false);
        this.container.setVisible(false);
        this.isVisible = false;
        this.isTyping = false;
        if (this.onClose) {
            this.onClose();
            this.onClose = undefined;
        }
    }

    isShowing() {
        return this.isVisible;
    }

    destroy() {
        if (this.isDestroyed) return;
        this.isDestroyed = true;

        this.typewriterEvent?.destroy();
        if (this.resizeListener) {
            this.scene.scale.off("resize", this.resizeListener);
            this.resizeListener = undefined;
        }
        this.container?.destroy();
    }
}
