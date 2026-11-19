(function(){
'use strict';
const FONT='"Noto Sans Bengali","Hind Siliguri",Arial,sans-serif';
function load(src){return new Promise(resolve=>{if(!src)return resolve(null);const im=new Image();im.crossOrigin='anonymous';im.onload=()=>resolve(im);im.onerror=()=>resolve(null);im.src=src;});}
function wrap(ctx,text,maxWidth){const out=[];let line='';for(const word of String(text||'').split(/\s+/)){const next=line?line+' '+word:word;if(ctx.measureText(next).width<=maxWidth){line=next;continue;}if(line)out.push(line);line=word;while(ctx.measureText(line).width>maxWidth&&line.length>1){let cut=line.length-1;while(cut>1&&ctx.measureText(line.slice(0,cut)).width>maxWidth)cut--;out.push(line.slice(0,cut));line=line.slice(cut);}}if(line)out.push(line);return out;}
async function create(data){
 const title=String(data.title||'সর্বশেষ সংবাদ').replace(/\s+/g,' ').trim();
 const category=String(data.category||'সংবাদ').trim();
 const date=String(data.date||new Date().toLocaleDateString('bn-BD',{day:'numeric',month:'long',year:'numeric'}));
 const logo=await load(data.logo||'images/bd-barguna-logo.webp?v=20261118');
 const raw=Array.isArray(data.images)?data.images.filter(Boolean).slice(0,3):[];
 const photos=await Promise.all(raw.map(x=>load(typeof x==='string'?x:x.url)));
 const usable=photos.map((im,i)=>im?{im,caption:typeof raw[i]==='object'?(raw[i].caption||''):''}:null).filter(Boolean);
 const c=document.createElement('canvas'),x=c.getContext('2d');c.width=1200;c.height=1400;
 x.fillStyle='#eaffef';x.fillRect(0,0,1200,1400);
 x.fillStyle='#078c50';x.fillRect(0,0,1200,18);
 if(logo){x.fillStyle='#fff';x.beginPath();x.roundRect(55,40,112,112,18);x.fill();const sc=Math.min(96/logo.naturalWidth,96/logo.naturalHeight);x.drawImage(logo,111-logo.naturalWidth*sc/2,96-logo.naturalHeight*sc/2,logo.naturalWidth*sc,logo.naturalHeight*sc);}
 x.fillStyle='#111';x.textAlign='left';x.textBaseline='alphabetic';x.font='bold 48px Arial';x.fillText('BD BARGUNA NEWS',190,91);
 x.fillStyle='#167448';x.font='26px '+FONT;x.fillText('সত্যের সন্ধানে, মানুষের পাশে।',192,132);
 x.fillStyle='#b5122b';x.font='bold 22px '+FONT;x.textAlign='right';x.fillText('বরগুনা ও দেশের সর্বশেষ সংবাদ',1145,85);x.textAlign='left';
 x.fillStyle='#078c50';x.fillRect(48,175,1104,5);
 const top=205,photoH=520,gap=8,w=usable.length===1?1104:usable.length===2?548:362;
 if(usable.length){usable.forEach((p,i)=>{const xx=48+i*(w+gap);x.fillStyle='#fff';x.fillRect(xx,top,w,photoH);const sc=Math.min(w/p.im.naturalWidth,photoH/p.im.naturalHeight);const dw=p.im.naturalWidth*sc,dh=p.im.naturalHeight*sc;x.drawImage(p.im,xx+(w-dw)/2,top+(photoH-dh)/2,dw,dh);if(p.caption){x.fillStyle='rgba(0,0,0,.72)';x.fillRect(xx,top+photoH-48,w,48);x.fillStyle='#fff';x.font='20px '+FONT;x.textAlign='center';x.fillText(p.caption.slice(0,34),xx+w/2,top+photoH-16);x.textAlign='left';}});}
 else{x.fillStyle='#d7e9df';x.fillRect(48,top,1104,photoH);x.fillStyle='#177a4c';x.font='bold 54px Arial';x.textAlign='center';x.fillText('BD BARGUNA NEWS',600,top+270);x.textAlign='left';}
 const catY=770;x.fillStyle='#b5122b';x.fillRect(48,catY,230,54);x.fillStyle='#fff';x.font='bold 26px '+FONT;x.fillText(category.slice(0,18),66,catY+37);
 x.fillStyle='#222';x.font='bold 60px '+FONT;const lines=wrap(x,title,1080);let y=catY+145;const lineH=82;lines.slice(0,5).forEach(t=>{x.fillText(t,52,y);y+=lineH;});
 x.fillStyle='#078c50';x.fillRect(0,1280,1200,120);
 x.fillStyle='#fff';x.font='bold 30px '+FONT;x.fillText('BD BARGUNA NEWS',52,1340);
 x.textAlign='right';x.font='26px '+FONT;x.fillText(date,1145,1340);x.textAlign='left';
 x.fillStyle='rgba(255,255,255,.9)';x.font='18px Arial';x.fillText('mdsaimoon518-ship-it.github.io/BD-Barguna-News',52,1374);
 return c;
}
window.BDPhotoCard={create,download:async data=>{const c=await create(data);const a=document.createElement('a');a.download='BD-Barguna-News-PhotoCard.png';a.href=c.toDataURL('image/png');a.click();return c;}};
})();