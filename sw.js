const CACHE_NAME='bd-barguna-news-shell-v2';
const APP_ROOT='/BD-Barguna-News/';
const SHELL=[APP_ROOT,APP_ROOT+'manifest.webmanifest',APP_ROOT+'images/app-icon.svg'];
const STATIC_FILE=/\.(?:css|js|mjs|svg|png|jpe?g|webp|gif|ico|woff2?|ttf)$/i;
function cacheKey(url){return new Request(url.origin+url.pathname,{method:'GET'});}
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
 if(url.origin!==self.location.origin||!url.pathname.startsWith(APP_ROOT))return;
 const key=cacheKey(url);
 event.respondWith((async()=>{
  const cache=await caches.open(CACHE_NAME);
  if(STATIC_FILE.test(url.pathname)||request.destination==='image'||request.destination==='font'){
   const cached=await cache.match(key);
   if(cached)return cached;
   try{
    const response=await fetch(request);
    if(response&&response.ok)await cache.put(key,response.clone());
    return response;
   }catch(error){return new Response('এই ফাইলটি অফলাইনে পাওয়া যাচ্ছে না।',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}});}
  }
  try{
   const response=await fetch(request);
   if(response&&response.ok)cache.put(key,response.clone()).catch(()=>{});
   return response;
  }catch(error){
   const cached=await cache.match(key);
   if(cached)return cached;
   if(request.mode==='navigate'){
    const home=await cache.match(APP_ROOT);
    if(home)return home;
   }
   return new Response('ইন্টারনেট সংযোগ নেই। পরে আবার চেষ্টা করুন।',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}});
  }
 })());
});
self.addEventListener('notificationclick',event=>{
 event.notification.close();
 const target=event.notification.data&&event.notification.data.url?event.notification.data.url:APP_ROOT;
 const url=new URL(target,self.location.origin+APP_ROOT);
 if(url.origin!==self.location.origin||!url.pathname.startsWith(APP_ROOT))return;
 event.waitUntil((async()=>{
  const windows=await self.clients.matchAll({type:'window',includeUncontrolled:true});
  for(const client of windows){
   if('focus'in client){await client.navigate(url.href);return client.focus();}
  }
  if(self.clients.openWindow)return self.clients.openWindow(url.href);
 })());
});
