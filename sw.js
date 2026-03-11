const CACHE_NAME = 'mis-memoria-v1';

// Lista de arquivos para cache (ajustado para logo_app.png)
const assets = [
  './',
  './index.html',
  './manifest.json',
  './imagens/logo_app.png',
  './imagens/capa.jpg'
];

// Adiciona as imagens numeradas (2 a 40) ao cache automaticamente
for (let i = 2; i <= 40; i++) {
  assets.push(`./imagens/${i}.jpg`);
}

// 1. Instalação: Salva todos os arquivos no cache do navegador
self.addEventListener('install', event => {
  self.skipWaiting(); // Força o novo SW a assumir o controle imediatamente
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('SW: Cache aberto e arquivos sendo armazenados');
      return cache.addAll(assets);
    })
  );
});

// 2. Ativação: Limpa caches antigos se você atualizar o nome da versão
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('SW: Removendo cache antigo:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim()) // Garante que o SW controle as abas abertas
  );
});

// 3. Estratégia de Fetch: Tenta carregar do cache primeiro, se não houver, busca na rede
// Isso é o que permite o jogo funcionar sem internet no museu
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request).catch(() => {
        // Fallback: se não houver rede nem cache (ex: imagens novas não cacheadas)
        console.log('SW: Recurso não encontrado no cache nem na rede');
      });
    })
  );
});
