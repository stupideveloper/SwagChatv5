importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js');

workbox.routing.setDefaultHandler(
  new workbox.strategies.NetworkOnly()
);

workbox.routing.registerRoute(
  ({request}) => request.destination === 'image',
  new workbox.strategies.NetworkOnly()
);

workbox.recipes.offlineFallback({
  pageFallback: '/offline.html'
});