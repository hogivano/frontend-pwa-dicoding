self.addEventListener('fetch', function(event) {
    event.respondWith(fetch(event.request))
        // Atau dengan tidak memanggil event.respondWith() 
        // yang akan otomatis kembali ke sifat awal browser
})