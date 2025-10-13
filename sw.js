
const CACHE='pasiflora-v2';
const ASSETS=[
  './index.html','./viewer3d.html','./viewerar.html','./stats.html',
  './assets/css/style.css','./assets/js/main.js','./assets/js/i18n.js',
  './assets/i18n/es.json','./assets/i18n/en.json',
  './assets/img/poster.jpg','./assets/img/icon-192.png','./assets/img/icon-512.png',
  './assets/models/passiflora_caerulea.glb'
];
self.addEventListener('install', e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));
});
self.addEventListener('activate', e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));
});
self.addEventListener('fetch', e=>{
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});
