// make sure sw(service workers) are supported

if ('serviceWorker' in navigator) {
   window.addEventListener('load', () => {
      navigator.serviceWorker
         .register('../sw_cached_pages.js')
         .then(registration => console.log(`Service Worker: Registered: ${registration.scope} `))
         .catch(err => console.log(`Service Worker: Error: ${err}`))
         });
   
}