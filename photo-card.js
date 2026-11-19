(function(){
'use strict';
const FONT='"Noto Sans Bengali","Hind Siliguri",Arial,sans-serif';
function load(src){
 return new Promise(resolve=>{
  if(!src)return resolve(null);
  const im=new Image();
  im.onload=()=>resolve(im);im.onerror=()=>resolve(null);
  try{if(new URL(src,document.baseURI).origin!==location.origin)im.crossOrigin='anonymous';}catch(e){}
  im.src=new URL(src,document.baseURI).href;
 });
}
function wrap(ctx,text,maxWidth){
 const out=[];let line='';
 for(const word of String(text||'').trim().split(/\s+/).filter(Boolean)){
  let candidate=line?line+' '+word:word;
  if(ctx.measureText(candidate).width<=maxWidth){line=candidate;continue;}
  if(line)out.push(line);
  line='';
  for(const ch of Array.from(word)){
   if(ctx.measureText(line+ch).width>maxWidth&&line){out.push(line);line=ch;}
   else line+=ch;
  }
 }
 if(line)out.push(line);
 return out;
}
function cover(ctx,img,x,y,w,h){
 const scale=Math.max(w/img.naturalWidth,h/img.naturalHeight);
 const sw=w/scale,sh=h/scale,sx=(img.naturalWidth-sw)/2,sy=(img.naturalHeight-sh)/2;
 ctx.drawImage(img,sx,sy,sw,sh,x,y,w,h);
}
async function create(data){
 if(document.fonts&&document.fonts.ready)try{await document.fonts.ready;}catch(e){}
 const title=String(data.title||'সর্বশেষ সংবাদ').replace(/\s+/g,' ').trim();
 const date=String(data.date||new Date().toLocaleDateString('bn-BD',{day:'numeric',month:'long',year:'numeric'})).replace(/^📅\s*প্রকাশিত:\s*/,'').trim();
 const logo=await load(data.logo||'images/bd-barguna-logo.webp?v=20261118');
 const raw=Array.isArray(data.images)?data.images.filter(Boolean).slice(0,2):[];
 const loaded=await Promise.all(raw.map(item=>load(typeof item==='string'?item:item.url)));
 const photos=loaded.map((im,i)=>im?{im,caption:typeof raw[i]==='object'?(raw[i].caption||''):''}:null).filter(Boolean);
 const c=document.createElement('canvas'),x=c.getContext('2d');
 if(!x)throw new Error('ফটোকার্ড তৈরি করা যাচ্ছে না।');
 const W=1200,margin=44,photoTop=188,photoH=560,gap=8,photoW=(W-margin*2-gap)/2;
 x.font='bold 60px '+FONT;
 let lines=wrap(x,title,1100),fontSize=60;
 while(lines.length>6&&fontSize>42){fontSize-=2;x.font='bold '+fontSize+'px '+FONT;lines=wrap(x,title,1100);}
 const lineH=Math.round(fontSize*1.35),titleTop=photoTop+photoH+72,titleBottom=titleTop+Math.max(lines.length,2)*lineH+65;
 const footerTop=titleBottom+18;c.width=W;c.height=footerTop+112;
 x.fillStyle='#eaffef';x.fillRect(0,0,W,c.height);
 x.fillStyle='#078c50';x.fillRect(0,0,W,18);
 if(logo){
  x.fillStyle='#fff';x.beginPath();x.roundRect(54,40,116,116,18);x.fill();
  const s=Math.min(100/logo.naturalWidth,100/logo.naturalHeight);
  x.drawImage(logo,112-logo.naturalWidth*s/2,98-logo.naturalHeight*s/2,logo.naturalWidth*s,logo.naturalHeight*s);
 }
 x.fillStyle='#111';x.textAlign='left';x.textBaseline='alphabetic';x.font='bold 50px Arial';x.fillText('BD BARGUNA NEWS',195,92);
 x.fillStyle='#167448';x.font='27px '+FONT;x.fillText('সত্যের সন্ধানে, মানুষের পাশে।',197,137);
 x.fillStyle='#c51b2b';x.font='bold 26px '+FONT;x.textAlign='right';x.fillText('বরগুনা ও দেশের সর্বশেষ সংবাদ',1145,83);x.textAlign='left';
 x.fillStyle='#078c50';x.fillRect(margin,168,W-margin*2,5);
 if(photos.length===1){
  x.fillStyle='#fff';x.fillRect(margin,photoTop,W-margin*2,photoH);cover(x,photos[0].im,margin,photoTop,W-margin*2,photoH);
 }else if(photos.length>=2){
  photos.forEach((p,i)=>{const xx=margin+i*(photoW+gap);x.fillStyle='#fff';x.fillRect(xx,photoTop,photoW,photoH);cover(x,p.im,xx,photoTop,photoW,photoH);});
 }else{
  x.fillStyle='#d7e9df';x.fillRect(margin,photoTop,W-margin*2,photoH);
  x.fillStyle='#177a4c';x.font='bold 60px Arial';x.textAlign='center';x.fillText('BD BARGUNA NEWS',W/2,photoTop+300);x.textAlign='left';
 }
 x.fillStyle='#111';x.textAlign='center';x.font='bold '+fontSize+'px '+FONT;
 let y=titleTop;lines.forEach(line=>{x.fillText(line,W/2,y);y+=lineH;});
 x.fillStyle='#078c50';x.fillRect(0,footerTop,W,112);
 x.fillStyle='#fff';x.textAlign='left';x.font='bold 30px Arial';x.fillText('BD BARGUNA NEWS',48,footerTop+48);
 x.font='23px '+FONT;x.fillText('mdsaimoon518-ship-it.github.io/BD-Barguna-News',48,footerTop+83);
 x.textAlign='right';x.font='bold 27px '+FONT;x.fillText(date,1152,footerTop+64);x.textAlign='left';
 return c;
}
window.BDPhotoCard={create,download:async data=>{const c=await create(data);const a=document.createElement('a');a.download='BD-Barguna-News-PhotoCard.png';a.href=c.toDataURL('image/png');document.body.appendChild(a);a.click();a.remove();return c;}};
})();