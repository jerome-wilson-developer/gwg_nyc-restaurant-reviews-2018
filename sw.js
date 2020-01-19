
/* Declare a variable that will hold the website's assets and html files that have been cacheds. 
The variable will then store the cached files in the Console >> Application >> 
Cache >> Cache Storage location.*/
const cacheName = "v1";


/* Declare a variable that uses an array container to hold the website's assets 
and files that we want to cache and put into 'Cache Storage'.*/
const cacheAssets = ['sw.js', 'index.html', 'restaurant.html', '/data/restaurants.json', 
'/css/styles.css', '/css/styles-mobile.css', '/css/styles-tablet.css', '/js/main.js',
'/js/dbhelper.js', '/js/mapboxKey.js', '/js/restaurant_info.js', '/img/1.jpg', '/img/2.jpg', '/img/3.jpg', '/img/4.jpg', '/img/5.jpg', '/img/6.jpg', '/img/7.jpg', '/img/8.jpg', 'README.md', 'CODEOWNERS'];


//Setup the serviceWorker's 'install' event with an eventListener attached to it.
self.addEventListener('install', e =>{
    console.log('3.service worker: installed');

        /* Here, we will use the 'install event' to add the
        assets and files into the 'Cache Storage'.*/

        /* Here, we use the e. parameter to call the '.waitUntil() method', 
        so that the browser waits until our promised is fulfilled 
        before it removes the serviceWorker.*/
        e.waitUntil(

            /* Here, we use the "caches.open().then" method to call and open the 
            'Cache Storage' API. '.then()' returns a promise for a callback. 'cache.addAll()' passes in the 'cacheAssets' variable to begin pulling and passing the files from the array,[cacheAssets] into the variable,(cacheName).*/
            caches.open(cacheName).then(cache =>{
                    console.log('5.Service Worker: Caching files');
                    cache.addAll(cacheAssets);
                })
                .then(() => self.skipWaiting())
        );
});

//Setup the serviceWorker's 'activate' event with an eventListener attached to it.
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


//Setup the serviceWorker's 'fetch' event with an eventListener attached to it.
/* Whenever our users go 'offline' while using our website, the 'fetch event' is 
used to call and render our cached files to give users access to our cached pages.*/
self.addEventListener('fetch', e => {
    console.log('6.service worker: FETCHING');
    
    /* Here, we check if our user is still online, before 'Fetching' our offline cached files.*/ 
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});