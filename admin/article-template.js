// Article-page HTML template used by the admin publisher.
window.articleHTML = function articleHTML(n){
 const mainMenu=["হোম","আজকের সর্বশেষ খবর","বিশেষ সংবাদ","করোনাভাইরাস","সম্পাদকীয়","জাতীয়","রাজধানী","সারাদেশ","রাজনীতি","বিশ্ব সংবাদ","খেলা","বিনোদন","অর্থনীতি","টেক","শিক্ষা","স্বাস্থ্য","চাকরি","সোশ্যাল মিডিয়া","আইন-আদালত","প্রজন্ম","প্রবাস","ক্যাম্পাস","সাহিত্য","ধর্ম","ছবি","ভিডিও","ই-পেপার","English"];
 const subMenu=["সর্বশেষ","বিশেষ সংবাদ","জাতীয়","সারাদেশ","রাজনীতি","বিশ্ব সংবাদ","খেলা","বিনোদন","অর্থনীতি","লাইফস্টাইল","টেক","আইন-আদালত","ভিডিও","মতামত","অন্যান্য","Eng","menu"];
 const articleNav='<nav class="article-nav" aria-label="প্রধান মেনু">'+mainMenu.map((x,i)=>'<a href="../'+(i===0?'':'#latest')+'">'+esc(x)+'</a>').join('')+'</nav><nav class="article-subnav" aria-label="দ্বিতীয় মেনু">'+subMenu.map(x=>'<a href="../#latest">'+esc(x)+'</a>').join('')+'</nav>';
 const image=n.image?
 `<div class="photo-card">
 <img src="${/^https?:\/\//i.test(n.image)?esc(n.image):"../"+esc(n.image).replace(/^\/+/,"")}" alt="${esc(n.title)}">
 <div class="caption">${esc(n.caption||"ছবি: BD Barguna News")}</div>
 </div>`:"";

 const date=new Date(n.date);
 const dateText=Number.isNaN(date.getTime())?esc(n.date):
 date.toLocaleString("bn-BD",{dateStyle:"long",timeStyle:"short"});
 const canonical="https://mdsaimoon518-ship-it.github.io/BD-Barguna-News/articles/"+encodeURIComponent(n.slug)+".html";
 const description=String(n.body||n.title).replace(/\s+/g," ").trim().slice(0,160);
 const imageUrl=n.image?(/^https?:\/\//i.test(n.image)?n.image:"https://mdsaimoon518-ship-it.github.io/BD-Barguna-News/"+String(n.image).replace(/^\/+/, "")):"https://mdsaimoon518-ship-it.github.io/BD-Barguna-News/images/site-logo.svg";
 const publishedDate=Number.isNaN(date.getTime())?new Date().toISOString():date.toISOString();
 const modifiedDate=n.modifiedAt||publishedDate;
 const articleSchema=JSON.stringify({
  "@context":"https://schema.org",
  "@type":"NewsArticle",
  "mainEntityOfPage":{"@type":"WebPage","@id":canonical},
  "headline":n.title,
  "description":description,
  "image":[imageUrl],
  "datePublished":publishedDate,
  "dateModified":modifiedDate,
  "inLanguage":"bn-BD",
  "articleSection":n.category||"সংবাদ",
  "publisher":{"@type":"NewsMediaOrganization","name":"BD Barguna News","url":"https://mdsaimoon518-ship-it.github.io/BD-Barguna-News/","logo":{"@type":"ImageObject","url":"https://mdsaimoon518-ship-it.github.io/BD-Barguna-News/images/site-logo.svg"}}
 }).replace(/</g,"\\u003c");

 return `<!DOCTYPE html>
<html lang="bn">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="description" content="${esc(n.body.slice(0,150))}">
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1816426000436287" crossorigin="anonymous"><\/script>
<script src="https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js"><\/script>
<script src="https://www.gstatic.com/firebasejs/10.14.1/firebase-auth-compat.js"><\/script>
<script src="https://www.gstatic.com/firebasejs/10.14.1/firebase-database-compat.js"><\/script>
<title>${esc(n.title)} | BD Barguna News</title>
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="article">
<meta property="og:site_name" content="BD Barguna News">
<meta property="og:title" content="${esc(n.title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${esc(imageUrl)}">
<meta property="article:published_time" content="${publishedDate}">
<meta property="article:section" content="${esc(n.category)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(n.title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${esc(imageUrl)}">
<script type="application/ld+json">${articleSchema}</script>
<style>
*{box-sizing:border-box}
body{margin:0;padding:18px 10px;background:#eef1f5;color:#202936;font-family:Arial,sans-serif;line-height:1.9}
.paper{max-width:850px;margin:auto;background:white;padding:25px;border:1px solid #ddd;border-radius:12px;box-shadow:0 4px 20px #0001}
.masthead{display:flex;align-items:center;gap:14px;border-bottom:4px solid #b5122b;padding-bottom:15px}
.article-nav,.article-subnav{display:flex;gap:0;overflow-x:auto;white-space:nowrap;scrollbar-width:none;margin:12px -25px 0;padding:0 15px}
.article-nav{background:#a90e27;color:#fff}
.article-subnav{background:#f5f6f8;border-bottom:1px solid #e2e5eb;margin-top:0}
.article-nav a,.article-subnav a{display:block;padding:10px 12px;font-size:13px;font-weight:700;text-decoration:none}
.article-subnav a{color:#354052}
.article-nav a:hover{background:#79091c}.article-subnav a:hover{color:#a90e27}
.article-nav::-webkit-scrollbar,.article-subnav::-webkit-scrollbar{display:none}

.logo{width:65px;height:65px;object-fit:contain}
.brand{color:#b5122b;font-size:24px;font-weight:bold;margin:0}
.tagline{font-size:13px;color:#667085;margin:0}
.category{display:inline-block;background:#fff0f1;color:#b5122b;padding:5px 13px;border-radius:20px;margin-top:20px}
h1{font-size:30px;line-height:1.5}
.date{color:#667085;border-bottom:1px solid #ddd;padding-bottom:14px}
.photo-card{margin:22px 0;padding:10px;border:1px solid #ddd;border-radius:12px;background:#fafafa}
.photo-card img{display:block;width:100%;max-height:480px;object-fit:contain;border-radius:8px}
.caption{text-align:center;color:#667085;font-size:13px;padding-top:9px}
.article{white-space:pre-wrap;overflow-wrap:anywhere;text-align:justify;font-size:18px}
.footer{text-align:center;border-top:3px solid #b5122b;margin-top:30px;padding-top:14px;color:#667085}
.publisher-info{max-width:680px;margin:18px auto 0;padding:16px 12px 0;border-top:1px solid #ddd;line-height:1.7}
.publisher-info h2{margin:0 0 4px;color:#202936;font-size:21px}
.publisher-info p{margin:7px 0;font-size:14px}
.publisher-info a{color:#b5122b;font-weight:700}
@media(max-width:500px){.article-nav,.article-subnav{margin-left:-15px;margin-right:-15px}.article-nav a,.article-subnav a{padding:9px 10px;font-size:12px}}

.photo-card-preview{margin:24px 0;padding:14px;background:#f8fafc;border:1px solid #dbe2ea;border-radius:14px}.photo-card-preview h2{margin:0 0 12px;color:#b5122b;font-size:20px}.photo-card-preview img{display:block;width:100%;max-width:560px;margin:auto;border-radius:10px;box-shadow:0 5px 20px #0002}.photo-card-preview .preview-note{text-align:center;color:#64748b;font-size:13px;margin:8px 0 0}.youtube{background:#e62117}
.buttons{display:flex;gap:8px;flex-wrap:wrap;margin-top:20px}
button{padding:11px 18px;border:0;border-radius:6px;color:white;background:#087b42}
.facebook{background:#1877f2}.whatsapp{background:#128c4a}
@media(max-width:500px){.paper{padding:15px}h1{font-size:23px}.brand{font-size:20px}.article{font-size:16px}}
@media screen{.print-masthead{display:none!important}}
@page{size:A4 portrait;margin:8mm}
@media print{
 html,body{margin:0!important;padding:0!important;background:#fff!important;color:#111!important;font-family:"Noto Serif Bengali","Noto Sans Bengali",serif!important}
 .paper{width:100%!important;max-width:none!important;margin:0!important;padding:0!important;border:0!important;border-radius:0!important;box-shadow:none!important;background:#fff!important}
 .print-masthead{display:block!important;margin:0 0 3mm!important;padding:0 0 2mm!important;color:#111!important;break-inside:avoid!important}
 .print-topline{display:flex!important;justify-content:space-between!important;gap:6px!important;font-size:8pt!important;border-bottom:1px solid #333!important;padding-bottom:1.5mm!important}
 .print-brand{font-size:29pt!important;line-height:1.1!important;font-weight:900!important;color:#111!important;margin:1mm 0!important}
 .print-tagline{font-size:9pt!important;font-weight:700!important}
 .print-rule{height:3px!important;border-top:1px solid #111!important;border-bottom:1px solid #111!important;margin:1mm 0!important}
 .print-edition{display:flex!important;justify-content:space-between!important;font-size:7pt!important}
 .masthead,.article-nav,.article-subnav,.category,#articleViewCount,.photo-card-preview,section[style*="margin-top:28px"],.buttons,.home,.publisher-info{display:none!important}
 h1{font-size:21pt!important;line-height:1.2!important;font-weight:900!important;text-align:left!important;margin:2mm 0 1mm!important;color:#a20f25!important;column-span:all!important;break-after:avoid!important;border-bottom:1px solid #999!important;padding-bottom:2mm!important}
 .date{font-size:8pt!important;text-align:left!important;color:#333!important;border:0!important;padding:0 0 2mm!important;margin:0 0 2mm!important}
 .photo-card{float:left!important;width:38%!important;margin:1mm 3mm 2mm 0!important;padding:0!important;border:0!important;border-radius:0!important;background:#fff!important;break-inside:avoid!important}
 .photo-card img{width:100%!important;max-width:100%!important;height:auto!important;max-height:70mm!important;object-fit:contain!important;margin:0!important;border-radius:0!important}
 .caption{font-size:7pt!important;color:#333!important;padding:1mm 0!important;text-align:left!important}
 .article{font-size:9pt!important;line-height:1.38!important;text-align:justify!important;white-space:pre-wrap!important;overflow-wrap:anywhere!important;column-count:3!important;column-gap:4mm!important;column-rule:.25pt solid #bbb!important}
 .footer{font-size:8pt!important;border-top:2px solid #222!important;margin-top:4mm!important;padding-top:1.5mm!important;color:#222!important;break-inside:avoid!important}
 .footer>strong{font-size:12pt!important;color:#111!important}
 a{color:inherit!important;text-decoration:none!important}
}
</style>
</head>
<body>
<main class="paper">
<div class="print-masthead">
 <div class="print-topline"><span>জাতীয় অনলাইন সংবাদপত্র</span><span>বরগুনা • বাংলাদেশ</span><span class="print-date"></span></div>
 <div class="print-brand">বিডি বরগুনা নিউজ</div>
 <div class="print-tagline">সত্যের সন্ধানে, মানুষের পাশে।</div>
 <div class="print-rule"></div>
 <div class="print-edition"><span>BD BARGUNA NEWS</span><span>বিশেষ সংবাদ সংস্করণ</span><span>বরগুনা</span></div>
</div>
<header class="masthead">
<img class="logo" src="../images/app-icon.svg" alt="BD Barguna News Logo">
<div>
<p class="brand">BD Barguna News</p>
<p class="tagline">সত্যের সন্ধানে, মানুষের পাশে।</p>
</div>
</header>
${articleNav}
<div class="category">${esc(n.category)}</div>
<h1>${esc(n.title)}</h1>
<div class="date">📅 প্রকাশিত: ${dateText}</div>
<div id="articleViewCount" class="date" aria-live="polite">👁️ পাঠসংখ্যা লোড হচ্ছে...</div>
${image}
<section class="photo-card-preview" id="photoCardPreview"><h2>সংবাদের ফটোকার্ড</h2><img id="newsPhotoCardPreview" alt="BD Barguna News ফটোকার্ড প্রিভিউ" loading="lazy"><p class="preview-note">লোগো ও প্রকাশের তারিখসহ শেয়ারযোগ্য ফটোকার্ড</p></section>
<div class="article">${esc(n.body)}</div>
<section style="margin-top:28px;padding-top:18px;border-top:1px solid #ddd"><h2 style="color:#b5122b;font-size:21px">পাঠকের মন্তব্য</h2><iframe id="articleComments" title="পাঠকের মন্তব্য" width="100%" height="420" style="border:0;background:#fff" loading="lazy"></iframe></section>
<footer class="footer">
<strong>BD Barguna News</strong><br>
সত্যের সন্ধানে, মানুষের পাশে।
<div class="publisher-info">
<h2>মোঃ সাইমুন মিয়া</h2>
<strong>প্রকাশক ও সম্পাদক</strong> · BD Barguna News
<p>বরগুনা ও বাংলাদেশের স্থানীয়, জাতীয় এবং গুরুত্বপূর্ণ খবর পাঠকের কাছে তুলে ধরাই আমাদের লক্ষ্য। তথ্যভিত্তিক, স্পষ্ট ও পাঠকবান্ধব সংবাদ প্রকাশে আমরা কাজ করি।</p>
<p>অফিস: শের-ই বাংলা সড়ক, বরগুনা</p>
<p>মোবাইল: <a href="tel:+8801609320308">০১৬০৯৩২০৩০৮</a></p>
<p>ইমেইল: <a href="mailto:mdsaimoon518@gmail.com">mdsaimoon518@gmail.com</a></p>
</div>
</footer>
<div class="buttons">
<button onclick="downloadNewsPhotoCard()">🖼️ ফটোকার্ড ডাউনলোড</button>
<button class="gray" onclick="printNewsPhotoCard()">🖨️ ফটোকার্ড প্রিন্ট</button>
<button class="gray" onclick="copyNewsPhotoCard()">📋 ফটোকার্ড কপি</button>
<button onclick="window.print()">🖨️ সংবাদ প্রিন্ট</button>
<button class="gray" onclick="copyArticleText()">📋 নিউজ কপি</button>
<button class="gray" onclick="copyArticleLink()">🔗 লিংক কপি</button>
<button class="facebook" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(location.href),'_blank','noopener')">Facebook শেয়ার</button>
<button class="whatsapp" onclick="window.open('https://wa.me/?text='+encodeURIComponent(document.title+' '+location.href),'_blank','noopener')">WhatsApp শেয়ার</button>
<button class="youtube" onclick="shareToYouTube()">▶ YouTube-এ শেয়ার</button>
</div>
<p class="home"><a href="../">প্রচ্ছদে ফিরে যান</a></p>
</main>
<script>
document.addEventListener('DOMContentLoaded',function(){const d=document.querySelector('.date:not(#articleViewCount)');const out=document.querySelector('.print-date');if(out)out.textContent=d?d.textContent.replace(/^📅\s*প্রকাশিত:\s*/,''):'';});
window.buildNewsPhotoCard=async function(){
 const canvas=document.createElement('canvas');canvas.width=1200;canvas.height=1200;
 const ctx=canvas.getContext('2d');if(!ctx)throw new Error('ফটোকার্ড তৈরি করা যাচ্ছে না।');
 const title=(document.querySelector('h1')?.textContent||document.title).trim();
 const category=(document.querySelector('.cat,.category')?.textContent||'সর্বশেষ সংবাদ').trim();
 const detail=(document.querySelector('.article')?.textContent||'').replace(/\s+/g,' ').trim().slice(0,145);
 const dateRaw=document.querySelector('meta[property="article:published_time"]')?.content||document.querySelector('.date')?.textContent||new Date().toISOString();
 const parsed=new Date(dateRaw),safeDate=isNaN(parsed.getTime())?new Date():parsed;
 const dateText=new Intl.DateTimeFormat('bn-BD',{day:'numeric',month:'long',year:'numeric',timeZone:'Asia/Dhaka'}).format(safeDate);
 const dayText=new Intl.DateTimeFormat('bn-BD',{weekday:'long',timeZone:'Asia/Dhaka'}).format(safeDate);
 const photoEl=document.querySelector('#newsImage,.photo-card img,.article-image,figure img,.photo img');
 const rawPhotoUrl=photoEl?.getAttribute('src')||photoEl?.currentSrc||photoEl?.src||'';
 const photoUrl=rawPhotoUrl?new URL(rawPhotoUrl,document.baseURI).href:'';
 const logoUrl=new URL('../images/app-icon.svg',location.href).href;
 const loadImage=src=>new Promise(resolve=>{if(!src)return resolve(null);const im=new Image();try{if(new URL(src,location.href).origin!==location.origin)im.crossOrigin='anonymous';}catch(e){}im.onload=()=>resolve(im);im.onerror=()=>resolve(null);im.src=src;});
 const [photo,logo]=await Promise.all([loadImage(photoUrl),loadImage(logoUrl)]);
 const rr=(x,y,w,h,r)=>{ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath();};
 const bg=ctx.createLinearGradient(0,0,1200,1200);bg.addColorStop(0,'#071a2e');bg.addColorStop(.52,'#163653');bg.addColorStop(1,'#35172a');ctx.fillStyle=bg;ctx.fillRect(0,0,1200,1200);ctx.strokeStyle='rgba(255,255,255,.16)';ctx.lineWidth=3;rr(24,24,1152,1152,34);ctx.stroke();ctx.fillStyle='#d6a84f';ctx.fillRect(48,18,1104,7);
 ctx.fillStyle='#c51b36';ctx.fillRect(0,0,1200,18);ctx.fillStyle='rgba(255,255,255,.06)';ctx.beginPath();ctx.arc(1110,105,190,0,Math.PI*2);ctx.fill();
 if(logo){ctx.save();rr(58,48,92,92,22);ctx.fillStyle='#fff';ctx.fill();ctx.clip();const sc=Math.min(78/logo.naturalWidth,78/logo.naturalHeight);ctx.drawImage(logo,104-logo.naturalWidth*sc/2,94-logo.naturalHeight*sc/2,logo.naturalWidth*sc,logo.naturalHeight*sc);ctx.restore();}
 ctx.fillStyle='#fff';ctx.font='bold 34px Arial';ctx.fillText('BD BARGUNA NEWS',174,88);ctx.fillStyle='#cbd5e1';ctx.font='23px Arial';ctx.fillText('সত্যের সন্ধানে, মানুষের পাশে।',174,126);
 ctx.fillStyle='#f8fafc';ctx.font='bold 19px Arial';ctx.textAlign='right';ctx.fillText('NEWS • বরগুনা',1138,95);ctx.textAlign='left';ctx.save();rr(805,112,333,42,18);ctx.fillStyle='rgba(255,255,255,.14)';ctx.fill();ctx.fillStyle='#f5d58a';ctx.font='bold 19px "Noto Sans Bengali",Arial';ctx.textAlign='center';ctx.fillText('প্রকাশ: '+dateText,971,141);ctx.textAlign='left';ctx.restore();
 ctx.save();rr(48,170,1104,535,28);ctx.clip();
 if(photo){ctx.fillStyle='#172b40';ctx.fillRect(48,170,1104,535);const scale=Math.min(1104/photo.naturalWidth,535/photo.naturalHeight),dw=photo.naturalWidth*scale,dh=photo.naturalHeight*scale;ctx.drawImage(photo,48+(1104-dw)/2,170+(535-dh)/2,dw,dh);}
 else{const pg=ctx.createLinearGradient(48,170,1152,705);pg.addColorStop(0,'#334b6c');pg.addColorStop(1,'#0f172a');ctx.fillStyle=pg;ctx.fillRect(48,170,1104,535);ctx.fillStyle='rgba(255,255,255,.14)';ctx.font='bold 64px Arial';ctx.fillText('BD BARGUNA NEWS',100,440);}
 const shade=ctx.createLinearGradient(0,430,0,705);shade.addColorStop(0,'rgba(5,12,24,0)');shade.addColorStop(1,'rgba(5,12,24,.82)');ctx.fillStyle=shade;ctx.fillRect(48,420,1104,285);
 ctx.fillStyle='#fff';ctx.font='bold 24px Arial';ctx.fillText('সত্যের খবর, সবার আগে',82,665);ctx.restore();
 ctx.save();rr(48,675,1104,390,26);ctx.fillStyle='#fff';ctx.fill();ctx.restore();
 ctx.fillStyle='#c51b36';rr(82,710,250,52,16);ctx.fill();ctx.fillStyle='#fff';ctx.font='bold 23px "Noto Sans Bengali",Arial';ctx.fillText(category.slice(0,18),104,745);
 ctx.fillStyle='#64748b';ctx.font='bold 22px "Noto Sans Bengali",Arial';ctx.textAlign='right';ctx.fillText(dayText,1115,745);ctx.textAlign='left';
 const wrap=(text,maxWidth,font,maxLines)=>{ctx.font=font;const words=text.split(/\s+/),lines=[];let line='';for(const word of words){const next=line?line+' '+word:word;if(ctx.measureText(next).width>maxWidth&&line){lines.push(line);line=word;}else line=next;}if(line)lines.push(line);if(lines.length>maxLines){lines.length=maxLines;let last=lines[maxLines-1];while(last.length&&ctx.measureText(last+'…').width>maxWidth)last=last.slice(0,-1);lines[maxLines-1]=last+'…';}return lines;};
 const titleLines=wrap(title,1025,'bold 48px "Noto Sans Bengali",Arial',3);
 ctx.fillStyle='#111827';ctx.font='bold 48px "Noto Sans Bengali",Arial';let y=805;titleLines.forEach(line=>{ctx.fillText(line,82,y);y+=62;});
 
 ctx.fillStyle='#e2e8f0';ctx.fillRect(82,1000,1036,2);ctx.fillStyle='#d6a84f';ctx.fillRect(82,1000,1036,4);
 ctx.fillStyle='#f8fafc';ctx.font='bold 21px Arial';ctx.fillText('BD BARGUNA NEWS',82,1035);ctx.textAlign='right';ctx.fillStyle='#f5d58a';ctx.font='bold 20px "Noto Sans Bengali",Arial';ctx.fillText('📅 '+dateText,1118,1035);ctx.textAlign='left';
 return canvas;
};
window.downloadNewsPhotoCard=async function(){
 try{const canvas=await window.buildNewsPhotoCard();canvas.toBlob(blob=>{if(!blob){alert('ফটোকার্ড তৈরি হয়নি।');return;}const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='bd-barguna-news-photo-card.png';a.click();setTimeout(()=>URL.revokeObjectURL(url),3000);},'image/png');}
 catch(e){alert(e.message||'ফটোকার্ড তৈরি করা যায়নি।');}
};
window.printNewsPhotoCard=async function(){
 try{const canvas=await window.buildNewsPhotoCard(),url=canvas.toDataURL('image/png'),w=window.open('','_blank');if(!w){alert('প্রিন্টের জন্য নতুন উইন্ডো খুলতে অনুমতি দিন।');return;}w.document.write('<!doctype html><html><head><title>BD Barguna News Photo Card</title><style>body{margin:0;display:grid;place-items:center;min-height:100vh}img{width:min(100vw,100vh);height:auto}@media print{img{width:100%;max-height:100vh;object-fit:contain}}</style></head><body><img src="'+url+'" onload="setTimeout(()=>window.print(),300)"></body></html>');w.document.close();}
 catch(e){alert(e.message||'প্রিন্ট করা যায়নি।');}
};
window.copyNewsPhotoCard=async function(){
 try{const canvas=await window.buildNewsPhotoCard();const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/png'));if(!blob)throw new Error('ছবি তৈরি করা যায়নি।');if(!navigator.clipboard||!window.ClipboardItem)throw new Error('এই ব্রাউজারে ছবি কপি সুবিধা নেই—ডাউনলোড বাটন ব্যবহার করুন।');await navigator.clipboard.write([new ClipboardItem({'image/png':blob})]);alert('ফটোকার্ড কপি হয়েছে। এখন Facebook পোস্টে পেস্ট করতে পারবেন।');}
 catch(e){alert(e.message||'ফটোকার্ড কপি করা যায়নি।');}
};
window.copyArticleText=async function(){
 const title=(document.querySelector('h1')?.textContent||document.title).trim();
 const category=(document.querySelector('.category')?.textContent||'').trim();
 const date=(document.querySelector('.date')?.textContent||'').trim();
 const body=(document.querySelector('.article')?.textContent||'').trim();
 const text=[title,category,date,body,'সংবাদের লিংক: '+location.href].filter(Boolean).join('\\n\\n');
 try{
  if(navigator.clipboard&&window.isSecureContext)await navigator.clipboard.writeText(text);
  else{
   const field=document.createElement('textarea');field.value=text;field.style.position='fixed';field.style.opacity='0';
   document.body.appendChild(field);field.focus();field.select();
   const ok=document.execCommand('copy');field.remove();if(!ok)throw new Error('কপি করা যায়নি');
  }
  alert('সম্পূর্ণ সংবাদ কপি হয়েছে।');
 }catch(e){window.prompt('সংবাদটি কপি করুন:',text);}
};
window.copyArticleLink=async function(){
 const text=location.href;
 try{
  if(navigator.clipboard && window.isSecureContext){
   await navigator.clipboard.writeText(text);
  }else{
   const field=document.createElement("textarea");
   field.value=text;
   field.style.position="fixed";
   field.style.opacity="0";
   document.body.appendChild(field);
   field.focus();
   field.select();
   const ok=document.execCommand("copy");
   field.remove();
   if(!ok)throw new Error("কপি করা যায়নি");
  }
  alert("সংবাদের লিংক কপি হয়েছে");
 }catch(e){window.prompt("এই লিংকটি কপি করুন:",text);}
};
window.shareToYouTube=async function(){
 const link=location.href;
 try{if(navigator.clipboard&&window.isSecureContext)await navigator.clipboard.writeText(link);else{const field=document.createElement('textarea');field.value=link;field.style.position='fixed';field.style.opacity='0';document.body.appendChild(field);field.select();document.execCommand('copy');field.remove();}alert('সংবাদের লিংক কপি হয়েছে। YouTube খুলছে—আপনার পোস্ট বা বিবরণে লিংকটি পেস্ট করুন।');}catch(e){window.prompt('YouTube-এ শেয়ার করতে এই লিংকটি কপি করুন:',link);}
 window.open('https://www.youtube.com/','_blank','noopener');
};
window.addEventListener('load',async function(){const preview=document.getElementById('newsPhotoCardPreview');if(!preview||!window.buildNewsPhotoCard)return;try{const canvas=await window.buildNewsPhotoCard();preview.src=canvas.toDataURL('image/png');preview.dataset.ready='true';}catch(e){preview.removeAttribute('src');preview.alt='ফটোকার্ড তৈরি হয়নি: '+(e.message||'ছবি লোড করা যায়নি');const note=preview.parentElement?.querySelector('.preview-note');if(note)note.textContent='ফটোকার্ড তৈরি হয়নি। ছবির URL পরীক্ষা করে আবার চেষ্টা করুন।';console.error('BD Barguna photo card error:',e);}});
(function(){
const config={apiKey:"AIzaSyAmAyhVJfCRs4AzW_Hs-MxI5ydJzvxRE74",authDomain:"bd-barguna-news.firebaseapp.com",databaseURL:"https://bd-barguna-news-default-rtdb.firebaseio.com",projectId:"bd-barguna-news",storageBucket:"bd-barguna-news.firebasestorage.app",messagingSenderId:"468693004369",appId:"1:468693004369:web:e07e7bb422ec286a53c870"};
if(!firebase.apps.length)firebase.initializeApp(config);
const count=document.getElementById("articleViewCount");
firebase.auth().signInAnonymously().then(()=>firebase.database().ref("articleViews/${esc(n.slug)}").transaction(v=>(Number(v)||0)+1)).then(()=>firebase.database().ref("articleViews/${esc(n.slug)}").once("value")).then(s=>{count.textContent="👁️ মোট পাঠ: "+String(s.val()||0).replace(/[0-9]/g,d=>"০১২৩৪৫৬৭৮৯"[Number(d)]);}).catch(()=>{count.textContent="👁️ ভিউ তথ্য এখন পাওয়া যাচ্ছে না";});
document.getElementById("articleComments").src="https://www.facebook.com/plugins/comments.php?href="+encodeURIComponent(location.href)+"&width=100%25&numposts=10&order_by=reverse_time";
})();
<\/script>
</body>
</html>`;
};
