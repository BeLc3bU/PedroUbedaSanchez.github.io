import Phaser from "phaser";
import DialogueBox, { type DialogueOptions } from "./DialogueBox";

export const GAME_CONFIG = {
    PLAYER_SPEED: 110,
    CAMERA_ZOOM: 3,
    TRANSITION_DURATION: 500,
    DEBUG_PHYSICS: false,
};

export default abstract class BaseScene extends Phaser.Scene {
    protected player!: Phaser.Physics.Arcade.Sprite;
    protected wasd!: {
        W: Phaser.Input.Keyboard.Key;
        A: Phaser.Input.Keyboard.Key;
        S: Phaser.Input.Keyboard.Key;
        D: Phaser.Input.Keyboard.Key;
    };
    protected eKey!: Phaser.Input.Keyboard.Key;
    protected currentInteractable: any = null;
    protected dialogueBox!: DialogueBox;
    protected interactionIndicator!: Phaser.GameObjects.Image;
    protected movementLocked = false;
    protected uiCamera?: Phaser.Cameras.Scene2D.Camera;
    private uiCameraResizeListener?: (gameSize: Phaser.Structs.Size) => void;
    private lastInteractState = false;
    private lastDirection = "down";
    private interactableZones: Map<Phaser.GameObjects.Zone, any> = new Map();
    private activeInteractables = new Set<any>();
    private currentlyTouching = new Set<any>();
    protected objectSprites: Map<string, Phaser.GameObjects.Sprite> = new Map();
    protected music?: Phaser.Sound.BaseSound;

    protected setMovementLocked(locked: boolean) {
        this.movementLocked = locked;
        if (locked) {
            this.player?.setVelocity(0, 0);
        }
    }

    protected getHudKeySlotWorldPosition(slot: "blue" | "green"): { x: number; y: number } {
        const camera = this.cameras.main;
        const zoom = camera.zoom || 1;

        const slots = this.registry.get("hudKeySlots") as
            { blue?: { x: number; y: number }; green?: { x: number; y: number } } | undefined;

        const fallbackScreen =
            slot === "blue"
                ? { x: this.scale.width - 40, y: 40 }
                : { x: this.scale.width - 75, y: 40 };

        const screen = slots?.[slot] ?? fallbackScreen;

        return {
            x: camera.worldView.x + screen.x / zoom,
            y: camera.worldView.y + screen.y / zoom,
        };
    }

    init(data: { spawnLocation?: string; playerDirection?: string }) {
        this.registry.set("spawnLocation", data.spawnLocation || "player");
        this.registry.set("playerDirection", data.playerDirection || "down");
    }

    protected setupPlayer(map: Phaser.Tilemaps.Tilemap) {
        const spawnsLayer = map.getObjectLayer("System/Spawns");
        const spawnLocation = this.registry.get("spawnLocation") || "player";
        const playerSpawn = spawnsLayer?.objects.find(
            (obj: any) =>
                (obj.type === "start_position" && obj.name === spawnLocation) ||
                obj.name === spawnLocation
        );
        const spawnX = playerSpawn?.x || map.widthInPixels / 2;
        const spawnY = playerSpawn?.y || map.heightInPixels / 2;

        this.player = this.physics.add.sprite(spawnX, spawnY, "player_idle", 0);
        this.player.setDepth(this.player.y);
        this.player.setScale(1.5); // Makes player 1.5x bigger (or 0.5 for smaller)

        this.player.setCollideWorldBounds(true);

        // Set physics body size to match actual character size (16x16)
        this.player.body!.setSize(10, 10);
        this.player.body!.setOffset(28, 30);

        // Create animations only if they don't exist
        if (!this.anims.exists("idle_down")) {
            this.anims.create({
                key: "idle_down",
                frames: this.anims.generateFrameNumbers("player_idle", { start: 0, end: 3 }),
                frameRate: 8,
                repeat: -1,
            });
            this.anims.create({
                key: "idle_left",
                frames: this.anims.generateFrameNumbers("player_idle", { start: 4, end: 7 }),
                frameRate: 8,
                repeat: -1,
            });
            this.anims.create({
                key: "idle_right",
                frames: this.anims.generateFrameNumbers("player_idle", { start: 8, end: 11 }),
                frameRate: 8,
                repeat: -1,
            });
            this.anims.create({
                key: "idle_up",
                frames: this.anims.generateFrameNumbers("player_idle", { start: 12, end: 15 }),
                frameRate: 8,
                repeat: -1,
            });

            this.anims.create({
                key: "walk_down",
                frames: this.anims.generateFrameNumbers("player_walk", { start: 0, end: 3 }),
                frameRate: 8,
                repeat: -1,
            });
            this.anims.create({
                key: "walk_left",
                frames: this.anims.generateFrameNumbers("player_walk", { start: 4, end: 7 }),
                frameRate: 8,
                repeat: -1,
            });
            this.anims.create({
                key: "walk_right",
                frames: this.anims.generateFrameNumbers("player_walk", { start: 8, end: 11 }),
                frameRate: 8,
                repeat: -1,
            });
            this.anims.create({
                key: "walk_up",
                frames: this.anims.generateFrameNumbers("player_walk", { start: 12, end: 15 }),
                frameRate: 8,
                repeat: -1,
            });

            // Optional intro/wave animation (hello spritesheet)
            if (this.textures.exists("player_hello") && !this.anims.exists("hello_wave")) {
                const helloAnim = (this.registry.get("playerHelloAnim") as
                    { start: number; end: number; frameRate?: number } | undefined) ?? {
                    start: 0,
                    end: 1,
                    frameRate: 6,
                };
                this.anims.create({
                    key: "hello_wave",
                    frames: this.anims.generateFrameNumbers("player_hello", {
                        start: helloAnim.start,
                        end: helloAnim.end,
                    }),
                    frameRate: helloAnim.frameRate ?? 6,
                    repeat: -1,
                });
            }
        }

        const savedDirection = this.registry.get("playerDirection") || "down";
        this.lastDirection = savedDirection;
        this.player.play(`idle_${savedDirection}`);
    }

    protected setupCamera(map: Phaser.Tilemaps.Tilemap) {
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.setZoom(GAME_CONFIG.CAMERA_ZOOM);
        this.cameras.main.startFollow(this.player, true, 0.15, 0.15);
        this.cameras.main.roundPixels = true;
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.fadeIn(GAME_CONFIG.TRANSITION_DURATION);

        // Enable debug rendering
        if (GAME_CONFIG.DEBUG_PHYSICS) {
            this.physics.world.createDebugGraphic();
        }
    }

    protected setupColliders(map: Phaser.Tilemaps.Tilemap) {
        const collidersLayer = map.getObjectLayer("System/Colliders");
        collidersLayer?.objects.forEach((obj) => {
            const collider = this.add.rectangle(
                obj.x! + obj.width! / 2,
                obj.y! + obj.height! / 2,
                obj.width!,
                obj.height!
            );
            this.physics.add.existing(collider, true);
            this.physics.add.collider(this.player, collider);
        });
    }

    protected setupInteractables(map: Phaser.Tilemaps.Tilemap) {
        const interactablesLayer = map.getObjectLayer("System/Interactables");
        interactablesLayer?.objects.forEach((obj) => {
            const zone = this.add.zone(
                obj.x! + obj.width! / 2,
                obj.y! + obj.height! / 2,
                obj.width!,
                obj.height!
            );
            this.physics.add.existing(zone);
            (zone.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
            (zone.body as Phaser.Physics.Arcade.Body).moves = false;

            this.interactableZones.set(zone, obj);
            this.physics.add.overlap(this.player, zone);
        });
    }

    protected setupObjects(map: Phaser.Tilemaps.Tilemap) {
        const objectsLayer = map.getObjectLayer("Same/Objects");
        objectsLayer?.objects.forEach((obj) => {
            if (obj.gid) {
                let tilesetName = "";
                let frameIndex = 0;

                for (const tileset of map.tilesets) {
                    const firstGid = tileset.firstgid;
                    const lastGid = firstGid + tileset.total - 1;

                    if (obj.gid >= firstGid && obj.gid <= lastGid) {
                        tilesetName = tileset.name;
                        frameIndex = obj.gid - firstGid;
                        break;
                    }
                }

                // Use _sheet suffix for spritesheet version if tileset has both
                const textureKey = this.textures.exists(tilesetName + "_sheet")
                    ? tilesetName + "_sheet"
                    : tilesetName;

                const sprite = this.add.sprite(obj.x!, obj.y!, textureKey, frameIndex);
                sprite.setOrigin(0, 1);
                sprite.setDepth(sprite.y);

                // Store sprite by name for easy access
                if (obj.name) {
                    this.objectSprites.set(obj.name, sprite);
                }
            }
        });
    }

    protected setupInput() {
        this.wasd = this.input.keyboard!.addKeys("W,A,S,D") as any;
        this.eKey = this.input.keyboard!.addKey("E");

        // Create a dedicated UI camera so screen-space UI is not affected by the world camera zoom.
        // Important: call this BEFORE creating UI objects (DialogueBox, InfoPanel, etc.).
        this.ensureUICamera();

        this.dialogueBox = new DialogueBox(this);

        // Cleanup UI listeners/objects on scene shutdown to prevent resize callbacks
        // firing against destroyed objects (common during orientation changes).
        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            this.dialogueBox?.destroy();

            if (this.uiCameraResizeListener) {
                this.scale.off("resize", this.uiCameraResizeListener);
                this.uiCameraResizeListener = undefined;
            }
        });

        // Create interaction indicator sprite
        const isMobile = !this.game.device.os.desktop;
        const indicatorKey = isMobile ? "a_button" : "e_key_button";
        this.interactionIndicator = this.add.image(0, 0, indicatorKey);
        this.interactionIndicator.setScale(0.8);
        this.interactionIndicator.setVisible(false);
        this.interactionIndicator.setDepth(10000); // Always on top

        // This indicator is a world-space object (it follows map coordinates), so keep it OUT of the UI camera.
        this.uiCamera?.ignore(this.interactionIndicator);

        // Add pulsing animation to button
        this.tweens.add({
            targets: this.interactionIndicator,
            scale: 0.9,
            duration: 500,
            yoyo: true,
            repeat: -1,
            ease: "Sine.easeInOut",
        });
    }

    protected ensureUICamera() {
        // Check if the camera exists AND is still active (not destroyed from a previous scene stop)
        if (this.uiCamera && this.cameras.cameras.includes(this.uiCamera)) {
            return;
        }

        // Main camera exists by default. Add a second camera on top for UI.
        this.uiCamera = this.cameras.add(0, 0, this.scale.width, this.scale.height);
        this.uiCamera.setZoom(1);
        this.uiCamera.setScroll(0, 0);
        this.uiCamera.roundPixels = true;

        // Ignore everything currently in the scene (world) so the UI camera will only render objects created later
        // OR objects explicitly registered via registerUIObject().
        this.uiCamera.ignore(this.children.list);

        // Keep the UI camera sized correctly.
        // If we recreate the UI camera, ensure we don't keep old listeners around.
        if (this.uiCameraResizeListener) {
            this.scale.off("resize", this.uiCameraResizeListener);
        }
        this.uiCameraResizeListener = (gameSize: Phaser.Structs.Size) => {
            // During shutdown, camera may be partially destroyed.
            if (!this.uiCamera) return;
            if (!(this.cameras.cameras || []).includes(this.uiCamera)) return;
            this.uiCamera.setSize(gameSize.width, gameSize.height);
        };
        this.scale.on("resize", this.uiCameraResizeListener);
    }

    /**
     * Register an object as screen-space UI: render it on the UI camera and ignore it on the world camera.
     */
    public registerUIObject(obj: Phaser.GameObjects.GameObject | Phaser.GameObjects.GameObject[]) {
        // The UI camera is created during setupInput(), but allow late registration.
        // Do NOT create it too early (before world objects), or it will end up rendering the world.
        if (!this.uiCamera) {
            return;
        }

        this.cameras.main.ignore(obj as any);
        // In case it was part of the world list that got ignored when the UI camera was created.
        (this.uiCamera as any).removeIgnore?.(obj as any);
    }

    update() {
        const mobileInput = this.registry.get("mobileInput") || { x: 0, y: 0, interact: false };

        // If dialogue is showing, only handle closing it
        if (this.dialogueBox.isShowing()) {
            if (
                Phaser.Input.Keyboard.JustDown(this.eKey) ||
                (mobileInput.interact && !this.lastInteractState)
            ) {
                if (!this.dialogueBox.advance()) {
                    this.dialogueBox.hide();
                }
            }
            this.lastInteractState = mobileInput.interact;
            return;
        }

        // Used for intro sequences (e.g., welcome dialog) to freeze gameplay.
        if (this.movementLocked) {
            this.player.setVelocity(0, 0);
            this.player.setDepth(this.player.y);
            this.lastInteractState = mobileInput.interact;
            return;
        }

        let velocityX = 0;
        let velocityY = 0;
        let isMoving = false;

        if (this.wasd.A.isDown || mobileInput.x < -0.3) {
            velocityX = -GAME_CONFIG.PLAYER_SPEED;
            this.lastDirection = "left";
            isMoving = true;
        } else if (this.wasd.D.isDown || mobileInput.x > 0.3) {
            velocityX = GAME_CONFIG.PLAYER_SPEED;
            this.lastDirection = "right";
            isMoving = true;
        }

        if (this.wasd.W.isDown || mobileInput.y < -0.3) {
            velocityY = -GAME_CONFIG.PLAYER_SPEED;
            this.lastDirection = "up";
            isMoving = true;
        } else if (this.wasd.S.isDown || mobileInput.y > 0.3) {
            velocityY = GAME_CONFIG.PLAYER_SPEED;
            this.lastDirection = "down";
            isMoving = true;
        }

        // Normalize diagonal movement
        if (velocityX !== 0 && velocityY !== 0) {
            velocityX *= Math.SQRT1_2;
            velocityY *= Math.SQRT1_2;
        }

        this.player.setDepth(this.player.y);
        this.player.setVelocity(velocityX, velocityY);

        // Update animation
        if (isMoving) {
            this.player.play(`walk_${this.lastDirection}`, true);
        } else {
            this.player.play(`idle_${this.lastDirection}`, true);
        }

        if (
            Phaser.Input.Keyboard.JustDown(this.eKey) ||
            (mobileInput.interact && !this.lastInteractState)
        ) {
            if (this.currentInteractable) {
                this.interactionIndicator.setVisible(false);
                this.handleInteraction(this.currentInteractable);
            }
        }

        this.lastInteractState = mobileInput.interact;

        // Track which zones are currently overlapping
        this.currentlyTouching.clear();
        this.currentInteractable = null;

        this.interactableZones.forEach((obj, _zone) => {
            const overlapping = this.physics.overlap(this.player, _zone);

            if (overlapping) {
                this.currentlyTouching.add(obj);
                this.currentInteractable = obj;

                // Enter if not previously active
                if (!this.activeInteractables.has(obj)) {
                    this.activeInteractables.add(obj);
                    // Position indicator above the interactable object
                    this.interactionIndicator.setPosition(obj.x! + obj.width! / 2, obj.y! - 20);
                    this.interactionIndicator.setVisible(true);
                    this.onInteractableEnter(obj);
                }
            }
        });

        // Check for exits
        this.activeInteractables.forEach((_obj) => {
            if (!this.currentlyTouching.has(_obj)) {
                this.activeInteractables.delete(_obj);
                this.interactionIndicator.setVisible(false);
                this.onInteractableExit(_obj);
            }
        });
    }

    protected showDialogue(messageOrOptions: string | DialogueOptions) {
        this.dialogueBox.show(messageOrOptions);
        this.player.setVelocity(0, 0);
    }

    protected startOrResumeMusic(musicKey: string, targetVolume: number = 0.5) {
        const currentSceneName = this.scene.key;
        const savedSeek = this.registry.get(`music_${currentSceneName}_seek`);

        // Stop all currently playing sounds to prevent overlap
        this.sound.stopAll();

        // Check if this music already exists in the sound manager
        const existingMusic = this.sound.get(musicKey);

        if (existingMusic) {
            this.music = existingMusic;
        } else {
            // Create new music only if it doesn't exist
            this.music = this.sound.add(musicKey, { loop: true, volume: 0 });
        }

        // If music is already playing (shouldn't happen after stopAll, but just in case)
        if (this.music.isPlaying) {
            return;
        }

        // Start playing the music
        this.music.play();

        // Set the seek position if we have a saved one
        if (savedSeek !== undefined && savedSeek > 0) {
            const webAudioSound = this.music as
                Phaser.Sound.WebAudioSound | Phaser.Sound.HTML5AudioSound;
            if (webAudioSound.seek !== undefined) {
                webAudioSound.seek = savedSeek;
            }
        }

        // Fade in from volume 0 to target volume
        (this.music as any).volume = 0;
        this.tweens.add({
            targets: this.music,
            volume: targetVolume,
            duration: 1000, // 1 second fade-in
        });
    }

    protected transitionToScene(sceneName: string, data?: any) {
        this.cameras.main.fadeOut(GAME_CONFIG.TRANSITION_DURATION);

        // Fade out and stop the music, saving its position
        if (this.music && this.music.isPlaying) {
            const currentSceneName = this.scene.key;
            const currentSeek = (
                this.music as Phaser.Sound.WebAudioSound | Phaser.Sound.HTML5AudioSound
            ).seek;

            // Save the current position immediately
            this.registry.set(`music_${currentSceneName}_seek`, currentSeek);

            this.tweens.add({
                targets: this.music,
                volume: 0,
                duration: GAME_CONFIG.TRANSITION_DURATION,
                onComplete: () => {
                    // Stop instead of pause to clean up properly
                    this.music?.stop();
                },
            });
        }

        this.cameras.main.once("camerafadeoutcomplete", () => {
            // Stop current scene but keep HUDScene running
            this.scene.stop();
            this.scene.start(sceneName, { ...data, playerDirection: this.lastDirection });
        });
    }

    protected abstract handleInteraction(obj: any): void;

    protected onInteractableEnter(_obj: any) {
        // Override in child scenes
    }

    protected onInteractableExit(_obj: any) {
        // Override in child scenes
    }
}
