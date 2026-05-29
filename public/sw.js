const CACHE_NAME = "certiflow-cache-v1";

// Cache core assets on install
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        "/",
        "/manifest.ts",
        "/certiflow-logo.png",
        "/favicon-32x32.png",
        "/apple-touch-icon.png",
      ]).catch(() => {
        // Ignore individual load failures during install to keep SW functional
      });
    })
  );
  self.skipWaiting();
});

// Clean up old caches on activate
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Cache-first / Stale-While-Revalidate caching strategy
self.addEventListener("fetch", (event) => {
  // Only cache GET requests from our own origin
  if (event.request.method !== "GET" || !event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Do not cache external APIs or Supabase connection requests
  if (
    event.request.url.includes("/supabase.co/") || 
    event.request.url.includes("/api/assistant") ||
    event.request.url.includes("/_next/webpack-hmr")
  ) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Return from cache immediately, then fetch updated resource in the background
        fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, networkResponse);
              });
            }
          })
          .catch(() => {
            // Background update failed (e.g. offline) - silently ignore
          });
        return cachedResponse;
      }

      // Fetch from network and add to cache
      return fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === "basic") {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        // Network failed (offline) and no cache - return nothing
      });
    })
  );
});
