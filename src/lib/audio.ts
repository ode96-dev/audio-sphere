export type SoundProfile = "comedy" | "politic" | "science" | "ambient";

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private masterGain: GainNode | null = null;
  private activeNodes: AudioNode[] = [];
  private timer: ReturnType<typeof setInterval> | null = null;
  private elapsedSeconds = 0;
  private totalDuration = 30;
  private volume = 0.75;
  private muted = false;
  private playbackRate = 1;

  private ensureContext(): AudioContext | null {
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
      void this.ctx.resume();
    }
    return this.ctx;
  }

  private getEffectiveGain(): number {
    return this.muted ? 0 : this.volume * 0.14;
  }

  setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(
        this.getEffectiveGain(),
        this.ctx.currentTime,
        0.04,
      );
    }
  }

  setMuted(muted: boolean) {
    this.muted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(
        this.getEffectiveGain(),
        this.ctx.currentTime,
        0.04,
      );
    }
  }

  setPlaybackRate(rate: number) {
    this.playbackRate = rate;
  }

  seekTo(seconds: number) {
    this.elapsedSeconds = Math.max(0, Math.min(this.totalDuration, seconds));
  }

  playEpisodePreview(
    profile: SoundProfile = "science",
    startAt = 0,
    onProgress?: (elapsed: number, total: number) => void,
    onComplete?: () => void,
  ) {
    this.stop();
    const ctx = this.ensureContext();
    if (!ctx) return;

    this.isPlaying = true;
    this.elapsedSeconds = Math.max(
      0,
      Math.min(this.totalDuration - 0.5, startAt),
    );

    const now = ctx.currentTime;
    const master = ctx.createGain();
    master.gain.setValueAtTime(0.0001, now);
    master.gain.exponentialRampToValueAtTime(
      Math.max(0.0001, this.getEffectiveGain()),
      now + 0.35,
    );
    master.connect(ctx.destination);
    this.masterGain = master;

    const chords: Record<SoundProfile, number[]> = {
      comedy: [261.63, 329.63, 392.0, 493.88],
      politic: [196.0, 233.08, 293.66, 349.23],
      science: [220.0, 277.18, 329.63, 415.3],
      ambient: [174.61, 220.0, 261.63, 329.63],
    };

    const frequencies = chords[profile] || chords.science;

    frequencies.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + idx * 0.09);

      noteGain.gain.setValueAtTime(0.0001, now + idx * 0.09);
      noteGain.gain.exponentialRampToValueAtTime(0.35, now + idx * 0.09 + 0.08);
      noteGain.gain.exponentialRampToValueAtTime(0.08, now + idx * 0.09 + 2.4);

      osc.connect(noteGain);
      noteGain.connect(master);
      osc.start(now + idx * 0.09);
      osc.stop(now + 4.5);
      this.activeNodes.push(osc, noteGain);
    });

    const padOsc = ctx.createOscillator();
    padOsc.type = "triangle";
    padOsc.frequency.setValueAtTime(frequencies[0] / 2, now);

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(520, now);

    const lfo = ctx.createOscillator();
    lfo.type = "sine";
    lfo.frequency.setValueAtTime(0.4, now);
    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(160, now);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    const padGain = ctx.createGain();
    padGain.gain.setValueAtTime(0.4, now);

    padOsc.connect(filter);
    filter.connect(padGain);
    padGain.connect(master);

    padOsc.start(now);
    lfo.start(now);
    this.activeNodes.push(padOsc, lfo, lfoGain, filter, padGain);

    if (onProgress) {
      onProgress(this.elapsedSeconds, this.totalDuration);
    }

    this.timer = setInterval(() => {
      this.elapsedSeconds += 0.25 * this.playbackRate;
      if (this.elapsedSeconds >= this.totalDuration) {
        this.elapsedSeconds = this.totalDuration;
        if (onProgress) onProgress(this.elapsedSeconds, this.totalDuration);
        this.stop();
        if (onComplete) onComplete();
        return;
      }
      if (onProgress) onProgress(this.elapsedSeconds, this.totalDuration);
    }, 250);
  }

  playPopSound() {
    const ctx = this.ensureContext();
    if (!ctx || this.muted) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(780, now + 0.06);

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.065);
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    const nodes = [...this.activeNodes];
    this.activeNodes = [];

    if (this.masterGain && this.ctx) {
      try {
        this.masterGain.gain.setTargetAtTime(
          0.0001,
          this.ctx.currentTime,
          0.05,
        );
      } catch {
        // ignore
      }
    }

    setTimeout(() => {
      nodes.forEach((node) => {
        try {
          if (
            "stop" in node &&
            typeof (node as OscillatorNode).stop === "function"
          ) {
            (node as OscillatorNode).stop();
          }
          node.disconnect();
        } catch {
          // ignore
        }
      });
    }, 120);

    this.isPlaying = false;
  }

  getPlaying() {
    return this.isPlaying;
  }
}

export const soundEngine = new SoundEngine();
