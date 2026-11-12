(function(){
'use strict';
function start(){
 const root=document.querySelector('main')||document.querySelector('.paper')||document.body;
 if(root.dataset.bdToolsReady==='1')return;root.dataset.bdToolsReady='1';
 const title=(root.querySelector('h1')||document.querySelector('h1'))?.textContent?.trim()||document.title;
 const category=(root.querySelector('.category,.cat')?.textContent||'সংবাদ').trim();
 const dateNode=root.querySelector('.date');
 const dateText=(dateNode?.textContent||'').replace(/^📅\\s*প্রকাশিত:\\s*/,'').trim()||new Date().toLocaleDateString('bn-BD');
 const article=root.querySelector('.article,.body,.content')||root.querySelector('article');
 const photo=root.querySelector('.photo-card img,.article-image,figure img,.featured-image');
 const imgUrl=photo?.currentSrc||photo?.src||'';
 const logoUrl=new URL('../images/app-icon.svg',location.href).href;
 const canvas=document.createElement('canvas');canvas.width=1200;canvas.height=1200;
 const ctx=canvas.getContext('2d');
 const card=document.createElement('section');card.className='bd-auto-card';card.style.cssText='margin:22px 0;padding:14px;background:#f8fafc;border:1px solid #dbe2ea;border-radius:14px;text-align:center';
 const heading=document.createElement('h2');heading.textContent='সংবাদের ফটোকার্ড';heading.style.cssText='margin:0 0 12px;color:#b5122b;font-size:20px;text-align:left';
 const preview=document.createElement('img');preview.alt='BD Barguna News ফটোকার্ড';preview.style.cssText='display:block;width:100%;max-width:560px;margin:auto;border-radius:10px;box-shadow:0 5px 20px #0002';
 card.append(heading,preview);
 const insertion=article||root.querySelector('footer')||null;
 if(insertion)root.insertBefore(card,insertion);else root.appendChild(card);
 function rounded(x,y,w,h,r){ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fill();}
 function drawImage(im,x,y,w,h){const s=Math.max(w/im.width,h/im.height),sw=w/s,sh=h/s;ctx.drawImage(im,(im.width-sw)/2,(im.height-sh)/2,sw,sh,x,y,w,h);}
 function load(src){return new Promise(resolve=>{if(!src)return resolve(null);const im=new Image();im.crossOrigin='anonymous';im.onload=()=>resolve(im);im.onerror=()=>resolve(null);im.src=src;});}
 Promise.all([load(imgUrl),load(logoUrl)]).then(([photoImg,logo])=>{
  const g=ctx.createLinearGradient(0,0,1200,1200);g.addColorStop(0,'#101827');g.addColorStop(1,'#304563');ctx.fillStyle=g;ctx.fillRect(0,0,1200,1200);
  ctx.fillStyle='#bd1834';ctx.fillRect(0,0,1200,18);
  if(logo){ctx.fillStyle='#fff';rounded(55,42,100,100,20);const sc=Math.min(82/logo.width,82/logo.height);ctx.drawImage(logo,105-logo.width*sc/2,92-logo.height*sc/2,logo.width*sc,logo.height*sc);}
  ctx.fillStyle='#fff';ctx.font='bold 34px Arial';ctx.fillText('BD BARGUNA NEWS',180,82);
  ctx.font='24px Arial';ctx.fillStyle='#dbe4ef';ctx.fillText('সত্যের সন্ধানে, মানুষের পাশে।',180,120);
  ctx.save();ctx.beginPath();ctx.roundRect(48,160,1104,520,24);ctx.clip();
  if(photoImg)drawImage(photoImg,48,160,1104,520);else{ctx.fillStyle='#24364f';ctx.fillRect(48,160,1104,520);ctx.fillStyle='#fff';ctx.font='bold 54px Arial';ctx.fillText('BD BARGUNA NEWS',90,440);}
  ctx.restore();
  ctx.fillStyle='#fff';rounded(48,650,1104,430,24);
  ctx.fillStyle='#bd1834';rounded(80,690,250,55,14);ctx.fillStyle='#fff';ctx.font='bold 24px Arial';ctx.fillText(category.slice(0,18),102,727);
  ctx.fillStyle='#64748b';ctx.font='bold 22px Arial';ctx.textAlign='right';ctx.fillText(dateText.slice(0,32),1115,727);ctx.textAlign='left';
  ctx.fillStyle='#111827';ctx.font='bold 48px Arial';
  const words=title.split(/\\s+/);let lines=[],line='';for(const word of words){const next=line?line+' '+word:word;if(ctx.measureText(next).width>1020&&line){lines.push(line);line=word;}else line=next;}if(line)lines.push(line);
  let y=825;lines.slice(0,3).forEach((v,i)=>{ctx.fillText(v,82,y);y+=66;});
  ctx.fillStyle='#bd1834';ctx.fillRect(82,1005,140,5);ctx.fillStyle='#475569';ctx.font='bold 22px Arial';ctx.fillText('BD BARGUNA NEWS',82,1045);
  preview.src=canvas.toDataURL('image/png');
 }).catch(()=>{});
 const old=root.querySelector('.buttons');if(old)old.remove();
 const bar=document.createElement('div');bar.className='bd-auto-actions';bar.style.cssText='display:flex;flex-wrap:wrap;gap:8px;margin:18px 0';
 function btn(label,color,fn){const b=document.createElement('button');b.type='button';b.textContent=label;b.style.cssText='border:0;border-radius:7px;padding:11px 15px;color:white;background:'+color+';font-weight:700;cursor:pointer';b.addEventListener('click',fn);bar.appendChild(b);}
 function download(){const a=document.createElement('a');a.href=canvas.toDataURL('image/png');a.download='bd-barguna-news-photo-card.png';a.click();}
 btn('🖼️ ফটোকার্ড ডাউনলোড','#087b42',download);
 btn('🖨️ ফটোকার্ড প্রিন্ট','#475569',()=>{const w=window.open('','_blank');if(!w)return;w.document.write('<img style="width:100%" src="'+canvas.toDataURL('image/png')+'" onload="window.print()">');w.document.close();});
 btn('🖨️ সংবাদ প্রিন্ট','#475569',()=>window.print());
 btn('Facebook শেয়ার','#1877f2',()=>window.open('https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(location.href),'_blank','noopener'));
 btn('WhatsApp শেয়ার','#128c4a',()=>window.open('https://wa.me/?text='+encodeURIComponent(document.title+' '+location.href),'_blank','noopener'));
 btn('▶ YouTube-এ শেয়ার','#e62117',async()=>{try{await navigator.clipboard.writeText(location.href);}catch(e){window.prompt('এই লিংকটি কপি করে YouTube-এ পেস্ট করুন:',location.href);}window.open('https://www.youtube.com/','_blank','noopener');});
 root.appendChild(bar);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();