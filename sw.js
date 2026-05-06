const CACHE_NAME = "celula-v6-cache"; // << versão nova força limpeza do cache antigo
const assets = ["index.html", "manifest.json"];

self.addEventListener("install", installEvent => {
  self.skipWaiting(); // ativa imediatamente, sem esperar fechar a aba
  installEvent.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener("activate", event => {
  // apaga todos os caches antigos
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});
