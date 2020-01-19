const cacheName = "v2";

//declare a variable that stores the website's cached html files and assets. 
//The variable stores them in the 'Console >> Application >> 
// Cache >> Cache Storage' location.

//declare a variable as an array container/box that holds all cached assets and files.
//DO NOT NEED THE VARIABLE: CACHEASSETS

//call install event
self.addEventListener('install', e =>{
    console.log('3.service worker: installed');
});

//call activate event
self.addEventListener('activate', e =>{
    console.log('4.service worker: activated');

    //Remove unwanted caches
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        console.log('service worker: clearing old cache');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});


//call fetch event
self.addEventListener('fetch', e => {
    console.log('6.service worker: FETCHING');
    e.respondWith(
        fetch(e.request)
            .then(res => {
                //make copy/clone of response
                const resClone = res.clone();
                //open cache
                caches
                    .open(cacheName)
                    .then(cache => {
                        //add response to cache
                        cache.put(e.request, resClone);
            });
            return res;
        })
        .catch(err => caches.match(e.request).then(res => res))
    );
});