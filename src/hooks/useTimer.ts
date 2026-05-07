import { useReducer, useEffect, useRef, useCallback } from 'react';
import type { TimerState, TimerAction } from '../types';

const CHECKPOINT_COUNT = 20;

function timerReducer(state: TimerState, action: TimerAction): TimerState {
  switch (action.type) {
    case 'START':
      return { ...state, isRunning: true };
    case 'PAUSE':
      return { ...state, isRunning: false };
    case 'TICK': {
      if (!state.isRunning || state.remaining <= 0) return state;
      const next = state.remaining - 1;
      if (next <= 0) {
        return { ...state, remaining: 0, isRunning: false };
      }
      return { ...state, remaining: next };
    }
    case 'START_WORK':
      return {
        ...state,
        phase: 'working',
        remaining: action.duration * 60,
        isRunning: true,
        checkpointIndex: 0,
      };
    case 'START_BREAK':
      return {
        ...state,
        phase: 'break',
        remaining: action.breakDuration * 60,
        isRunning: true,
        sessionCount: state.sessionCount + 1,
        checkpointIndex: 0,
      };
    case 'COMPLETE':
      return { ...state, phase: 'complete', isRunning: false };
    case 'RESET':
      return {
        phase: 'idle',
        remaining: 0,
        isRunning: false,
        sessionCount: state.sessionCount,
        checkpointIndex: 0,
      };
    case 'SET_DURATION':
      return {
        ...state,
        phase: 'idle',
        remaining: 0,
        isRunning: false,
        checkpointIndex: 0,
      };
    default:
      return state;
  }
}

const initialState: TimerState = {
  phase: 'idle',
  remaining: 0,
  isRunning: false,
  sessionCount: 0,
  checkpointIndex: 0,
};

// Audio setup
function createAudio(src: string, volume: number): HTMLAudioElement {
  const audio = new Audio(src);
  audio.volume = volume;
  return audio;
}

export function useTimer(sessionLen: number, breakLen: number) {
  const [state, dispatch] = useReducer(timerReducer, initialState);
  const intervalRef = useRef<number | null>(null);
  const prevPhaseRef = useRef(state.phase);
  const lastCheckpointRef = useRef(-1);

  // Audio refs - created once
  const audioRef = useRef({
    start: createAudio('./audio/start.mp3', 0.3),
    pause: createAudio('./audio/pause.mp3', 0.4),
    again: createAudio('./audio/again.mp3', 0.3),
    alarm: createAudio('./audio/alarm.mp3', 0.7),
    psdbrk: createAudio('./audio/psdbrk.mp3', 0.6),
    over: createAudio('./audio/over.mp3', 0.2),
  });

  const playSound = useCallback((name: keyof typeof audioRef.current) => {
    const a = audioRef.current[name];
    a.currentTime = 0;
    a.play().catch(() => {});
  }, []);

  // Tick interval
  useEffect(() => {
    if (state.isRunning) {
      intervalRef.current = window.setInterval(() => dispatch({ type: 'TICK' }), 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [state.isRunning]);

  // Calculate checkpoints for background/quote cycling
  const totalSeconds = state.phase === 'working' ? sessionLen * 60 : breakLen * 60;
  const elapsed = totalSeconds - state.remaining;
  const checkpointInterval = totalSeconds / CHECKPOINT_COUNT;
  const currentCheckpoint = checkpointInterval > 0 ? Math.floor(elapsed / checkpointInterval) : 0;

  // Checkpoint callback
  const onCheckpointRef = useRef<(() => void) | null>(null);
  const setOnCheckpoint = useCallback((cb: () => void) => {
    onCheckpointRef.current = cb;
  }, []);

  useEffect(() => {
    if (currentCheckpoint !== lastCheckpointRef.current && state.isRunning && currentCheckpoint > 0) {
      lastCheckpointRef.current = currentCheckpoint;
      onCheckpointRef.current?.();
    }
  }, [currentCheckpoint, state.isRunning]);

  // Detect phase transitions for sounds
  const onWorkEndRef = useRef<(() => void) | null>(null);
  const onBreakEndRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    // Work session ended (remaining hit 0 while working)
    if (state.phase === 'working' && state.remaining === 0 && !state.isRunning) {
      if (prevPhaseRef.current === 'working') {
        playSound('alarm');
        onWorkEndRef.current?.();
        // Automatically start break
        setTimeout(() => {
          dispatch({ type: 'START_BREAK', breakDuration: breakLen });
        }, 1500);
      }
    }
    // Break ended
    if (state.phase === 'break' && state.remaining === 0 && !state.isRunning) {
      if (prevPhaseRef.current === 'break') {
        dispatch({ type: 'COMPLETE' });
        onBreakEndRef.current?.();
      }
    }
    prevPhaseRef.current = state.phase;
  }, [state.phase, state.remaining, state.isRunning, breakLen, playSound]);

  const start = useCallback(() => {
    if (state.phase === 'idle') {
      dispatch({ type: 'START_WORK', duration: sessionLen });
      playSound('start');
    } else if ((state.phase === 'working' || state.phase === 'break') && !state.isRunning) {
      playSound('again');
      dispatch({ type: 'START' });
    }
  }, [state.phase, state.isRunning, sessionLen, playSound]);

  // Dedicated start work function
  const startWork = useCallback(() => {
    dispatch({ type: 'START_WORK', duration: sessionLen });
    playSound('start');
  }, [sessionLen, playSound]);

  const pause = useCallback(() => {
    if (state.phase === 'break') {
      playSound('psdbrk');
    } else {
      playSound('pause');
    }
    dispatch({ type: 'PAUSE' });
  }, [state.phase, playSound]);

  const resume = useCallback(() => {
    playSound('again');
    dispatch({ type: 'START' });
  }, [playSound]);

  const reset = useCallback(() => {
    playSound('over');
    dispatch({ type: 'RESET' });
  }, [playSound]);

  // Minutes/seconds for display
  const minutes = Math.floor(state.remaining / 60);
  const seconds = state.remaining % 60;

  return {
    ...state,
    minutes,
    seconds,
    start,
    startWork,
    pause,
    resume,
    reset,
    dispatch,
    setOnCheckpoint,
    setOnWorkEnd: (cb: () => void) => { onWorkEndRef.current = cb; },
    setOnBreakEnd: (cb: () => void) => { onBreakEndRef.current = cb; },
  };
}
