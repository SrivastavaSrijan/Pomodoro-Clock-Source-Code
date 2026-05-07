// Timer state machine types
export type TimerPhase = 'idle' | 'working' | 'break' | 'complete';

export interface TimerState {
  phase: TimerPhase;
  remaining: number; // seconds remaining
  isRunning: boolean;
  sessionCount: number;
  checkpointIndex: number;
}

export type TimerAction =
  | { type: 'START' }
  | { type: 'PAUSE' }
  | { type: 'TICK' }
  | { type: 'RESET' }
  | { type: 'START_WORK'; duration: number }
  | { type: 'START_BREAK'; breakDuration: number }
  | { type: 'COMPLETE' }
  | { type: 'SET_DURATION'; duration: number };

// Theme
export interface ThemeColors {
  text: string;
  border: string;
  bg: string;
  muted: string;
}

// Tasks
export interface Task {
  id: string;
  text: string;
  done: boolean;
}

// Unsplash
export interface UnsplashPhoto {
  url: string;
  author: string;
  authorUrl: string;
}

// Quote
export interface Quote {
  text: string;
  author: string;
}
