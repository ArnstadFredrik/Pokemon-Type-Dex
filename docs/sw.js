const v = '0.0.3';
const cacheArray = [
  './assets/css/main.css',
  './sw.js',
  './assets/css/script.js',
  './index.html'

];
self.addEventListener('install', async event => {
  const cache = await caches.open(`typedex`);
  cache.addAll(cacheArray);
});

self.addEventListener('fetch', event => {
  const req = event.request;
  const url = new URL(req.url);

  if(url.origin == location.origin){
    event.respondWith(cacheFirst(req));
  } else {
    event.respondWith(networkFirst(req));
  }
});

async function cacheFirst(req) {
  const cachedRespons = await caches.match(req);
  return cachedRespons || fetch(req);
}

async function networkFirst(req) {
  const cache = await caches.open('font');

  try {
    const res = await fetch(req);
    caches.put(req, res.clone());
    return res;
  } catch (e) {
    return await caches.match(req);
  }
}
