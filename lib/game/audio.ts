// Tactical Web Audio API Synthesizer (Zero-dependency, ultra-lightweight)

class TacticalSoundEngine {
    private ctx: AudioContext | null = null;
    private isMuted: boolean = false;

    private getContext(): AudioContext | null {
        if (typeof window === "undefined") return null;

        if (!this.ctx) {
            const AudioCtx =
                window.AudioContext ||
                (window as unknown as { webkitAudioContext: typeof AudioContext })
                    .webkitAudioContext;
            if (AudioCtx) {
                this.ctx = new AudioCtx();
            }
        }

        if (this.ctx && this.ctx.state === "suspended") {
            this.ctx.resume().catch(() => {});
        }

        return this.ctx;
    }

    public setMuted(muted: boolean) {
        this.isMuted = muted;
    }

    public getMuted(): boolean {
        return this.isMuted;
    }

    public toggleMuted(): boolean {
        this.isMuted = !this.isMuted;
        return this.isMuted;
    }

    // Sub-routine: Sutil Bip de Navegación / Hover (880Hz, 30ms)
    public playHover() {
        if (this.isMuted) return;
        const ctx = this.getContext();
        if (!ctx) return;

        try {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = "sine";
            osc.frequency.setValueAtTime(880, ctx.currentTime);

            gain.gain.setValueAtTime(0.04, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.035);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.035);
        } catch {
            // Ignorar errores de audio en navegadores con restricciones
        }
    }

    // Sub-routine: Tono ascendente de confirmación / Selección táctica (440Hz -> 880Hz, 60ms)
    public playSelect() {
        if (this.isMuted) return;
        const ctx = this.getContext();
        if (!ctx) return;

        try {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = "triangle";
            osc.frequency.setValueAtTime(440, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.06);

            gain.gain.setValueAtTime(0.08, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.06);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.06);
        } catch {
            // Audio context not allowed without prior user interaction
        }
    }

    // Sub-routine: Apertura de Estación Táctica (Doble tono armónico 520Hz + 780Hz, 90ms)
    public playStationOpen() {
        if (this.isMuted) return;
        const ctx = this.getContext();
        if (!ctx) return;

        try {
            const now = ctx.currentTime;
            [520, 780].forEach((freq) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();

                osc.type = "sine";
                osc.frequency.setValueAtTime(freq, now);

                gain.gain.setValueAtTime(0.06, now);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);

                osc.connect(gain);
                gain.connect(ctx.destination);

                osc.start(now);
                osc.stop(now + 0.09);
            });
        } catch {
            // Audio context not allowed without prior user interaction
        }
    }

    // Sub-routine: Cierre de Estación (Tono descendente 600Hz -> 300Hz, 70ms)
    public playStationClose() {
        if (this.isMuted) return;
        const ctx = this.getContext();
        if (!ctx) return;

        try {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = "sine";
            osc.frequency.setValueAtTime(600, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.07);

            gain.gain.setValueAtTime(0.05, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.07);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.07);
        } catch {
            // Audio context not allowed without prior user interaction
        }
    }
}

export const tacticalAudio = new TacticalSoundEngine();
