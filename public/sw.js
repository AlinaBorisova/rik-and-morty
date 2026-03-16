const staticCache = 'rick-and-morty-static-v1';
const dynamicCache = 'rick-and-morty-dynamic-v1';

const ASSETS = [
  '/',
  '/index.html',
  '/offline.html',
  '/manifest.json',
  '/vite.svg',
  '/assets/images/icons/icon-192x192.png',
  '/assets/images/icons/icon-512x512.png',
  '/assets/images/icons/180.png',
  '/assets/images/home-img.jpg',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(staticCache).then(cache => {
      console.log('Кеширование статики');
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== staticCache && key !== dynamicCache)
        .map(key => caches.delete(key))
      );
    })
  );
});

self.addEventListener('fetch', event => {
  if (!event.request.url.startsWith('http')) return;

  event.respondWith(cacheFirst(event.request));
});

async function cacheFirst(request) {
  const cached = await caches.match(request);

  return cached || await networkFirst(request);
}

async function networkFirst(request) {
  const cache = await caches.open(dynamicCache);

  try {
    const response = await fetch(request);

    await cache.put(request, response.clone());
    return response;
  } catch (error) {
    const cached = await cache.match(request);
    const fallback = request.mode === 'navigate' ? '/index.html' : '/offline.html';
    
    return cached || await caches.match(fallback);
  }
}