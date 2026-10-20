import Phaser from "phaser";

export default class HUDScene extends Phaser.Scene {
    private blueKeyIcon!: Phaser.GameObjects.Sprite;
    private greenKeyIcon!: Phaser.GameObjects.Sprite;
    private environmentNameText!: Phaser.GameObjects.Text;
    private readonly iconScale = 2;
    private readonly iconAngleDeg = -35;

    constructor() {
        super({ key: "HUDScene", active: false });
    }

    create() {
        const updateLayout = () => {
            // Screen-space slots (used by pickup tweens in other scenes)
            // Slot 0: top-right
            // Slot 1: same row, to the left
            const slotBlue = { x: this.scale.width - 40, y: 40 };
            const slotGreen = { x: this.scale.width - 85, y: 40 };

            this.registry.set("hudKeySlots", {
                blue: slotBlue,
                green: slotGreen,
            });

            this.blueKeyIcon?.setPosition(slotBlue.x, slotBlue.y);
            this.greenKeyIcon?.setPosition(slotGreen.x, slotGreen.y);
        };

        // Blue key (projects)
        this.blueKeyIcon = this.add.sprite(0, 0, "decor_sheet", 42);
        this.blueKeyIcon.setOrigin(0.5);
        this.blueKeyIcon.setScale(this.iconScale);
        this.blueKeyIcon.setAngle(this.iconAngleDeg);
        this.blueKeyIcon.setScrollFactor(0);
        this.blueKeyIcon.setVisible(false);

        // Green key (experience)
        this.greenKeyIcon = this.add.sprite(0, 0, "decor_sheet", 82);
        this.greenKeyIcon.setOrigin(0.5);
        this.greenKeyIcon.setScale(this.iconScale);
        this.greenKeyIcon.setAngle(this.iconAngleDeg);
        this.greenKeyIcon.setScrollFactor(0);
        this.greenKeyIcon.setVisible(false);

        // Environment name text (top center)
        this.environmentNameText = this.add.text(this.scale.width / 2, 40, "", {
            fontSize: "32px",
            color: "#ffffff",
            fontStyle: "bold",
            stroke: "#000000",
            strokeThickness: 4,
            shadow: {
                offsetX: 2,
                offsetY: 2,
                color: "#000000",
                blur: 4,
                fill: true,
            },
        });
        this.environmentNameText.setOrigin(0.5);
        this.environmentNameText.setScrollFactor(0);
        this.environmentNameText.setDepth(1000);
        this.environmentNameText.setAlpha(0);

        updateLayout();
        this.scale.on("resize", updateLayout);
    }

    update() {
        // Polling the registry is a simple and robust way to handle UI updates
        // without worrying about event listener lifecycles
        const inventory = this.registry.get("inventory") || [];

        const hasBlue = inventory.includes("blue_key");
        const hasGreen = inventory.includes("green_key");

        this.blueKeyIcon.setVisible(hasBlue);
        this.greenKeyIcon.setVisible(hasGreen);
    }

    /**
     * Display environment name with fade in/out effect
     * @param name - The name to display (e.g., "Home Island", "Projects Castle")
     * @param duration - How long to display in milliseconds (default 3000ms)
     */
    showEnvironmentName(name: string, duration: number = 3000) {
        // Cancel any existing tweens on the text
        this.tweens.killTweensOf(this.environmentNameText);

        // Update position in case screen size changed
        this.environmentNameText.setPosition(this.scale.width / 2, 40);
        this.environmentNameText.setText(name);
        this.environmentNameText.setVisible(true);
        this.environmentNameText.setAlpha(0);

        // Wait 1 second, then fade in
        this.time.delayedCall(500, () => {
            this.tweens.add({
                targets: this.environmentNameText,
                alpha: 1,
                duration: 500,
                ease: "Power2",
                onComplete: () => {
                    // Wait, then fade out
                    this.time.delayedCall(duration, () => {
                        this.tweens.add({
                            targets: this.environmentNameText,
                            alpha: 0,
                            duration: 500,
                            ease: "Power2",
                        });
                    });
                },
            });
        });
    }
}
