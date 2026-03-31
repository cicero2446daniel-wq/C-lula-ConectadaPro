const CACHE_NAME = "celulapro-v6-atualizado"; // Mudei o nome aqui para forçar o celular
const assets = ["index.html", "manifest.json"];

self.addEventListener("install", installEvent => {
  self.skipWaiting(); // Força a nova versão a assumir o controle na hora
  installEvent.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache); // Deleta o lixo da versão anterior
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});
