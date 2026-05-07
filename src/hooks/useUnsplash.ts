import { useState, useCallback, useRef } from 'react';
import type { UnsplashPhoto } from '../types';

const COLLECTION_IDS = '1301408,865018,3330448,1301453,1155333,791207,327760,3672442';

function getInitialState(): { isLoading: boolean; error: boolean } {
  if (!navigator.onLine || !import.meta.env.VITE_UNSPLASH_KEY) {
    return { isLoading: false, error: true };
  }
  return { isLoading: true, error: false };
}

export function useUnsplash() {
  const initial = getInitialState();
  const [photos, setPhotos] = useState<UnsplashPhoto[]>([]);
  const [current, setCurrent] = useState<UnsplashPhoto | null>(null);
  const [isLoading, setIsLoading] = useState(initial.isLoading);
  const [error, setError] = useState(initial.error);
  const indexRef = useRef(0);
  const fetchedRef = useRef(false);

  // Lazy fetch on first render cycle - called from App
  const fetchPhotos = useCallback(() => {
    if (fetchedRef.current || initial.error) return;
    fetchedRef.current = true;

    const accessKey = import.meta.env.VITE_UNSPLASH_KEY;
    fetch(
      `https://api.unsplash.com/photos/random?collections=${COLLECTION_IDS}&count=30&client_id=${accessKey}`
    )
      .then(res => res.json())
      .then((data: Array<{ urls: { raw: string }; user: { name: string; links: { html: string } } }>) => {
        if (!Array.isArray(data)) throw new Error('Invalid response');
        const mapped = data.map(p => ({
          url: `${p.urls.raw}&auto=format&fit=crop&w=1350&q=80`,
          author: p.user.name,
          authorUrl: p.user.links.html,
        }));
        setPhotos(mapped);
        setCurrent(mapped[0]);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setError(true);
      });
  }, [initial.error]);

  const nextPhoto = useCallback(() => {
    if (photos.length === 0) return;
    indexRef.current = (indexRef.current + 1) % photos.length;
    setCurrent(photos[indexRef.current]);
  }, [photos]);

  return { current, isLoading, error, nextPhoto, fetchPhotos };
}
