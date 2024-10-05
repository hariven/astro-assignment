// public/service-worker.js

// Cache version to update when needed
const CACHE_NAME = 'api-cache-v1';
const API_CACHE_URLS = ['https://contenthub-api.eco.astro.com.my/channel/all.json']; // Your API endpoints to cache

// Install the Service Worker and cache API responses
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(API_CACHE_URLS);
    })
  );
  self.skipWaiting();
});

// Fetch event to intercept requests
self.addEventListener('fetch', event => {
  const { request } = event;

  // Handle API requests
  if (request.url.startsWith('https://api.example.com')) {
    event.respondWith(
      caches.match(request).then(cachedResponse => {
        // Return cached response if available, else fetch from network
        return (
          cachedResponse ||
          fetch(request).then(response => {
            return caches.open(CACHE_NAME).then(cache => {
              // Cache the newly fetched data
              cache.put(request, response.clone());
              return response;
            });
          })
        );
      })
    );
  }
});

// Activate event to clear old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME]; // Only keep the current cache version

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});
