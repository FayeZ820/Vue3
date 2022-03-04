importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.1.0/workbox-sw.js");
var cacheStorageKey = 'demo1'

var cacheList = [
  '/',
  "index.html",
  "manifest.json",
  "./assets/banner-img-bk.db816044.jpeg",
  "./assets/main-logo.b22c29b2.png",
  "./assets/element-icons.9c88a535.woff",
  "./assets/element-icons.de5eb258.ttf",
  "./assets/index.89e71f9c.js",
  "./assets/index.ba770acc.css"
]

self.addEventListener('install', e => {
    e.waitUntil(
      caches.open(cacheStorageKey)
      .then(cache => cache.addAll(cacheList))
      .then(() => self.skipWaiting())
    )
  })

  self.addEventListener('activate', function(e) {
    e.waitUntil(
      caches.keys().then(cacheNames => {
        Promise.all(
         cacheNames.map(name => {
            if (name !== cacheStorageKey) {
              return caches.delete(name)
            }
          })
        ).then(() => {
          return self.clients.claim()
        });
      })
    );
  })


  self.addEventListener('fetch', function(e) {
    e.respondWith(
      caches.match(e.request).then(function(response) {
        if (response != null) {
          return response.clone();
        }
        return fetch(e.request.url)
      })
    )
  })