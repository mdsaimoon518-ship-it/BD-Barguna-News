(function(){
'use strict';
function start(){
 const root=document.querySelector('main')||document.querySelector('.paper')||document.body;
 if(root.dataset.bdToolsReady==='1')return;root.dataset.bdToolsReady='1';
 const title=(root.querySelector('h1')||document.querySelector('h1'))?.textContent?.trim()||document.title;
 const category=(root.querySelector('.category,.cat')?.textContent||'সংবাদ').trim();
 const dateNode=root.querySelector('.date:not(#articleViewCount)');
 const dateText=(dateNode?.textContent||'').replace(/^📅\s*প্রকাশিত:\s*/,'').trim()||new Date().toLocaleDateString('bn-BD');
 const article=root.querySelector('.article,.body,.content')||root.querySelector('article');
 const photo=root.querySelector('.photo-card img,.article-image,figure img,.featured-image');
 const imgUrl=photo?.currentSrc||photo?.src||'';
 const logoUrl=new URL('../images/site-logo.svg',location.href).href;
 const canvas=document.createElement('canvas');canvas.width=1200;canvas.height=1200;
 const ctx=canvas.getContext('2d');
 if(!ctx)return;
 const card=document.createElement('section');card.className='bd-auto-card';
 card.style.cssText='margin:22px 0;padding:14px;background:#f8fafc;border:1px solid #dbe2ea;border-radius:14px;text-align:center';
 const heading=document.createElement('h2');heading.textContent='সংবাদের ফটোকার্ড';heading.style.cssText='margin:0 0 12px;color:#b5122b;font-size:20px;text-align:left';
 const preview=document.createElement('img');preview.alt='BD Barguna News ফটোকার্ড';preview.style.cssText='display:block;width:100%;max-width:560px;margin:auto;border-radius:10px;box-shadow:0 5px 20px #0002';
 card.append(heading,preview);
 const insertion=article||root.querySelector('footer')||null;
 if(insertion)root.insertBefore(card,insertion);else root.appendChild(card);
 function rounded(x,y,w,h,r){ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fill();}
 function load(src){return new Promise(resolve=>{if(!src)return resolve(null);const im=new Image();try{if(new URL(src,location.href).origin!==location.origin)im.crossOrigin='anonymous';}catch(e){}im.onload=()=>resolve(im);im.onerror=()=>resolve(null);im.src=src;});}
 function drawFullImage(im,x,y,w,h){
  ctx.fillStyle='#e9eef4';ctx.fillRect(x,y,w,h);
  const scale=Math.min(w/im.naturalWidth,h/im.naturalHeight);
  const dw=im.naturalWidth*scale,dh=im.naturalHeight*scale;
  ctx.drawImage(im,x+(w-dw)/2,y+(h-dh)/2,dw,dh);
 }
 const ready=Promise.all([load(imgUrl),load(logoUrl)]).then(([photoImg,logo])=>{
  const g=ctx.createLinearGradient(0,0,1200,1200);g.addColorStop(0,'#101827');g.addColorStop(1,'#304563');ctx.fillStyle=g;ctx.fillRect(0,0,1200,1200);
  ctx.fillStyle='#bd1834';ctx.fillRect(0,0,1200,18);
  if(logo){ctx.fillStyle='#fff';rounded(55,42,100,100,20);const sc=Math.min(82/logo.naturalWidth,82/logo.naturalHeight);ctx.drawImage(logo,105-logo.naturalWidth*sc/2,92-logo.naturalHeight*sc/2,logo.naturalWidth*sc,logo.naturalHeight*sc);}
  ctx.fillStyle='#fff';ctx.font='bold 34px Arial';ctx.fillText('BD BARGUNA NEWS',180,82);
  ctx.font='24px Arial';ctx.fillStyle='#dbe4ef';ctx.fillText('সত্যের সন্ধানে, মানুষের পাশে।',180,120);
  ctx.save();ctx.beginPath();ctx.roundRect(48,160,1104,520,24);ctx.clip();
  if(photoImg)drawFullImage(photoImg,48,160,1104,520);
  else{ctx.fillStyle='#24364f';ctx.fillRect(48,160,1104,520);ctx.fillStyle='#fff';ctx.font='bold 54px Arial';ctx.fillText('BD BARGUNA NEWS',90,440);}
  ctx.restore();
  ctx.fillStyle='#fff';rounded(48,650,1104,430,24);
  ctx.fillStyle='#bd1834';rounded(80,690,250,55,14);ctx.fillStyle='#fff';ctx.font='bold 24px Arial';ctx.fillText(category.slice(0,18),102,727);
  ctx.fillStyle='#64748b';ctx.font='bold 22px Arial';ctx.textAlign='right';ctx.fillText(dateText.slice(0,32),1115,727);ctx.textAlign='left';
  ctx.fillStyle='#111827';ctx.font='bold 48px Arial';
  const words=title.split(/\s+/);let lines=[],line='';for(const word of words){const next=line?line+' '+word:word;if(ctx.measureText(next).width>1020&&line){lines.push(line);line=word;}else line=next;}if(line)lines.push(line);
  let y=825;lines.slice(0,3).forEach(v=>{ctx.fillText(v,82,y);y+=66;});
  ctx.fillStyle='#bd1834';ctx.fillRect(82,1005,140,5);ctx.fillStyle='#475569';ctx.font='bold 22px Arial';ctx.fillText('BD BARGUNA NEWS',82,1045);
  preview.src=canvas.toDataURL('image/png');
 }).catch(error=>console.warn('BD Barguna photo card:',error));
 const style=document.createElement('style');style.textContent='.bd-auto-print-masthead{display:none}@media print{.bd-auto-print-masthead{display:block!important;text-align:center!important;margin:0 0 5mm!important;padding:0 0 3mm!important;border-bottom:3px double #111!important;color:#111!important;break-inside:avoid!important}.bd-auto-print-masthead .line{display:flex;justify-content:space-between;font-size:8pt;border-bottom:1px solid #333;padding-bottom:2mm}.bd-auto-print-masthead .brand{display:flex;align-items:center;justify-content:center;gap:4mm;font-size:25pt;font-weight:900;margin:2mm 0}.bd-auto-print-masthead img{width:15mm;height:15mm;object-fit:contain}.bd-auto-print-masthead .tag{font-size:9pt;font-weight:700}.bd-auto-actions,.bd-auto-card{display:none!important}}';
 document.head.appendChild(style);
 const mast=document.createElement('div');mast.className='bd-auto-print-masthead';
 const line=document.createElement('div');line.className='line';
 const left=document.createElement('span');left.textContent='জাতীয় অনলাইন সংবাদপত্র';
 const mid=document.createElement('span');mid.textContent='বরগুনা • বাংলাদেশ';
 const right=document.createElement('span');right.textContent=dateText;
 line.append(left,mid,right);
 const brand=document.createElement('div');brand.className='brand';
 const logoPrint=document.createElement('img');logoPrint.src=logoUrl;logoPrint.alt='BD Barguna News';
 const name=document.createElement('span');name.textContent='BD BARGUNA NEWS';brand.append(logoPrint,name);
 const tag=document.createElement('div');tag.className='tag';tag.textContent='সত্যের সন্ধানে, মানুষের পাশে।';
 mast.append(line,brand,tag);root.insertBefore(mast,root.firstChild);
 const old=root.querySelector('.buttons');if(old)old.remove();
 const bar=document.createElement('div');bar.className='bd-auto-actions';bar.style.cssText='display:flex;flex-wrap:wrap;gap:8px;margin:18px 0';
 function btn(label,color,fn){const b=document.createElement('button');b.type='button';b.textContent=label;b.style.cssText='border:0;border-radius:7px;padding:11px 15px;color:white;background:'+color+';font-weight:700;cursor:pointer';b.addEventListener('click',fn);bar.appendChild(b);}
 async function download(){await ready;const save=url=>{const a=document.createElement('a');a.href=url;a.download='BD-Barguna-News-PhotoCard.png';a.style.display='none';document.body.appendChild(a);a.click();a.remove();};if(canvas.toBlob)canvas.toBlob(blob=>{if(!blob){save(canvas.toDataURL('image/png'));return;}const url=URL.createObjectURL(blob);save(url);setTimeout(()=>URL.revokeObjectURL(url),10000);},'image/png');else save(canvas.toDataURL('image/png'));}
 async function copyText(){const value=[title,category,dateText,(article?.textContent||'').trim(),'সংবাদের লিংক: '+location.href].filter(Boolean).join('\n\n');try{if(navigator.clipboard&&window.isSecureContext)await navigator.clipboard.writeText(value);else{const field=document.createElement('textarea');field.value=value;field.style.position='fixed';field.style.opacity='0';document.body.appendChild(field);field.focus();field.select();const ok=document.execCommand('copy');field.remove();if(!ok)throw Error('কপি করা যায়নি');}alert('সম্পূর্ণ নিউজ কপি হয়েছে।');}catch(e){window.prompt('নিউজটি কপি করুন:',value);}}
 btn('🖼️ ফটোকার্ড ডাউনলোড','#087b42',download);
 btn('📋 সম্পূর্ণ নিউজ কপি','#334155',copyText);
 btn('🖨️ ফটোকার্ড প্রিন্ট','#475569',async()=>{await ready;const w=window.open('','_blank');if(!w)return;w.document.write('<img style="width:100%;max-width:900px" src="'+canvas.toDataURL('image/png')+'" onload="window.print()">');w.document.close();});
 btn('🖨️ সংবাদ প্রিন্ট','#475569',()=>window.print());
 btn('🔗 কপি লিংক','#334155',async()=>{try{if(navigator.clipboard&&window.isSecureContext)await navigator.clipboard.writeText(location.href);else throw Error();alert('নিউজের লিংক কপি হয়েছে');}catch(e){window.prompt('নিউজের লিংক কপি করুন:',location.href);}});
 btn('Facebook শেয়ার','#1877f2',()=>window.open('https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(location.href),'_blank','noopener'));
 btn('WhatsApp শেয়ার','#128c4a',()=>window.open('https://wa.me/?text='+encodeURIComponent(document.title+' '+location.href),'_blank','noopener'));
 root.appendChild(bar);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();