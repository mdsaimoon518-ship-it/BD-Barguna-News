const CACHE_NAME='bd-barguna-news-shell-v1';
const APP_ROOT='/BD-Barguna-News/';
const SHELL=[APP_ROOT,APP_ROOT+'manifest.webmanifest',APP_ROOT+'images/app-icon.svg'];
self.addEventListener('install',event=>{
 event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(SHELL)).catch(()=>{}));
 self.skipWaiting();
});
self.addEventListener('activate',event=>{
 event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('bd-barguna-news-')&&key!==CACHE_NAME).map(key=>caches.delete(key)))));
 self.clients.claim();
});
self.addEventListener('fetch',event=>{
 const request=event.request;
 if(request.method!=='GET')return;
 const url=new URL(request.url);
 if(url.origin!==self.location.origin)return;
 if(!url.pathname.startsWith(APP_ROOT))return;
 event.respondWith((async()=>{
  const cache=await caches.open(CACHE_NAME);
  try{
   const response=await fetch(request);
   if(response&&response.ok)cache.put(request,response.clone()).catch(()=>{});
   return response;
  }catch(error){
   const cached=await cache.match(request,{ignoreSearch:true});
   if(cached)return cached;
   if(request.mode==='navigate'){
    const home=await cache.match(APP_ROOT);
    if(home)return home;
   }
   return new Response('ইন্টারনেট সংযোগ নেই। পরে আবার চেষ্টা করুন।',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}});
  }
 })());
});
