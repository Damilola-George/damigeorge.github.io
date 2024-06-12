// To cache the whole site

const cacheName = 'v2' 




// Call Install Event //its in install events, that caching of assets will be done
self.addEventListener('install', e => {
  console.log('Service Worker: Installed');

});

//Call Activate Eventt
self.addEventListener('activate', e => {
  console.log('Service Worker: Activated');

  //Remove unwnated caches
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            console.log('Service Worker: Clearing Old Cache');
            return caches.delete(cache);
        }
        })
      )
    })
 );
});

//fetch Events  (to show our cached files when we are offline)
//this is the main code for showing when we are offline
self.addEventListener('fetch', e => {
  console.log('Service Worker: Fetching');
  e.respondWith(
    fetch(e.request)
      .then(res => {
        // Make copy/clone of response
        const resClone = res.clone();
        // Open cache
        caches
          .open(cacheName)
          .then(cache => {
            // Add response to cache
            cache.put(e.request, resClone);
          });
        return res;
      })
      .catch(err => caches.match(e.request).then(res => res))
  );
   
});