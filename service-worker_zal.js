const CACHE_NAME = "DX_zaznamnik-v2.0";

const FILES_TO_CACHE = [
  "./index.html",
  "./nove_spojeni.html",
  "./mista_seznam.html",
  "./nove_misto.html",
  "./seznam_spojeni.html",
  "./seznam.js",
  "./lok_mapa.html",
  "./qth.html",
  "./style.css",
  "./app.js",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
];

// Instalace SW + cache souborů
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Aktivace SW + smazání starých cache
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch – obsluha požadavků
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

