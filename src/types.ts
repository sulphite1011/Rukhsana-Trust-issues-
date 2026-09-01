export type StepId = 'intro' | 'story' | 'trust-meter' | 'question' | 'celebration';

export interface FloatingParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  symbol: string;
  opacity: number;
  delay: number;
}
