import { SlidersHorizontal, Moon, Sun, Info, ListTodo, Timer as TimerIcon } from 'lucide-react';
import type { ThemeColors } from '../types';

interface HeaderProps {
  theme: ThemeColors;
  isDark: boolean;
  showTodo: boolean;
  onToggleTheme: () => void;
  onOpenSettings: () => void;
  onOpenAbout: () => void;
  onToggleTodo: () => void;
  sessionCount: number;
}

export function Header({
  theme,
  isDark,
  showTodo,
  onToggleTheme,
  onOpenSettings,
  onOpenAbout,
  onToggleTodo,
  sessionCount,
}: HeaderProps) {
  return (
    <header className="app-header" style={{ borderBottomColor: theme.muted }}>
      <div className="header-left">
        <img
          src="./icon.png"
          alt="Logo"
          className="header-logo"
          style={{ filter: isDark ? 'hue-rotate(180deg) brightness(1.5)' : 'none' }}
        />
        <h1 className="header-title" style={{ color: theme.text }}>
          t'martyr
        </h1>
        {sessionCount > 0 && (
          <span className="header-sessions" style={{ color: theme.text, opacity: 0.6 }}>
            {sessionCount} 🍅
          </span>
        )}
      </div>

      <nav className="header-actions">
        <button
          className="header-btn"
          onClick={onToggleTodo}
          title={showTodo ? 'Show timer' : 'Show tasks'}
          style={{ color: theme.text }}
        >
          {showTodo ? <TimerIcon size={22} /> : <ListTodo size={22} />}
        </button>
        <button
          className="header-btn"
          onClick={onToggleTheme}
          title={isDark ? 'Light mode' : 'Dark mode'}
          style={{ color: theme.text }}
        >
          {isDark ? <Sun size={22} /> : <Moon size={22} />}
        </button>
        <button
          className="header-btn"
          onClick={onOpenSettings}
          title="Settings"
          style={{ color: theme.text }}
        >
          <SlidersHorizontal size={22} />
        </button>
        <button
          className="header-btn"
          onClick={onOpenAbout}
          title="About"
          style={{ color: theme.text }}
        >
          <Info size={22} />
        </button>
      </nav>
    </header>
  );
}
