self.addEventListener('fetch', function(event) {
    event.respondWith(
        // cache first
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request)
        })
    )
})