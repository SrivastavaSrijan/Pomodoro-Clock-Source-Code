import { useEffect, useRef } from 'react';
import { X, Clock, Target, MessageCircle, Coffee, SlidersHorizontal, Moon, ListTodo } from 'lucide-react';
import type { ThemeColors } from '../types';

interface AboutPaneProps {
  theme: ThemeColors;
  photoAuthor?: string;
  photoAuthorUrl?: string;
  onClose: () => void;
}

const tips = [
  { icon: Clock, text: 'Set your timer to an achievable duration' },
  { icon: Target, text: 'Add tasks to your to-do list to stay focused' },
  { icon: MessageCircle, text: 'Work through your session, then enjoy your break' },
  { icon: Coffee, text: 'Take a longer break every 4 Pomodoros' },
  { icon: SlidersHorizontal, text: 'Adjust session length via the settings icon' },
  { icon: Moon, text: 'Toggle dark mode with the theme button' },
  { icon: ListTodo, text: 'Switch between timer and tasks with the list icon' },
];

export function AboutPane({ theme, photoAuthor, photoAuthorUrl, onClose }: AboutPaneProps) {
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
      <div className="modal-content about-modal" style={{ borderColor: theme.border }}>
        <button className="modal-close" onClick={onClose} style={{ color: theme.text }}>
          <X size={24} />
        </button>

        <h2 style={{ color: theme.text }}>How to use t'martyr</h2>

        <ul className="about-tips">
          {tips.map((tip, i) => (
            <li key={i} style={{ color: theme.text }}>
              <tip.icon size={20} style={{ opacity: 0.8, flexShrink: 0 }} />
              <span>{tip.text}</span>
            </li>
          ))}
        </ul>

        <div className="about-footer" style={{ color: theme.text, opacity: 0.6 }}>
          {photoAuthor && (
            <p>
              Photo by{' '}
              <a
                href={photoAuthorUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: theme.text }}
              >
                {photoAuthor}
              </a>{' '}
              on Unsplash
            </p>
          )}
          <p>Made with ❤️ by Srijan</p>
        </div>
      </div>
    </div>
  );
}
