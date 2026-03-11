const CACHE_NAME = 'mis-memoria-v3';
const assets = [
  './',
  './index.html',
  './manifest.json',
  './imagens/logo_app.png',
  './imagens/logo_ini.jpg',
  './imagens/capa.jpg'
];

for (let i = 2; i <= 40; i++) {
  assets.push(`./imagens/${i}.jpg`);
}

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(assets)));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))));
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});const CACHE_NAME = 'mis-memoria-v2';

// Lista de ficheiros principais
const assets = [
  './',
  './index.html',
  './manifest.json',
  './imagens/logo_app.png',
  './imagens/logo_ini.jpg',
  './imagens/capa.jpg'
];

// Adiciona as imagens das cartas (2 a 40)
for (let i = 2; i <= 40; i++) {
  assets.push(`./imagens/${i}.jpg`);
}

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

