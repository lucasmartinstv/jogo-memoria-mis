const CACHE_NAME = 'mis-cache-v1';
const assets = [
  './',
  './index.html',
  './manifest.json',
  './imagens/logo_app.jpg',
  './imagens/capa.jpg'
];

// Instalação: Salva arquivos essenciais
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(assets))
  );
});

// Ativação: Limpa caches antigos
self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});

// Interceptação: Faz o app funcionar offline (Critério obrigatório PWA)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});