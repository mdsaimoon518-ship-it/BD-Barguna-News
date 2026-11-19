(function(){
'use strict';
const FONT='"Noto Sans Bengali","Hind Siliguri",Arial,sans-serif;
const W=1200,H=1660;
function load(src){return new Promise(resolve=>{if(!src)return resolve(null);const im=new Image();try{const u=new URL(src,document.baseURI);if(u.origin!==location.origin)im.crossOrigin='anonymous';im.onload=()=>resolve(im);im.onerror=()=>resolve(null);im.src=u.href;}catch(e){resolve(null);}});}
function wrap(ctx,text,maxWidth){const out=[];let line='';for(const word of String(text||'').trim().split(/\s+/).filter(Boolean)){let candidate=line?line+' '+word:word;if(ctx.measureText(candidate).width<=maxWidth){line=candidate;continue;}if(line)out.push(line);line='';for(const ch of Array.from(word)){if(ctx.measureText(line+ch).width>maxWidth&&line){out.push(line);line=ch;}else line+=ch;}}if(line)out.push(line);return out;}
function cover(ctx,img,x,y,w,h){const scale=Math.max(w/img.naturalWidth,h/img.naturalHeight),sw=w/scale,sh=h/scale,sx=(img.naturalWidth-sw)/2,sy=(img.naturalHeight-sh)/2;ctx.drawImage(img,sx,sy,sw,sh,x,y,w,h);}
function fitLines(ctx,text,maxWidth,maxLines,startSize,minSize){let size=startSize,lines=[];while(size>=minSize){ctx.font='bold '+size+'px '+FONT;lines=wrap(ctx,text,maxWidth);if(lines.length<=maxLines)break;size-=2;}return{size,lines};}
function rounded(ctx,x,y,w,h,r){ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fill();}
async function create(data){
 if(document.fonts&&document.fonts.ready)try{await document.fonts.ready;}catch(e){}
 const title=String(data.title||'সর্বশেষ সংবাদ').replace(/\s+/g,' ').trim();
 const date=String(data.date||new Intl.DateTimeFormat('bn-BD',{day:'numeric',month:'long',year:'numeric',timeZone:'Asia/Dhaka'}).format(new Date())).replace(/^📅\s*প্রকাশিত:\s*/,'').trim();
 const logo=await load(data.logo||'images/bd-barguna-logo.webp');
 const raw=Array.isArray(data.images)?data.images.filter(Boolean).slice(0,2):[];
 const loaded=await Promise.all(raw.map(item=>load(typeof item==='string'?item:item.url)));
 const photos=loaded.filter(Boolean);
 const c=document.createElement('canvas');c.width=W;c.height=H;
 const x=c.getContext('2d');if(!x)throw new Error('ফটোকার্ড তৈরি করা যাচ্ছে না।');
 const photoH=710,dateY=710,dateH=88,titleY=798,titleH=600,footerY=1398,footerH=262;
 const bg=x.createLinearGradient(0,0,0,H);bg.addColorStop(0,'#082a78');bg.addColorStop(1,'#031344');x.fillStyle=bg;x.fillRect(0,0,W,H);
 if(photos.length>=2){const split=7,pw=(W-split)/2;cover(x,photos[0],0,0,pw,photoH);x.fillStyle='#fff';x.fillRect(pw,0,split,photoH);cover(x,photos[1],pw+split,0,pw,photoH);}
 else if(photos.length===1)cover(x,photos[0],0,0,W,photoH);
 else{const g=x.createLinearGradient(0,0,W,photoH);g.addColorStop(0,'#174eac');g.addColorStop(1,'#061947');x.fillStyle=g;x.fillRect(0,0,W,photoH);x.fillStyle='#fff';x.textAlign='center';x.font='bold 66px Arial';x.fillText('BD BARGUNA NEWS',W/2,photoH/2);}
 // Darken photo edges slightly for broadcast-card finish
 const shade=x.createLinearGradient(0,0,0,photoH);shade.addColorStop(0,'rgba(0,0,0,.10)');shade.addColorStop(.65,'rgba(0,0,0,0)');shade.addColorStop(1,'rgba(0,0,0,.22)');x.fillStyle=shade;x.fillRect(0,0,W,photoH);
 // Channel identity ribbon
 x.fillStyle='rgba(2,15,48,.88)';rounded(x,26,26,365,132,18);
 if(logo){x.fillStyle='#fff';rounded(x,38,38,108,108,14);const s=Math.min(94/logo.naturalWidth,94/logo.naturalHeight);x.drawImage(logo,92-logo.naturalWidth*s/2,92-logo.naturalHeight*s/2,logo.naturalWidth*s,logo.naturalHeight*s);}
 x.textAlign='left';x.fillStyle='#fff';x.font='bold 36px Arial';x.fillText('BD BARGUNA',165,86);x.fillStyle='#ffdf32';x.font='bold 32px Arial';x.fillText('NEWS',165,128);
 // Barguna location tag
 x.fillStyle='#080808';x.fillRect(28,photoH-86,205,62);x.fillStyle='#ef1736';x.fillRect(28,photoH-86,13,62);x.fillStyle='#fff';x.textAlign='center';x.font='bold 38px '+FONT;x.fillText('বরগুনা',132,photoH-43);
 // Date band
 const dg=x.createLinearGradient(0,dateY,W,dateY);dg.addColorStop(0,'#ed102f');dg.addColorStop(.52,'#b80c2b');dg.addColorStop(1,'#0757dc');x.fillStyle=dg;x.fillRect(0,dateY,W,dateH);x.fillStyle='#27aaff';x.fillRect(0,dateY+dateH-5,W,5);x.fillStyle='#fff';x.textAlign='center';x.font='bold 48px '+FONT;x.fillText(date,W/2,dateY+59);
 // Headline panel
 const hb=x.createLinearGradient(0,titleY,0,titleY+titleH);hb.addColorStop(0,'#0755c9');hb.addColorStop(.42,'#073a9d');hb.addColorStop(1,'#041c66');x.fillStyle=hb;x.fillRect(0,titleY,W,titleH);
 x.save();x.globalAlpha=.16;x.strokeStyle='#42aaff';x.lineWidth=5;for(let i=0;i<6;i++){x.beginPath();x.moveTo(-100,titleY+90+i*112);x.lineTo(W+100,titleY-100+i*112);x.stroke();}x.restore();
 const layout=fitLines(x,title,1080,6,68,40),lineH=Math.round(layout.size*1.38);x.font='bold '+layout.size+'px '+FONT;x.textAlign='center';x.textBaseline='middle';const total=layout.lines.length*lineH;let yy=titleY+(titleH-total)/2+lineH/2;
 layout.lines.forEach((line,i)=>{x.fillStyle=(i===1&&layout.lines.length>1)?'#ffed21':'#fff';x.shadowColor='rgba(0,0,0,.25)';x.shadowBlur=2;x.fillText(line,W/2,yy);yy+=lineH;});x.shadowBlur=0;
 // Branded footer
 const fg=x.createLinearGradient(0,footerY,W,footerY+footerH);fg.addColorStop(0,'#031849');fg.addColorStop(.5,'#06358f');fg.addColorStop(1,'#031849');x.fillStyle=fg;x.fillRect(0,footerY,W,footerH);x.fillStyle='#ed1738';x.fillRect(0,footerY,W,9);x.fillStyle='#1594ff';x.fillRect(0,footerY+9,W,5);
 x.textAlign='left';x.textBaseline='alphabetic';x.fillStyle='#ffed25';x.font='bold 43px '+FONT;x.fillText('বাংলাদেশ ও বিশ্বের',46,footerY+83);x.fillStyle='#fff';x.font='bold 34px '+FONT;x.fillText('সর্বশেষ সংবাদ সবার আগে',46,footerY+132);x.fillStyle='#dceaff';x.font='27px '+FONT;x.fillText('সত্যের সন্ধানে, মানুষের পাশে।',46,footerY+184);
 x.textAlign='right';x.fillStyle='#fff';x.font='bold 30px Arial';x.fillText('BD BARGUNA NEWS',1150,footerY+83);x.fillStyle='#ffe52b';x.font='25px '+FONT;x.fillText('বিস্তারিত পড়ুন ওয়েবসাইটে',1150,footerY+132);x.fillStyle='#e8f1ff';x.font='22px Arial';x.fillText('mdsaimoon518-ship-it.github.io/BD-Barguna-News',1150,footerY+184);
 return c;
}
window.BDPhotoCard={create,download:async data=>{const c=await create(data);const a=document.createElement('a');a.download='BD-Barguna-News-PhotoCard.png';a.href=c.toDataURL('image/png');document.body.appendChild(a);a.click();a.remove();return c;}};
})();