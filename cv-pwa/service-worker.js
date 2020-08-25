const CACHE_NAME = "cvpwa-v1"
let urlsToCache = [
    "/",
    "/manifest.json",
    "/nav.html",
    "/index.html",
    "/pages/achievement.html",
    "/pages/experience.html",
    "/pages/home.html",
    "/pages/portfolio.html",

    // image
    "/image/experience/eventsurabaya.jpeg",
    "/image/experience/Jatimnet.png",
    "/image/experience/logo-unair.png",
    "/image/experience/SMAN_7_Surabaya.jpg",
    "/image/portfolio/els jamkrindo.PNG",
    "/image/portfolio/gitapramawisesa.PNG",
    "/image/portfolio/med buddies.PNG",
    "/image/sosmed/github.svg",
    "/image/sosmed/gmail.png",
    "/image/sosmed/instagram.svg",
    "/image/sosmed/linkedin.svg",
    "/image/sosmed/whatsapp.svg",
    "/image/profile.jpg",

    // icon
    "/favicon.ico",
    "/image/icon/logo-72x72.png",
    "/image/icon/logo-96x96.png",
    "/image/icon/logo-128x128.png",
    "/image/icon/logo-144x144.png",
    "/image/icon/logo-192x192.png",
    "/image/icon/logo-256x256.png",
    "/image/icon/logo-384x384.png",
    "/image/icon/logo-512x512.png",

    // css
    "/css/responsive.css",
    "/css/style.css",
    "/css/materialize.min.css",

    // js
    "/js/materialize.min.js",
    "/js/nav.js"
]

self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches
        .match(event.request, { cacheName: CACHE_NAME })
        .then(function(response) {
            if (response) {
                console.log("ServiceWorker: Gunakan asset dari cache: ", response.url)
                return response
            }

            console.log("ServiceWorker: memuat asset dari server: ", event.request.url)
            return fetch(event.request)
        })
    )
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