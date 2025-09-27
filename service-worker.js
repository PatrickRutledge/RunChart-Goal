const CACHE_NAME = 'runchart-v1';
const urlsToCache = [
  '/RunChart-Goal/',
  '/RunChart-Goal/index.html',
  '/RunChart-Goal/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});