(function(){
'use strict';
const FONT='"Noto Sans Bengali","Hind Siliguri",Arial,sans-serif';
const W=1200,H=1600;
function load(src){
 return new Promise(resolve=>{
  if(!src)return resolve(null);
  const im=new Image();
  try{
   const u=new URL(src,document.baseURI);
   if(u.origin!==location.origin)im.crossOrigin='anonymous';
   im.onload=()=>resolve(im);im.onerror=()=>resolve(null);im.src=u.href;
  }catch(e){resolve(null);}
 });
}
function wrap(ctx,text,maxWidth){
 const out=[];let line='';
 for(const word of String(text||'').trim().split(/\s+/).filter(Boolean)){
  let candidate=line?line+' '+word:word;
  if(ctx.measureText(candidate).width<=maxWidth){line=candidate;continue;}
  if(line)out.push(line);line='';
  for(const ch of Array.from(word)){
   if(ctx.measureText(line+ch).width>maxWidth&&line){out.push(line);line=ch;}else line+=ch;
  }
 }
 if(line)out.push(line);return out;
}
function cover(ctx,img,x,y,w,h){
 const iw=img.naturalWidth||img.width,ih=img.naturalHeight||img.height;
 // পুরো ছবি দেখান: crop নয়, অনুপাত ঠিক রেখে contain
 ctx.save();ctx.fillStyle='#071d49';ctx.fillRect(x,y,w,h);
 const scale=Math.min(w/iw,h/ih),dw=iw*scale,dh=ih*scale;
 ctx.drawImage(img,x+(w-dw)/2,y+(h-dh)/2,dw,dh);ctx.restore();
}
function fitLines(ctx,text,maxWidth,maxLines,startSize,minSize){
 let size=startSize,lines=[];
 while(size>=minSize){ctx.font='bold '+size+'px '+FONT;lines=wrap(ctx,text,maxWidth);if(lines.length<=maxLines)break;size-=2;}
 return{size,lines};
}
function rounded(ctx,x,y,w,h,r){
 ctx.beginPath();
 if(typeof ctx.roundRect==='function')ctx.roundRect(x,y,w,h,r);
 else{ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);}
 ctx.closePath();ctx.fill();
}
function dots(ctx,y,h){
 ctx.save();ctx.fillStyle='rgba(66,160,255,.23)';
 for(let row=0;row<7;row++)for(let col=0;col<45;col++){
  const xx=col*29+((row%2)*9),yy=y+row*22+8;
  ctx.beginPath();ctx.arc(xx,yy,3.5,0,Math.PI*2);ctx.fill();
 }
 ctx.restore();
}
async function create(data){
 if(document.fonts&&document.fonts.ready)try{await document.fonts.ready;}catch(e){}
 const title=String(data.title||'সর্বশেষ সংবাদ').replace(/\s+/g,' ').trim();
 const category=String(data.category||'সর্বশেষ সংবাদ').trim();
 const date=String(data.date||new Intl.DateTimeFormat('bn-BD',{day:'numeric',month:'long',year:'numeric',timeZone:'Asia/Dhaka'}).format(new Date())).replace(/^📅\s*প্রকাশিত:\s*/,'').trim();
 const logo=await load(data.logo||'images/bd-barguna-logo.webp');
 const raw=Array.isArray(data.images)?data.images.filter(Boolean).slice(0,2):[];
 if(!raw.length&&data.image)raw.push({url:data.image});
 const loaded=await Promise.all(raw.map(item=>load(typeof item==='string'?item:item.url)));
 const photos=loaded.filter(Boolean);
 const c=document.createElement('canvas');c.width=W;c.height=H;
 const x=c.getContext('2d');if(!x)throw new Error('আপনার ব্রাউজারে ফটোকার্ড তৈরি সমর্থিত নয়।');
 // Broadcast blue masthead
 const head=x.createLinearGradient(0,0,W,0);head.addColorStop(0,'#002b83');head.addColorStop(.55,'#0649bd');head.addColorStop(1,'#001b63');
 x.fillStyle=head;x.fillRect(0,0,W,190);dots(x,5,175);
 if(logo){x.save();x.fillStyle='#fff';x.beginPath();x.arc(96,95,73,0,Math.PI*2);x.fill();x.lineWidth=7;x.strokeStyle='#ed1735';x.stroke();const sc=Math.min(126/(logo.naturalWidth||logo.width),126/(logo.naturalHeight||logo.height));x.drawImage(logo,96-(logo.naturalWidth||logo.width)*sc/2,95-(logo.naturalHeight||logo.height)*sc/2,(logo.naturalWidth||logo.width)*sc,(logo.naturalHeight||logo.height)*sc);x.restore();}
 x.fillStyle='#df102b';x.beginPath();x.moveTo(850,28);x.lineTo(1172,28);x.lineTo(1172,146);x.lineTo(790,146);x.closePath();x.fill();
 x.fillStyle='#fff';x.textAlign='center';x.font='bold 44px '+FONT;x.fillText('সর্বশেষ সংবাদ',985,102);
 // Main photo panel
 const photoY=190,photoH=700;
 if(photos.length>=2){const split=8,pw=(W-split)/2;cover(x,photos[0],0,photoY,pw,photoH);x.fillStyle='#fff';x.fillRect(pw,photoY,split,photoH);cover(x,photos[1],pw+split,photoY,pw,photoH);}
 else if(photos.length===1)cover(x,photos[0],0,photoY,W,photoH);
 else{const pg=x.createLinearGradient(0,photoY,W,photoY+photoH);pg.addColorStop(0,'#174eac');pg.addColorStop(1,'#061947');x.fillStyle=pg;x.fillRect(0,photoY,W,photoH);x.fillStyle='#fff';x.font='bold 64px Arial';x.textAlign='center';x.fillText('BD BARGUNA NEWS',W/2,photoY+photoH/2);}
 const shade=x.createLinearGradient(0,photoY,0,photoY+photoH);shade.addColorStop(0,'rgba(0,0,0,.06)');shade.addColorStop(1,'rgba(0,0,0,.18)');x.fillStyle=shade;x.fillRect(0,photoY,W,photoH);
 // Date ribbon
 const dateY=890,dateH=94;const dg=x.createLinearGradient(0,dateY,W,dateY);dg.addColorStop(0,'#e91532');dg.addColorStop(.55,'#b20b2c');dg.addColorStop(1,'#0749b5');x.fillStyle=dg;x.fillRect(0,dateY,W,dateH);
 x.fillStyle='#fff';x.textAlign='center';x.font='bold 42px '+FONT;x.fillText(date,W/2,dateY+61);
 // Category tab and headline white panel
 const panelY=984,panelH=430;x.fillStyle='#f7f8fb';x.fillRect(0,panelY,W,panelH);
 x.fillStyle='#d80e2d';x.beginPath();x.moveTo(28,panelY);x.lineTo(365,panelY);x.lineTo(405,panelY+74);x.lineTo(28,panelY+74);x.closePath();x.fill();
 x.fillStyle='#fff';x.textAlign='left';x.font='bold 39px '+FONT;x.fillText(category.slice(0,16),82,panelY+51);
 const layout=fitLines(x,title,1080,9,40,20),lineH=Math.round(layout.size*1.24);x.font='bold '+layout.size+'px '+FONT;x.textAlign='center';x.textBaseline='middle';
 const total=layout.lines.length*lineH;let yy=panelY+100+(panelH-115-total)/2+lineH/2;
 layout.lines.forEach(line=>{x.fillStyle='#080b12';x.fillText(line,W/2,yy);yy+=lineH;});
 // Navy world-news footer
 const fy=1414,fh=186;const fg=x.createLinearGradient(0,fy,W,fy+fh);fg.addColorStop(0,'#00164d');fg.addColorStop(.5,'#063c9c');fg.addColorStop(1,'#00164d');x.fillStyle=fg;x.fillRect(0,fy,W,fh);dots(x,fy+8,fh-10);
 x.fillStyle='#e31331';x.fillRect(0,fy,W,8);x.fillStyle='#1b9aff';x.fillRect(0,fy+8,W,4);
 x.textBaseline='alphabetic';x.textAlign='left';x.fillStyle='#fff';x.font='bold 32px Arial';x.fillText('BD BARGUNA NEWS',40,fy+76);
 x.fillStyle='#dceaff';x.font='27px '+FONT;x.fillText('সত্যের সন্ধানে, মানুষের পাশে।',40,fy+126);
 x.textAlign='right';x.fillStyle='#ffeb24';x.font='bold 27px '+FONT;x.fillText('বিস্তারিত পড়ুন ওয়েবসাইটে',1160,fy+76);
 x.fillStyle='#fff';x.font='23px Arial';x.fillText('mdsaimoon518-ship-it.github.io/BD-Barguna-News',1160,fy+126);
 return c;
}
window.downloadNewsPhotoCard=async function(){
 try{
  if(typeof window.buildNewsPhotoCard!=="function")throw new Error("এই নিউজের ফটোকার্ড সেটআপ পাওয়া যায়নি।");
  const canvas=await window.buildNewsPhotoCard();
  if(!canvas||typeof canvas.toBlob!=="function")throw new Error("ফটোকার্ড তৈরি হয়নি।");
  const blob=await new Promise(function(resolve,reject){
   try{canvas.toBlob(function(value){value?resolve(value):reject(new Error("ছবির ফাইল তৈরি করা যায়নি।"));},"image/png");}
   catch(error){reject(error);}
  });
  const url=URL.createObjectURL(blob),a=document.createElement("a");
  a.href=url;a.download="BD-Barguna-News-PhotoCard.png";a.style.position="fixed";a.style.left="-9999px";
  document.body.appendChild(a);a.click();a.remove();
  setTimeout(function(){URL.revokeObjectURL(url);},60000);
 }catch(error){
  alert("ফটোকার্ড ডাউনলোড করা যায়নি: "+(error&&error.message?error.message:error));
 }
};
document.addEventListener("click",function(event){
 var button=event.target&&event.target.closest?event.target.closest("button[onclick*=downloadNewsPhotoCard]"):null;
 if(!button)return;
 event.preventDefault();event.stopPropagation();if(event.stopImmediatePropagation)event.stopImmediatePropagation();
 var tab=null;try{tab=window.open("about:blank","_blank");}catch(e){}
 (async function(){
  try{
   var found=Array.from(document.querySelectorAll(".photo-gallery img,.photo-card img,.article-image,figure img,#newsImage"))
    .filter(function(el){return !el.closest(".photo-card-preview");})
    .map(function(el){return el.currentSrc||el.src;})
    .filter(function(url,index,all){return !!url&&all.indexOf(url)===index;})
    .slice(0,2);
   if(!found.length)throw new Error("এই সংবাদে ছবি পাওয়া যায়নি। ছবির URL পরীক্ষা করুন।");
   var rawDate=document.querySelector(".date:not(#articleViewCount)");
   var dateText=rawDate?rawDate.textContent.replace(/^📅\\s*প্রকাশিত:\\s*/,"").trim():"";
   var canvas=await create({
    title:(document.querySelector("h1")||{}).textContent||document.title,
    category:(document.querySelector(".category")||{}).textContent||"সর্বশেষ সংবাদ",
    date:dateText,
    images:found.map(function(url){return {url:url};}),
    logo:new URL("../images/bd-barguna-logo.webp?v=20261118",location.href).href
   });
   if(!canvas)throw new Error("ছবিসহ ফটোকার্ড তৈরি করা যায়নি।");
   var image=canvas.toDataURL("image/png");
   if(tab&&!tab.closed){
    tab.document.open();
    tab.document.write('<!doctype html><html lang="bn"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>ফটোকার্ড সংরক্ষণ</title><body style="margin:0;padding:12px;text-align:center;font-family:Arial;background:#f2f4f7"><h3>BD Barguna News</h3><p>ছবির ওপর চেপে ধরে Save image করুন।</p><img id="photo" style="width:100%;height:auto" alt="ফটোকার্ড"><p><a id="save" style="display:inline-block;padding:14px;background:#087b42;color:white;text-decoration:none">ছবি ডাউনলোড</a></p></body></html>');
    tab.document.close();
    tab.document.getElementById("photo").src=image;
    var a=tab.document.getElementById("save");a.href=image;a.download="BD-Barguna-News-PhotoCard.png";
   }else{
    var a=document.createElement("a");a.href=image;a.download="BD-Barguna-News-PhotoCard.png";document.body.appendChild(a);a.click();a.remove();
   }
  }catch(error){
   if(tab&&!tab.closed){try{tab.close();}catch(e){}}
   alert("ফটোকার্ড তৈরি হয়নি: "+(error&&error.message?error.message:error));
  }
 })();
},true);
window.BDPhotoCard={
 create,
 download:async data=>{
  const c=await create(data);
  let url;
  try{url=c.toDataURL('image/png');}catch(e){throw new Error('ছবির উৎস থেকে ফটোকার্ড তৈরি করা যাচ্ছে না। একই সাইটে আপলোড করা ছবি ব্যবহার করুন।');}
  const a=document.createElement('a');a.download='BD-Barguna-News-PhotoCard.png';a.href=url;a.style.position='fixed';a.style.left='-9999px';document.body.appendChild(a);a.click();a.remove();return c;
 }
};
})();