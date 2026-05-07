import { useState, useEffect, useCallback, useRef } from 'react';
import Confetti from 'react-confetti';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Header } from './components/Header';
import { Timer } from './components/Timer';
import { TodoList } from './components/TodoList';
import { Settings } from './components/Settings';
import { AboutPane } from './components/AboutPane';
import { QuoteDisplay } from './components/Quote';

import { useTimer } from './hooks/useTimer';
import { useTheme } from './hooks/useTheme';
import { useUnsplash } from './hooks/useUnsplash';
import { useQuotes } from './hooks/useQuotes';
import { useTasks } from './hooks/useTasks';
import { useLocalStorage } from './hooks/useLocalStorage';

import './App.css';

export default function App() {
  // Persisted settings
  const [sessionLen, setSessionLen] = useLocalStorage('sessLen', 25);
  const [breakLen, setBreakLen] = useLocalStorage('brkLen', 5);
  const [isDark, setIsDark] = useLocalStorage('darkMode', false);

  // UI state
  const [showSettings, setShowSettings] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showTodo, setShowTodo] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [bgLoaded, setBgLoaded] = useState(false);

  // Hooks
  const timer = useTimer(sessionLen, breakLen);
  const theme = useTheme(isDark, timer.phase);
  const unsplash = useUnsplash();
  const quotes = useQuotes();
  const { tasks, addTask, toggleTask, deleteTask } = useTasks();

  // Trigger fetches on mount
  useEffect(() => {
    unsplash.fetchPhotos();
    quotes.fetchQuotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Checkpoint handler: cycle background + quote
  useEffect(() => {
    timer.setOnCheckpoint(() => {
      unsplash.nextPhoto();
      quotes.nextQuote();
    });
  }, [timer, unsplash, quotes]);

  // On session complete: confetti + toast
  useEffect(() => {
    timer.setOnBreakEnd(() => {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);

      if (timer.sessionCount > 0 && timer.sessionCount % 4 === 0) {
        toast.info(
          `🎉 ${timer.sessionCount} sessions done! Take a longer break.`,
          { autoClose: 10000 }
        );
      } else {
        toast.success(`Good work! Session ${timer.sessionCount} complete. 🍅`, {
          autoClose: 5000,
        });
      }
    });
  }, [timer]);

  // Tab title
  useEffect(() => {
    const phaseLabels = {
      idle: "t'martyr — Pomodoro Timer",
      working: `Working | ${timer.minutes} min to go | t'martyr`,
      break: `Break | ${timer.minutes} min to go | t'martyr`,
      complete: "Session Over! | t'martyr",
    };
    document.title = phaseLabels[timer.phase];
  }, [timer.phase, timer.minutes]);

  // Offline/online toasts
  useEffect(() => {
    const handleOffline = () => {
      toast.warn(
        "You're offline. t'martyr will keep running, but backgrounds won't update.",
        { autoClose: 15000 }
      );
    };
    const handleOnline = () => {
      toast.info("You're back online!", { autoClose: 5000 });
    };
    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);
    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  // Welcome toast (first visit)
  useEffect(() => {
    const visited = localStorage.getItem('visited');
    if (!visited) {
      toast.info("Welcome! Click the ℹ️ button for tips on using t'martyr.", {
        autoClose: false,
      });
      localStorage.setItem('visited', 'true');
    }
  }, []);

  // Preload background image
  const prevUrlRef = useRef<string | null>(null);
  useEffect(() => {
    const url = unsplash.current?.url;
    if (url && url !== prevUrlRef.current) {
      prevUrlRef.current = url;
      setBgLoaded(false);
      const img = new Image();
      img.onload = () => setBgLoaded(true);
      img.src = url;
    }
    // unsplash object is stable via useCallback but current changes; track via url
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unsplash.current?.url]);

  // Setting changes reset timer
  const handleSessionChange = useCallback(
    (len: number) => {
      setSessionLen(len);
      timer.dispatch({ type: 'SET_DURATION', duration: len });
    },
    [setSessionLen, timer]
  );

  const handleBreakChange = useCallback(
    (len: number) => {
      setBreakLen(len);
    },
    [setBreakLen]
  );

  // Start handler
  const handleStart = useCallback(() => {
    if (timer.phase === 'idle') {
      timer.startWork();
    }
  }, [timer]);

  // Background style
  const bgStyle: React.CSSProperties = {
    backgroundColor: theme.bg,
    backgroundImage:
      unsplash.current && bgLoaded
        ? `linear-gradient(${isDark ? 'rgba(0,0,0,0.65)' : 'rgba(0,0,0,0.25)'}, ${isDark ? 'rgba(0,0,0,0.65)' : 'rgba(0,0,0,0.25)'}), url(${unsplash.current.url})`
        : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'background-image 0.8s ease-in-out, background-color 0.5s ease',
  };

  return (
    <div className="app" style={bgStyle}>
      {showConfetti && <Confetti recycle={false} numberOfPieces={300} />}

      <Header
        theme={theme}
        isDark={isDark}
        showTodo={showTodo}
        onToggleTheme={() => setIsDark(!isDark)}
        onOpenSettings={() => setShowSettings(true)}
        onOpenAbout={() => setShowAbout(true)}
        onToggleTodo={() => setShowTodo(!showTodo)}
        sessionCount={timer.sessionCount}
      />

      <main className="app-main">
        {showTodo ? (
          <TodoList
            tasks={tasks}
            theme={theme}
            onAdd={addTask}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        ) : (
          <Timer
            phase={timer.phase}
            minutes={timer.minutes}
            seconds={timer.seconds}
            isRunning={timer.isRunning}
            theme={theme}
            onStart={handleStart}
            onPause={timer.pause}
            onResume={timer.resume}
            onReset={timer.reset}
            sessionLen={sessionLen}
            breakLen={breakLen}
          />
        )}

        <QuoteDisplay quote={quotes.current} theme={theme} />
      </main>

      {showSettings && (
        <Settings
          sessionLen={sessionLen}
          breakLen={breakLen}
          theme={theme}
          onSessionChange={handleSessionChange}
          onBreakChange={handleBreakChange}
          onClose={() => setShowSettings(false)}
        />
      )}

      {showAbout && (
        <AboutPane
          theme={theme}
          photoAuthor={unsplash.current?.author}
          photoAuthorUrl={unsplash.current?.authorUrl}
          onClose={() => setShowAbout(false)}
        />
      )}

      <ToastContainer
        position="bottom-right"
        transition={Slide}
        theme={isDark ? 'dark' : 'light'}
      />
    </div>
  );
}
