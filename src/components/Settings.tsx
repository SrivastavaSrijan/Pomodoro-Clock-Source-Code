import { useEffect, useRef } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import type { ThemeColors } from '../types';

interface SettingsProps {
  sessionLen: number;
  breakLen: number;
  theme: ThemeColors;
  onSessionChange: (len: number) => void;
  onBreakChange: (len: number) => void;
  onClose: () => void;
}

export function Settings({
  sessionLen,
  breakLen,
  theme,
  onSessionChange,
  onBreakChange,
  onClose,
}: SettingsProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <div className="modal-overlay" ref={overlayRef} onClick={handleOverlayClick}>
      <div className="modal-content settings-modal" style={{ borderColor: theme.border }}>
        <button className="modal-close" onClick={onClose} style={{ color: theme.text }}>
          <X size={24} />
        </button>

        <h2 style={{ color: theme.text }}>Settings</h2>

        <div className="setting-row">
          <label style={{ color: theme.text }}>Work Session</label>
          <div className="setting-controls">
            <button
              onClick={() => onSessionChange(Math.max(10, sessionLen - 5))}
              disabled={sessionLen <= 10}
              style={{ color: theme.text }}
            >
              <Minus size={20} />
            </button>
            <span className="setting-value" style={{ color: theme.text }}>
              {sessionLen} min
            </span>
            <button
              onClick={() => onSessionChange(Math.min(60, sessionLen + 5))}
              disabled={sessionLen >= 60}
              style={{ color: theme.text }}
            >
              <Plus size={20} />
            </button>
          </div>
        </div>

        <div className="setting-row">
          <label style={{ color: theme.text }}>Break</label>
          <div className="setting-controls">
            <button
              onClick={() => onBreakChange(Math.max(5, breakLen - 1))}
              disabled={breakLen <= 5}
              style={{ color: theme.text }}
            >
              <Minus size={20} />
            </button>
            <span className="setting-value" style={{ color: theme.text }}>
              {breakLen} min
            </span>
            <button
              onClick={() => onBreakChange(Math.min(25, breakLen + 1))}
              disabled={breakLen >= 25}
              style={{ color: theme.text }}
            >
              <Plus size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
