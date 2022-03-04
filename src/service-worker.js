importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.1.0/workbox-sw.js");
var cacheStorageKey = 'demo1'

var cacheList = [
  '/',
  "index.html",
  "manifest.json",
  "./asserts/banner-img-bk.db816044.jpeg",
  "./asserts/element-icons.9c88a535.woff",
  "./asserts/element-icons.de5eb258.ttf",
  "./asserts/index.012f6081.js",
  "./asserts/index.ba770acc.css",
  "./asserts/main-logo.b22c29b2.png",
  "./asserts/vendor.c51d993a.js"
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
      Promise.all(
        caches.keys().then(cacheNames => {
          return cacheNames.map(name => {
            if (name !== cacheStorageKey) {
              return caches.delete(name)
            }
          })
        })
      ).then(() => {
        return self.clients.claim()
      })
    )
  })


  self.addEventListener('fetch', function(e) {
    e.respondWith(
      caches.match(e.request).then(function(response) {
        if (response != null) {
          return response
        }
        return fetch(e.request.url)
      })
    )
  })