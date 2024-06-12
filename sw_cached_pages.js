//Caching
const cacheName = 'v1' //switch btw 'v1' and 'V2' to see changes in the cache storage in chrome 

const cacheAssets = [
  'index.html',
  'about.html',
  '/css/style.css',
  '/js/main.js'
]; //this is suitable for this because its only has a few webpages



// Call Install Event //its in install events, that caching of assets will be done
self.addEventListener('install', e => {
  console.log('Service Worker: Installed');

  e.waitUntil(
    caches
      .open(cacheName)
      .then(cache => {
        console.log('Service Worker: Caching Files');
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
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
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
   
});