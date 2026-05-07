import { useState, useCallback, useRef } from 'react';
import type { Quote } from '../types';

const QUOTES_URL = 'https://type.fit/api/quotes';

function getInitialQuotes(): { allQuotes: Quote[]; current: Quote | null; index: number } {
  const cached = localStorage.getItem('qData');
  if (cached) {
    try {
      const parsed = JSON.parse(cached) as Array<{ text: string; author: string | null }>;
      const mapped = parsed.map(q => ({ text: q.text, author: q.author || 'Unknown' }));
      const randIdx = Math.floor(Math.random() * mapped.length);
      return { allQuotes: mapped, current: mapped[randIdx], index: randIdx };
    } catch { /* fall through */ }
  }
  return { allQuotes: [], current: null, index: 0 };
}

export function useQuotes() {
  const initial = getInitialQuotes();
  const [allQuotes, setAllQuotes] = useState<Quote[]>(initial.allQuotes);
  const [current, setCurrent] = useState<Quote | null>(initial.current);
  const [error, setError] = useState(false);
  const indexRef = useRef(initial.index);
  const fetchedRef = useRef(false);

  // Lazy fetch - called from App
  const fetchQuotes = useCallback(() => {
    if (fetchedRef.current || initial.allQuotes.length > 0) return;
    fetchedRef.current = true;

    fetch(QUOTES_URL)
      .then(res => res.json())
      .then((data: Array<{ text: string; author: string | null }>) => {
        localStorage.setItem('qData', JSON.stringify(data));
        const mapped = data.map(q => ({ text: q.text, author: q.author || 'Unknown' }));
        setAllQuotes(mapped);
        const randIdx = Math.floor(Math.random() * mapped.length);
        setCurrent(mapped[randIdx]);
        indexRef.current = randIdx;
      })
      .catch(() => setError(true));
  }, [initial.allQuotes.length]);

  const nextQuote = useCallback(() => {
    if (allQuotes.length === 0) return;
    indexRef.current = Math.floor(Math.random() * allQuotes.length);
    setCurrent(allQuotes[indexRef.current]);
  }, [allQuotes]);

  return { current, error, nextQuote, fetchQuotes };
}
