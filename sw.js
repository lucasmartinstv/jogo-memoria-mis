const CACHE_NAME = 'mis-memoria-v3';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './imagens/capa.jpg',
  './imagens/logo_app.png',
  './imagens/logo_ini.jpg'
];

// Adiciona automaticamente as imagens do jogo (2.jpg até 40.jpg)
for (let i = 2; i <= 40; i++) {
  ASSETS.push(`./imagens/${i}.jpg`);
}

// Instalação do Cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Cacheando arquivos do MIS...');
      return cache.addAll(ASSETS);
    })
  );
});

// Limpeza de cache antigo ao atualizar versão
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

// Estratégia: Cache First (Prioriza offline para o totem)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
