import Phaser from "phaser";
import type { MobileInputState } from "./types";

export default class Player extends Phaser.Physics.Arcade.Sprite {
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys | null = null;
    private wasd: {
        W: Phaser.Input.Keyboard.Key;
        A: Phaser.Input.Keyboard.Key;
        S: Phaser.Input.Keyboard.Key;
        D: Phaser.Input.Keyboard.Key;
        E: Phaser.Input.Keyboard.Key;
    } | null = null;
    private promptText: Phaser.GameObjects.Text | null = null;
    private speed: number = 160;
    private currentDirection: string = "down";

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "hero-idle-down");

        scene.add.existing(this);
        scene.physics.add.existing(this);

        const body = this.body as Phaser.Physics.Arcade.Body;
        if (body) {
            body.setCollideWorldBounds(true);
            body.setSize(20, 15);
            body.setOffset(10, 25);
        }

        if (scene.input.keyboard) {
            this.cursors = scene.input.keyboard.createCursorKeys();
            this.wasd = scene.input.keyboard.addKeys({
                W: Phaser.Input.Keyboard.KeyCodes.W,
                A: Phaser.Input.Keyboard.KeyCodes.A,
                S: Phaser.Input.Keyboard.KeyCodes.S,
                D: Phaser.Input.Keyboard.KeyCodes.D,
                E: Phaser.Input.Keyboard.KeyCodes.E,
            }) as {
                W: Phaser.Input.Keyboard.Key;
                A: Phaser.Input.Keyboard.Key;
                S: Phaser.Input.Keyboard.Key;
                D: Phaser.Input.Keyboard.Key;
                E: Phaser.Input.Keyboard.Key;
            };
        }

        this.promptText = scene.add
            .text(x, y - 30, "[E] Interactuar", {
                fontSize: "12px",
                backgroundColor: "#050b14dd",
                padding: { x: 6, y: 3 },
                color: "#38bdf8",
            })
            .setOrigin(0.5)
            .setVisible(false)
            .setDepth(100);

        this.createAnimations();
    }

    private createAnimations() {
        const directions = ["up", "down", "left", "right"];

        directions.forEach((dir) => {
            if (!this.scene.anims.exists(`idle-${dir}`)) {
                this.scene.anims.create({
                    key: `idle-${dir}`,
                    frames: this.scene.anims.generateFrameNumbers(`hero-idle-${dir}`, {
                        start: 0,
                        end: 1,
                    }),
                    frameRate: 4,
                    repeat: -1,
                });
            }

            if (!this.scene.anims.exists(`run-${dir}`)) {
                this.scene.anims.create({
                    key: `run-${dir}`,
                    frames: this.scene.anims.generateFrameNumbers(`hero-run-${dir}`, {
                        start: 0,
                        end: 3,
                    }),
                    frameRate: 8,
                    repeat: -1,
                });
            }
        });
    }

    update() {
        const body = this.body as Phaser.Physics.Arcade.Body;
        if (!body) return;

        body.setVelocity(0);
        let moving = false;
        let nextDirection = this.currentDirection;

        const mobileInput = this.scene.game.registry.get("mobileInput") as
            MobileInputState | undefined;

        // Movimiento por teclado
        const isLeft =
            this.cursors?.left.isDown ||
            this.wasd?.A.isDown ||
            (mobileInput && mobileInput.x < -0.3);
        const isRight =
            this.cursors?.right.isDown ||
            this.wasd?.D.isDown ||
            (mobileInput && mobileInput.x > 0.3);
        const isUp =
            this.cursors?.up.isDown || this.wasd?.W.isDown || (mobileInput && mobileInput.y < -0.3);
        const isDown =
            this.cursors?.down.isDown ||
            this.wasd?.S.isDown ||
            (mobileInput && mobileInput.y > 0.3);

        if (isLeft) {
            body.setVelocityX(-this.speed);
            nextDirection = "left";
            moving = true;
        } else if (isRight) {
            body.setVelocityX(this.speed);
            nextDirection = "right";
            moving = true;
        }

        if (isUp) {
            body.setVelocityY(-this.speed);
            nextDirection = "up";
            moving = true;
        } else if (isDown) {
            body.setVelocityY(this.speed);
            nextDirection = "down";
            moving = true;
        }

        if (body.velocity.x !== 0 && body.velocity.y !== 0) {
            body.velocity.normalize().scale(this.speed);
        }

        this.currentDirection = nextDirection;
        const animPrefix = moving ? "run" : "idle";
        this.play(`${animPrefix}-${this.currentDirection}`, true);

        if (this.promptText) {
            this.promptText.setPosition(this.x, this.y - 30);
        }
    }

    public setPromptVisible(visible: boolean) {
        if (this.promptText) {
            this.promptText.setVisible(visible);
        }
    }

    public isInteracting(): boolean {
        const mobileInput = this.scene.game.registry.get("mobileInput") as
            MobileInputState | undefined;
        const mobileAction = Boolean(mobileInput?.interact);
        const keyAction = this.wasd?.E ? Phaser.Input.Keyboard.JustDown(this.wasd.E) : false;
        return keyAction || mobileAction;
    }
}
