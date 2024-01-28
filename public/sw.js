// let cacheData="appV1";
// this.addEventListener("install", (event)=>{
//     event.waitUntil(
//         caches.open(cacheData).then((cache)=>{
//             cache.addAll([
//                 '/static/js/main.chunk.js',
//                 '/static/js/0.chunk.js',
//                 '/static/js/bundle.js',
//                 '/index.html',
//                 '/'
//             ])
//         })
//     )
// })

// this.addEventListener("fetch", (event)=>{
//     event.respondWith(
//         caches.match(event.request).then((resp)=>{
//             if(resp){
//                 return resp
//             }
//         })
//     )
// })

const cacheData = "appV1";

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(cacheData).then((cache) => {
            return cache.addAll([
                '/static/js/main.chunk.js',
                '/static/js/0.chunk.js',
                '/static/js/bundle.js',
                '/index.html',
                '/',
                '/static/css/main.css',
                '/static/media/logo.png',
            ]).catch(error => {
                console.error('Failed to cache:', error);
            });
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((resp) => {
            return resp || fetch(event.request).then((response) => {
                return caches.open(cacheData).then((cache) => {
                    cache.put(event.request, response.clone());
                    return response;
                });
            });
        })
    );
});
