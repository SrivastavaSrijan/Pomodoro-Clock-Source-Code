import { useState, useCallback, useRef } from 'react';
import type { UnsplashPhoto } from '../types';

const COLLECTION_IDS = '1301408,865018,3330448,1301453,1155333,791207,327760,3672442';

interface UnsplashRawPhoto {
  urls: { raw: string };
  user: {
    first_name: string;
    last_name: string;
    name: string;
    links: { html: string };
  };
}

function getInitialState(): { isLoading: boolean; error: boolean } {
  if (!navigator.onLine || !import.meta.env.VITE_UNSPLASH_KEY) {
    return { isLoading: false, error: true };
  }
  return { isLoading: true, error: false };
}

export function useUnsplash() {
  const initial = getInitialState();
  const [photos, setPhotos] = useState<UnsplashRawPhoto[]>([]);
  const [current, setCurrent] = useState<UnsplashPhoto | null>(null);
  const [isLoading, setIsLoading] = useState(initial.isLoading);
  const [error, setError] = useState(initial.error);
  const fetchedRef = useRef(false);

  const pickPhoto = useCallback((rawPhotos: UnsplashRawPhoto[]): UnsplashPhoto => {
    const idx = Math.floor(Math.random() * rawPhotos.length);
    const p = rawPhotos[idx];
    return {
      url: `${p.urls.raw}&auto=format&fit=crop&w=1350&q=80`,
      author: [p.user.first_name, p.user.last_name].filter(Boolean).join(' ') || p.user.name,
      authorUrl: p.user.links.html,
    };
  }, []);

  // Lazy fetch on first render cycle - called from App
  const fetchPhotos = useCallback(() => {
    if (fetchedRef.current || initial.error) return;
    fetchedRef.current = true;

    const accessKey = import.meta.env.VITE_UNSPLASH_KEY;
    fetch(
      `https://api.unsplash.com/photos/random?collections=${COLLECTION_IDS}&count=30&client_id=${accessKey}`
    )
      .then(res => {
        if (!res.ok) {
          throw new Error(`Unsplash API error: ${res.status}`);
        }
        return res.json();
      })
      .then((data: UnsplashRawPhoto[]) => {
        if (!Array.isArray(data)) throw new Error('Invalid response');
        setPhotos(data);
        setCurrent(pickPhoto(data));
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setError(true);
      });
  }, [initial.error, pickPhoto]);

  const nextPhoto = useCallback(() => {
    if (photos.length === 0) return;
    setCurrent(pickPhoto(photos));
  }, [photos, pickPhoto]);

  return { current, isLoading, error, nextPhoto, fetchPhotos };
}
