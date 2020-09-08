const CACHE_NAME = "firstpwa-v2"
let urlsToCache = [
    "/",
    "/nav.html",
    "/index.html",
    "/article.html",
    "/manifest.json",
    "/pages/home.html",
    "/pages/about.html",
    "/pages/contact.html",
    "/css/materialize.min.css",
    "/js/materialize.min.js",
    "/js/nav.js",
    "/js/check-sw.js",
    "/js/api.js"
]

self.addEventListener("fetch", function(event) {
    let base_url = "https://readerapi.codepolitan.com/"

    if (event.request.url.indexOf(base_url) > -1) {
        event.respondWith(
            caches.open(CACHE_NAME).then(function(cache) {
                return fetch(event.request).then(function(response) {
                    cache.put(event.request.url, response.clone())
                    return response
                })
            })
        )
    } else {
        event.respondWith(
            caches.match(event.request, { ignoreSearch: true }).then(function(response) {
                return response || fetch(event.request)
            })
        )
    }

    // old request

    // event.respondWith(
    //     caches
    //     .match(event.request, { cacheName: CACHE_NAME })
    //     .then(function(response) {
    //         if (response) {
    //             console.log("ServiceWorker: Gunakan asset dari cache: ", response.url)
    //             return response
    //         }

    //         console.log("ServiceWorker: memuat asset dari server: ", event.request.url)
    //         return fetch(event.request)
    //     })
    // )
})

self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToCache)
        })
    )
})

self.addEventListener("activate", function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus")
                        return caches.delete(cacheName)
                    }
                })
            )
        })
    )
})