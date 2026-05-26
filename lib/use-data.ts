"use client";

import { useState, useEffect, useRef } from "react";

const cache = new Map<string, any>();
const pending = new Map<string, Promise<any>>();

export function useData<T = any>(filename: string): { data: T | null; loading: boolean; error: string | null } {
  const [data, setData] = useState<T | null>(() => cache.get(filename) ?? null);
  const [loading, setLoading] = useState(!cache.has(filename));
  const [error, setError] = useState<string | null>(null);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);

  useEffect(() => {
    if (cache.has(filename)) {
      setData(cache.get(filename));
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function load() {
      try {
        if (!pending.has(filename)) {
          const url = "/data/" + filename + ".json";
          pending.set(filename, fetch(url).then(function(r) {
            if (!r.ok) throw new Error("HTTP " + r.status);
            return r.json();
          }));
        }
        const result = await pending.get(filename);
        pending.delete(filename);
        cache.set(filename, result);
        if (!cancelled && mounted.current) {
          setData(result);
          setLoading(false);
        }
      } catch (err) {
        pending.delete(filename);
        if (!cancelled && mounted.current) {
          setError(err instanceof Error ? err.message : "Erreur de chargement");
          setLoading(false);
        }
      }
    }

    load();
    return function() { cancelled = true; };
  }, [filename]);

  return { data, loading, error };
}