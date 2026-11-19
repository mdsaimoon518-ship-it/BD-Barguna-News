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
 const logoUrl=new URL('../images/bd-barguna-logo.webp?v=20261115',location.href).href;
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
 const ready=(async()=>{
  if(!window.BDPhotoCard){await new Promise((resolve,reject)=>{const script=document.createElement('script');script.src='../photo-card.js?v=1';script.onload=resolve;script.onerror=()=>reject(new Error('ফটোকার্ড ডিজাইন লোড হয়নি'));document.head.appendChild(script);});}
  const photos=Array.from(document.querySelectorAll('.photo-gallery figure.photo-card img,.article-image,figure img')).filter((el,i,all)=>!el.closest('.photo-card-preview')&&all.findIndex(x=>(x.currentSrc||x.src)===(el.currentSrc||el.src))===i).slice(0,3).map(el=>({url:el.currentSrc||el.src,caption:(el.closest('figure')?.querySelector('figcaption,.caption')?.textContent||'').trim()}));
  const rendered=await window.BDPhotoCard.create({title,category,date:dateText,images:photos,logo:logoUrl});
  canvas.width=rendered.width;canvas.height=rendered.height;ctx.drawImage(rendered,0,0);
  preview.src=canvas.toDataURL('image/png');
 })().catch(error=>console.warn('BD Barguna photo card:',error));
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