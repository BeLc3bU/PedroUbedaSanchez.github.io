import Phaser from "phaser";

class OutlinePipeline extends Phaser.Renderer.WebGL.Pipelines.MultiPipeline {
    constructor(game: Phaser.Game) {
        super({
            game: game,
            name: "Outline",
            fragShader: `
precision mediump float;

uniform sampler2D uMainSampler;
uniform vec3 uOutlineColor;
uniform float uThickness;
uniform vec2 uOffset;

varying vec2 outTexCoord;
varying vec4 outTint;

void main(void) {
    vec2 uv = outTexCoord + uOffset;
    vec4 color = texture2D(uMainSampler, uv);

    if (color.a > 0.5) {
        gl_FragColor = color * outTint;
    } else {
        float outline = 0.0;

        for (float x = -1.0; x <= 1.0; x++) {
            for (float y = -1.0; y <= 1.0; y++) {
                vec4 sample = texture2D(uMainSampler, uv + vec2(x, y) * uThickness);
                if (sample.a > 0.5) {
                    outline = 1.0;
                }
            }
        }

        gl_FragColor = vec4(uOutlineColor * outline, outline);
    }
}`,
        });
    }
}

export default class OutlineEffect {
    static addToScene(scene: Phaser.Scene) {
        const renderer = scene.game.renderer as Phaser.Renderer.WebGL.WebGLRenderer;
        if (!renderer.pipelines.get("Outline")) {
            renderer.pipelines.add("Outline", new OutlinePipeline(scene.game));
        }
    }

    /**
     * thickness: in UV units (as before)
     * offsetXPx/offsetYPx: pixel offset applied to sampling (converted to UV using texture size)
     */
    static apply(
        sprite: Phaser.GameObjects.Sprite | Phaser.GameObjects.Image,
        color: number = 0xffffff,
        thickness: number = 0.002,
        offsetXPx: number = 0,
        offsetYPx: number = 0
    ) {
        sprite.setPipeline("Outline");

        const r = ((color >> 16) & 255) / 255;
        const g = ((color >> 8) & 255) / 255;
        const b = (color & 255) / 255;

        const pipeline = sprite.pipeline as any;
        if (pipeline && pipeline.set3f && pipeline.set1f) {
            pipeline.set3f("uOutlineColor", r, g, b);
            pipeline.set1f("uThickness", thickness);

            // Convert pixel offset -> UV offset using the underlying texture size
            const source = (sprite.texture as any)?.source?.[0];
            const texW = source?.width ?? 0;
            const texH = source?.height ?? 0;

            const u = texW ? offsetXPx / texW : 0;
            const v = texH ? offsetYPx / texH : 0;

            if (pipeline.set2f) {
                pipeline.set2f("uOffset", u, v);
            }
        }
    }

    static remove(sprite: Phaser.GameObjects.Sprite | Phaser.GameObjects.Image) {
        sprite.resetPipeline();
    }
}
