import { createClient } from "@supabase/supabase-js";

let client: ReturnType<typeof createClient> | null = null;

export function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) return null;
  if (!client) client = createClient(url, anonKey);
  return client;
}

export function collectCertiflowStorage() {
  const data: Record<string, string> = {};
  if (typeof window === "undefined") return data;

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith("certiflow-")) data[key] = localStorage.getItem(key) ?? "";
  }

  return data;
}

export function restoreCertiflowStorage(data: Record<string, string>) {
  if (typeof window === "undefined") return;

  for (const [key, value] of Object.entries(data)) {
    if (key.startsWith("certiflow-")) localStorage.setItem(key, value);
  }
}
