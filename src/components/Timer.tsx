import { Play, Pause, RotateCcw, Circle } from 'lucide-react';
import type { ThemeColors, TimerPhase } from '../types';

interface TimerProps {
  phase: TimerPhase;
  minutes: number;
  seconds: number;
  isRunning: boolean;
  theme: ThemeColors;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onReset: () => void;
  sessionLen: number;
  breakLen: number;
}

function phaseLabel(phase: TimerPhase): string {
  switch (phase) {
    case 'idle': return 'Ready';
    case 'working': return 'Working';
    case 'break': return 'Break';
    case 'complete': return 'Done!';
  }
}

export function Timer({
  phase,
  minutes,
  seconds,
  isRunning,
  theme,
  onStart,
  onPause,
  onResume,
  onReset,
  sessionLen,
  breakLen,
}: TimerProps) {
  const displayMin = phase === 'idle' ? sessionLen : minutes;
  const displaySec = phase === 'idle' ? 0 : seconds;
  const timeStr = `${String(displayMin).padStart(2, '0')}:${String(displaySec).padStart(2, '0')}`;

  return (
    <div className="timer">
      <div className="timer-phase" style={{ color: theme.text }}>
        {phaseLabel(phase)}
      </div>

      <div
        className={`timer-display ${phase === 'working' && isRunning ? 'blink' : ''}`}
        style={{ color: theme.text }}
      >
        {timeStr}
      </div>

      <div className="timer-controls">
        {phase === 'idle' && (
          <button
            className="timer-btn"
            onClick={onStart}
            title="Start working"
            style={{ color: theme.text }}
          >
            <Play size={48} />
          </button>
        )}

        {(phase === 'working' || phase === 'break') && isRunning && (
          <button
            className="timer-btn"
            onClick={onPause}
            title="Pause"
            style={{ color: theme.text }}
          >
            <Pause size={48} />
          </button>
        )}

        {(phase === 'working' || phase === 'break') && !isRunning && (
          <>
            <button
              className="timer-btn"
              onClick={onResume}
              title="Resume"
              style={{ color: theme.text }}
            >
              <Play size={48} />
            </button>
            {phase === 'working' && (
              <button
                className="timer-btn"
                onClick={onReset}
                title="Reset"
                style={{ color: theme.text }}
              >
                <Circle size={48} />
              </button>
            )}
          </>
        )}

        {phase === 'complete' && (
          <button
            className="timer-btn"
            onClick={onReset}
            title="Start Over"
            style={{ color: theme.text }}
          >
            <RotateCcw size={48} />
          </button>
        )}
      </div>

      <div className="timer-info" style={{ color: theme.text, opacity: 0.7 }}>
        {phase === 'idle' && `${sessionLen} min work · ${breakLen} min break`}
        {phase === 'working' && `Session · ${minutes} min to go`}
        {phase === 'break' && `Break · ${minutes} min to go`}
        {phase === 'complete' && 'Great work! Take a longer break.'}
      </div>
    </div>
  );
}
