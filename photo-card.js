(function(){
'use strict';
const FONT='"Noto Sans Bengali","Hind Siliguri",Arial,sans-serif';
function load(src){
 return new Promise(resolve=>{
  if(!src)return resolve(null);
  const im=new Image();
  try{const u=new URL(src,document.baseURI);if(u.origin!==location.origin)im.crossOrigin='anonymous';im.onload=()=>resolve(im);im.onerror=()=>resolve(null);im.src=u.href;}
  catch(e){resolve(null);}
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
 if(line)out.push(line);
 return out;
}
function cover(ctx,img,x,y,w,h){
 const scale=Math.max(w/img.naturalWidth,h/img.naturalHeight);
 const sw=w/scale,sh=h/scale,sx=(img.naturalWidth-sw)/2,sy=(img.naturalHeight-sh)/2;
 ctx.drawImage(img,sx,sy,sw,sh,x,y,w,h);
}
function fitLines(ctx,text,maxWidth,maxLines,startSize,minSize){
 let size=startSize,lines=[];
 while(size>=minSize){ctx.font='bold '+size+'px '+FONT;lines=wrap(ctx,text,maxWidth);if(lines.length<=maxLines)break;size-=2;}
 return {size,lines};
}
async function create(data){
 if(document.fonts&&document.fonts.ready)try{await document.fonts.ready;}catch(e){}
 const title=String(data.title||'সর্বশেষ সংবাদ').replace(/\s+/g,' ').trim();
 const date=String(data.date||new Intl.DateTimeFormat('bn-BD',{day:'numeric',month:'long',year:'numeric',timeZone:'Asia/Dhaka'}).format(new Date())).replace(/^📅\s*প্রকাশিত:\s*/,'').trim();
 const logo=await load(data.logo||'images/bd-barguna-logo.webp');
 const raw=Array.isArray(data.images)?data.images.filter(Boolean).slice(0,2):[];
 const loaded=await Promise.all(raw.map(item=>load(typeof item==='string'?item:item.url)));
 const photos=loaded.filter(Boolean);
 const W=1200,H=1660,margin=0,photoY=0,photoH=720,dateY=720,dateH=82,titleY=802,titleH=610,footerY=1412,footerH=248;
 const c=document.createElement('canvas');c.width=W;c.height=H;
 const x=c.getContext('2d');if(!x)throw new Error('ফটোকার্ড তৈরি করা যাচ্ছে না।');
 // photo header: one wide image or two balanced panels
 x.fillStyle='#071d58';x.fillRect(0,0,W,H);
 if(photos.length>=2){
  const split=6,pw=(W-split)/2;
  cover(x,photos[0],0,photoY,pw,photoH);
  x.fillStyle='#fff';x.fillRect(pw,photoY,split,photoH);
  cover(x,photos[1],pw+split,photoY,pw,photoH);
 }else if(photos.length===1){cover(x,photos[0],0,photoY,W,photoH);}
 else{
  const g=x.createLinearGradient(0,0,W,photoH);g.addColorStop(0,'#163f8d');g.addColorStop(1,'#061a4d');x.fillStyle=g;x.fillRect(0,0,W,photoH);
  x.fillStyle='#fff';x.textAlign='center';x.font='bold 62px Arial';x.fillText('BD BARGUNA NEWS',W/2,photoH/2);
 }
 // brand mark overlay
 x.fillStyle='rgba(0,0,0,.72)';x.fillRect(28,28,230,118);
 if(logo){x.fillStyle='#fff';x.beginPath();x.roundRect(38,36,100,100,14);x.fill();const s=Math.min(88/logo.naturalWidth,88/logo.naturalHeight);x.drawImage(logo,88-logo.naturalWidth*s/2,86-logo.naturalHeight*s/2,logo.naturalWidth*s,logo.naturalHeight*s);}
 x.fillStyle='#fff';x.textAlign='left';x.font='bold 27px Arial';x.fillText('BD BARGUNA',150,78);x.fillText('NEWS',150,113);
 // district tag
 x.fillStyle='#101010';x.fillRect(28,photoH-84,190,62);x.fillStyle='#e21c36';x.fillRect(28,photoH-84,12,62);
 x.fillStyle='#fff';x.font='bold 34px '+FONT;x.textAlign='center';x.fillText('বরগুনা',128,photoH-42);
 // date strip with red-to-blue broadcast gradient
 const dg=x.createLinearGradient(0,dateY,W,dateY);dg.addColorStop(0,'#d80c2c');dg.addColorStop(.52,'#b70d2a');dg.addColorStop(1,'#0755d7');
 x.fillStyle=dg;x.fillRect(0,dateY,W,dateH);x.fillStyle='#28aaff';x.fillRect(0,dateY+dateH-5,W,5);
 x.fillStyle='#fff';x.textAlign='center';x.font='bold 44px '+FONT;x.fillText(date,W/2,dateY+57);
 // deep blue headline field
 const bg=x.createLinearGradient(0,titleY,0,titleY+titleH);bg.addColorStop(0,'#0751c7');bg.addColorStop(.5,'#07358f');bg.addColorStop(1,'#061d65');
 x.fillStyle=bg;x.fillRect(0,titleY,W,titleH);
 x.save();x.globalAlpha=.12;x.strokeStyle='#5ab5ff';x.lineWidth=4;
 for(let i=0;i<5;i++){x.beginPath();x.moveTo(-80,titleY+120+i*115);x.lineTo(W+80,titleY-80+i*115);x.stroke();}
 x.restore();
 const layout=fitLines(x,title,1060,6,64,42),lineH=Math.round(layout.size*1.42);
 x.font='bold '+layout.size+'px '+FONT;x.textAlign='center';x.textBaseline='middle';
 const total=layout.lines.length*lineH;let yy=titleY+(titleH-total)/2+lineH/2;
 layout.lines.forEach((line,i)=>{x.fillStyle=(i===1&&layout.lines.length>2)?'#ffed25':'#fff';x.fillText(line,W/2,yy);yy+=lineH;});
 // bottom news footer
 const fg=x.createLinearGradient(0,footerY,W,footerY+footerH);fg.addColorStop(0,'#04174e');fg.addColorStop(.5,'#062c86');fg.addColorStop(1,'#03164b');
 x.fillStyle=fg;x.fillRect(0,footerY,W,footerH);x.fillStyle='#e51c3a';x.fillRect(0,footerY,W,10);x.fillStyle='#168cff';x.fillRect(0,footerY+10,W,5);
 x.fillStyle='#fff';x.textAlign='left';x.textBaseline='alphabetic';x.font='bold 38px Arial';x.fillText('BD BARGUNA NEWS',48,footerY+86);
 x.font='26px '+FONT;x.fillStyle='#e8f2ff';x.fillText('সত্যের সন্ধানে, মানুষের পাশে।',48,footerY+132);
 x.fillStyle='#ffe72b';x.font='bold 29px '+FONT;x.fillText('বিস্তারিত সংবাদ পড়ুন',48,footerY+188);
 x.textAlign='right';x.fillStyle='#fff';x.font='25px Arial';x.fillText('mdsaimoon518-ship-it.github.io/BD-Barguna-News',1150,footerY+86);
 x.font='bold 25px '+FONT;x.fillStyle='#d9e8ff';x.fillText('প্রকাশক ও সম্পাদক: মোঃ সাইমুন মিয়া',1150,footerY+132);
 return c;
}
window.BDPhotoCard={create,download:async data=>{const c=await create(data);const a=document.createElement('a');a.download='BD-Barguna-News-PhotoCard.png';a.href=c.toDataURL('image/png');document.body.appendChild(a);a.click();a.remove();return c;}};
})();