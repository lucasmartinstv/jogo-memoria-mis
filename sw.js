const CACHE_NAME = 'mis-memoria-v5';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './imagens/capa.jpg',
  './imagens/logo_app.png',
  './imagens/logo_ini.jpg'
];

// Adiciona as imagens das cartas (2 a 40)
for (let i = 2; i <= 40; i++) {
  ASSETS.push(`./imagens/${i}.jpg`);
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('MIS: Cacheando recursos para TV 75...');
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
