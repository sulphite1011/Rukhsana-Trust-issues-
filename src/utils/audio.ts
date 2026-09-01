// Audio engine supporting "Mile Ho Tum Humko" song playback and interactive sound effects

type AudioListener = (isPlaying: boolean) => void;

class SoundEngine {
  private ctx: AudioContext | null = null;
  private audioEl: HTMLAudioElement | null = null;
  private isMuted: boolean = false;
  private isMusicPlaying: boolean = false;
  private listeners: Set<AudioListener> = new Set();

  constructor() {
    if (typeof window !== 'undefined') {
      this.initAudioElement();
    }
  }

  private initAudioElement() {
    if (!this.audioEl && typeof Audio !== 'undefined') {
      this.audioEl = new Audio('/mile_ho_tum.mp3');
      this.audioEl.loop = true;
      this.audioEl.volume = 0.75;

      this.audioEl.addEventListener('play', () => {
        this.isMusicPlaying = true;
        this.notifyListeners();
      });

      this.audioEl.addEventListener('pause', () => {
        this.isMusicPlaying = false;
        this.notifyListeners();
      });

      this.audioEl.addEventListener('ended', () => {
        this.isMusicPlaying = false;
        this.notifyListeners();
      });
    }
  }

  public subscribe(fn: AudioListener): () => void {
    this.listeners.add(fn);
    fn(this.isMusicPlaying);
    return () => {
      this.listeners.delete(fn);
    };
  }

  private notifyListeners() {
    this.listeners.forEach((fn) => fn(this.isMusicPlaying));
  }

  public async playMusic() {
    this.initAudioElement();
    if (this.audioEl) {
      try {
        await this.audioEl.play();
        this.isMusicPlaying = true;
        this.notifyListeners();
      } catch {
        // Autoplay may be restricted until user gesture
      }
    }
  }

  public pauseMusic() {
    if (this.audioEl) {
      this.audioEl.pause();
      this.isMusicPlaying = false;
      this.notifyListeners();
    }
  }

  public async toggleMusic(): Promise<boolean> {
    this.initAudioElement();
    if (!this.audioEl) return false;

    if (this.audioEl.paused) {
      try {
        await this.audioEl.play();
        this.isMusicPlaying = true;
      } catch (err) {
        console.warn('Playback error:', err);
      }
    } else {
      this.audioEl.pause();
      this.isMusicPlaying = false;
    }
    this.notifyListeners();
    return this.isMusicPlaying;
  }

  public getIsPlaying(): boolean {
    return this.isMusicPlaying;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playChime(freq: number = 523.25, duration: number = 0.8, type: OscillatorType = 'sine') {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, this.ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // ignore
    }
  }

  public playPop() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(350, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    } catch {
      // ignore
    }
  }

  public playTing() {
    this.playChime(659.25, 0.4, 'sine');
  }

  public playSuccess() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((note, i) => {
        setTimeout(() => {
          this.playChime(note, 1.2, 'sine');
        }, i * 140);
      });
    } catch {
      // ignore
    }
  }

  public playDodge() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(110, this.ctx.currentTime + 0.2);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.2);
    } catch {
      // ignore
    }
  }
}

export const sound = new SoundEngine();
