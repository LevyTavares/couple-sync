// client/src/lib/useFavorites.js
// Hook simples para favoritos persistidos no localStorage
import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "favorites:v1";

export function useFavorites() {
  const [favSet, setFavSet] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return new Set();
      const arr = JSON.parse(raw);
      return new Set(Array.isArray(arr) ? arr : []);
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...favSet]));
    } catch {
      // ignore
    }
  }, [favSet]);

  const isFavorite = useMemo(() => (id) => favSet.has(String(id)), [favSet]);

  const toggleFavorite = (id) => {
    const key = String(id);
    setFavSet((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return { favorites: favSet, isFavorite, toggleFavorite };
}
