import type { Timer } from '@matrixai/timer';

type ContextCancellable = {
  signal: AbortSignal;
};

type ContextTimed = ContextCancellable & {
  timer: Timer;
};

type ContextTimedInput = ContextCancellable & {
  timer: Timer | number;
};

export type { ContextCancellable, ContextTimed, ContextTimedInput };
