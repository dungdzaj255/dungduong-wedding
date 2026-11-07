// Web Audio API synthesized magical chime / tinkle sound
// Ultra-clean, zero-dependency, zero-latency, beautiful crystal chime for wedding invitation

let audioCtx = null;

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playTinkleSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    // Magical crystal ascending arpeggio with shimmering chime harmonics
    const notes = [783.99, 1046.5, 1318.51, 1567.98, 1975.53, 2093.0, 2637.02];
    const now = ctx.currentTime;

    notes.forEach((freq, i) => {
      const startTime = now + i * 0.065;
      const duration = 0.9 - i * 0.05;

      // Primary bell tone
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = i % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.015, startTime + duration);

      // Bell envelope
      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.linearRampToValueAtTime(0.18 / (1 + i * 0.15), startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      // Shimmer overtone (higher crystal harmonic)
      const shimmerOsc = ctx.createOscillator();
      const shimmerGain = ctx.createGain();
      shimmerOsc.type = 'sine';
      shimmerOsc.frequency.setValueAtTime(freq * 2.76, startTime);
      shimmerGain.gain.setValueAtTime(0.0001, startTime);
      shimmerGain.gain.linearRampToValueAtTime(0.06 / (1 + i * 0.2), startTime + 0.015);
      shimmerGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration * 0.6);

      // Connect nodes
      osc.connect(gain);
      gain.connect(ctx.destination);

      shimmerOsc.connect(shimmerGain);
      shimmerGain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration);
      shimmerOsc.start(startTime);
      shimmerOsc.stop(startTime + duration);
    });
  } catch (err) {
    console.warn('AudioContext tinkle sound warning:', err);
  }
}
