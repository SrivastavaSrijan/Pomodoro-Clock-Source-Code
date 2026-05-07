import { useState, useCallback, useRef } from 'react';
import type { Quote } from '../types';
import { quotes as localQuotes } from '../data/quotes';

function getInitialQuote(): { allQuotes: Quote[]; current: Quote; index: number } {
  const mapped = localQuotes.map(q => ({ text: q.text, author: q.author }));
  const randIdx = Math.floor(Math.random() * mapped.length);
  return { allQuotes: mapped, current: mapped[randIdx], index: randIdx };
}

export function useQuotes() {
  const initial = getInitialQuote();
  const [allQuotes] = useState<Quote[]>(initial.allQuotes);
  const [current, setCurrent] = useState<Quote>(initial.current);
  const indexRef = useRef(initial.index);

  // No-op kept for API compatibility with App.tsx mount effect
  const fetchQuotes = useCallback(() => {}, []);

  const nextQuote = useCallback(() => {
    if (allQuotes.length === 0) return;
    indexRef.current = Math.floor(Math.random() * allQuotes.length);
    setCurrent(allQuotes[indexRef.current]);
  }, [allQuotes]);

  return { current, error: false, nextQuote, fetchQuotes };
}
