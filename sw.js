const CACHE_NAME = 'mis-memoria-v10'; // Mudança de versão para forçar limpeza

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map((key) => caches.delete(key)));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Estratégia: Tenta rede, se falhar tenta cache
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
