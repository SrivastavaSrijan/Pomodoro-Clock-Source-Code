# 🍅 t'martyr — Pomodoro Timer

A beautiful, modern Pomodoro timer rebuilt with **React 19**, **TypeScript**, and **Vite**.

Originally built in 2020 as a learning project — now rebuilt with modern tooling while preserving every original UX decision.

## Features

- ⏱️ **Timer state machine** — idle → working → break → complete, with configurable durations
- 🎨 **Dual themes** — Light (coral/turquoise) and Dark (Material Design)
- 🖼️ **Unsplash backgrounds** — Dynamic photos from curated collections, cycling at checkpoints
- 💬 **Quote of the Day** — Random quotes cycling alongside backgrounds
- ✅ **Todo list** — Add, complete, delete tasks with localStorage persistence
- 🔔 **6 distinct sound cues** — Start, pause, resume, alarm, break-pause, and completion sounds
- 🎉 **Confetti** — Celebration effect on session completion
- 📱 **PWA** — Installable with manifest and offline-capable
- 📋 **Toast notifications** — Welcome, offline/online status, session milestones
- 🌐 **Offline-first** — Timer keeps running without internet
- 📐 **Responsive** — Optimized for mobile and desktop

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + TypeScript |
| Build | Vite 8 |
| Icons | Lucide React |
| Toasts | React Toastify |
| Effects | React Confetti |
| Deploy | GitHub Pages |

## Getting Started

```bash
npm install
npm run dev
```

### Environment Variables

Create a `.env` file (see `.env.example`):

```
VITE_UNSPLASH_KEY=your_unsplash_access_key
```

Get a key at [unsplash.com/developers](https://unsplash.com/developers).

## Deploy

```bash
npm run deploy
```

This builds and publishes to GitHub Pages via `gh-pages`.

## Architecture

```
src/
├── hooks/
│   ├── useTimer.ts        # Timer state machine (useReducer)
│   ├── useTheme.ts        # Phase-aware color system
│   ├── useUnsplash.ts     # Background photo management
│   ├── useQuotes.ts       # Quote cycling with localStorage cache
│   ├── useTasks.ts        # Todo CRUD with localStorage
│   └── useLocalStorage.ts # Generic localStorage hook
├── components/
│   ├── Timer.tsx           # Timer display + controls
│   ├── TodoList.tsx        # Task management UI
│   ├── Settings.tsx        # Session/break duration config
│   ├── AboutPane.tsx       # Help/tips modal
│   ├── Header.tsx          # Navigation + theme toggle
│   └── Quote.tsx           # Quote display
├── App.tsx                 # Root composition
├── App.css                 # All styles
└── types.ts                # TypeScript types
```

## License

Made with ❤️ by Srijan
