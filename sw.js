/**
 * KhelGaon - Service Worker
 * File: sw.js
 *
 * Purpose:
 * Caches all pages, styles, scripts, and the opportunities JSON file
 * so students in low-connectivity rural areas can browse offline after
 * visiting the site once.
 */

const CACHE_NAME = "khelgaon-cache-v2";

// List of all essential local static files (relative paths for GitHub Pages/Netlify)
const ASSETS_TO_CACHE = [
  "./",
  "index.html",
  "opportunities.html",
  "detail.html",
  "eligibility.html",
  "resources.html",
  "submit.html",
  "about.html",
  "manifest.json",
  "css/style.css",
  "js/identity.js",
  "js/theme.js",
  "js/i18n.js",
  "js/data.js",
  "js/saved.js",
  "js/filters.js",
  "js/main.js",
  "data/opportunities.json"
];

// Install Event: Save all static files into the browser cache
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => {
      return self.skipWaiting();
    })
  );
});

// Activate Event: Remove older cache versions when updated
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// Fetch Event: Cache-First with background refresh + query-string support
self.addEventListener("fetch", (event) => {
  // Only handle same-origin GET requests
  if (event.request.method !== "GET") return;
  const requestUrl = new URL(event.request.url);
  if (requestUrl.origin !== self.location.origin) return;

  event.respondWith(
    // ignoreSearch: true ensures opportunities.html?sport=... and detail.html?id=... match offline!
    caches.match(event.request, { ignoreSearch: true }).then((cachedResponse) => {
      if (cachedResponse) {
        // Refresh the cache in the background when online
        fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.ok) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request.url.split("?")[0], networkResponse);
            });
          }
        }).catch(() => {
          // Offline mode: cachedResponse is already returned cleanly
        });
        return cachedResponse;
      }

      // If not cached yet, fetch from network and store valid responses
      return fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.ok) {
          const responseCopy = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseCopy);
          });
        }
        return networkResponse;
      }).catch(() => {
        // Fallback for offline HTML page navigation
        const acceptHeader = event.request.headers.get("accept") || "";
        if (acceptHeader.includes("text/html")) {
          return caches.match("opportunities.html") || caches.match("index.html");
        }
      });
    })
  );
});
