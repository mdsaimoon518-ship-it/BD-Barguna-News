// Article-page HTML template used by the admin publisher.
window.articleTemplateVersion="20261114photo-copy3";
window.articleHTML = function articleHTML(n){
 const mainMenu=["হোম","আজকের সর্বশেষ খবর","বিশেষ সংবাদ","করোনাভাইরাস","সম্পাদকীয়","জাতীয়","রাজধানী","সারাদেশ","রাজনীতি","বিশ্ব সংবাদ","খেলা","বিনোদন","অর্থনীতি","টেক","শিক্ষা","স্বাস্থ্য","চাকরি","সোশ্যাল মিডিয়া","আইন-আদালত","প্রজন্ম","প্রবাস","ক্যাম্পাস","সাহিত্য","ধর্ম","ছবি","ভিডিও","ই-পেপার","English"];
 const subMenu=["সর্বশেষ","বিশেষ সংবাদ","জাতীয়","সারাদেশ","রাজনীতি","বিশ্ব সংবাদ","খেলা","বিনোদন","অর্থনীতি","লাইফস্টাইল","টেক","আইন-আদালত","ভিডিও","মতামত","অন্যান্য","Eng","menu"];
 const articleNav='<nav class="article-nav" aria-label="প্রধান মেনু">'+mainMenu.map((x,i)=>'<a href="../'+(i===0?'':'#latest')+'">'+esc(x)+'</a>').join('')+'</nav>';
 const imageEntries=(Array.isArray(n.images)?n.images:[]).map((item,i)=>({
  url:typeof item==="string"?item:(item&&item.url)||"",
  caption:(Array.isArray(n.imageCaptions)?n.imageCaptions[i]:"")||(item&&item.caption)||(i===0?n.caption:"")||""
 })).filter(item=>item.url);
 if(n.image&&!imageEntries.some(item=>item.url===n.image))imageEntries.unshift({url:n.image,caption:n.caption||""});
 imageEntries.splice(3); // প্রতিটি নিউজে সর্বোচ্চ ৩টি ছবি দেখান
 const imageUrls=imageEntries.map(item=>/^https?:\/\//i.test(item.url)?item.url:"https://mdsaimoon518-ship-it.github.io/BD-Barguna-News/"+String(item.url).replace(/^\/+/, ""));
 const image=imageEntries.length?`<div class="photo-gallery" aria-label="সংবাদের ছবির গ্যালারি">${imageEntries.map((item,i)=>`<figure class="photo-card"><img src="${/^https?:\/\//i.test(item.url)?esc(item.url):"../"+esc(item.url).replace(/^\/+/, "")}" alt="${esc(n.title)} - ছবি ${i+1}" loading="lazy"><figcaption class="caption">${esc(item.caption||"ছবি: BD Barguna News")}</figcaption></figure>`).join("")}</div>`:"";

 const date=new Date(n.date);
 const dateText=Number.isNaN(date.getTime())?esc(n.date):
 date.toLocaleString("bn-BD",{dateStyle:"long",timeStyle:"short"});
 const canonical="https://mdsaimoon518-ship-it.github.io/BD-Barguna-News/articles/"+encodeURIComponent(n.slug)+".html";
 const description=String(n.body||n.title).replace(/\s+/g," ").trim().slice(0,160);
 const imageUrl=imageUrls[0]||"https://mdsaimoon518-ship-it.github.io/BD-Barguna-News/images/site-logo.svg";
 const publishedDate=Number.isNaN(date.getTime())?new Date().toISOString():date.toISOString();
 const modifiedDate=n.modifiedAt||publishedDate;
 const articleSchema=JSON.stringify({
  "@context":"https://schema.org",
  "@type":"NewsArticle",
  "mainEntityOfPage":{"@type":"WebPage","@id":canonical},
  "headline":n.title,
  "description":description,
  "image":imageUrls.length?imageUrls:[imageUrl],
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
<script src="https://cdnjs.cloudflare.com/ajax/libs/qrcode/1.5.3/qrcode.min.js"><\/script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"><\/script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"><\/script>
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
.category{display:inline-block;background:transparent;color:#a90e27;padding:5px 0;border-radius:0;margin-top:20px;font-size:14px;font-weight:800;letter-spacing:.2px;border-bottom:2px solid #a90e27}
h1{font-family:"Noto Serif Bengali","Noto Serif",serif;font-size:38px;line-height:1.48;font-weight:900;color:#111;text-align:center;margin:16px 0 18px;padding:4px 12px 20px;border-top:3px double #222;border-bottom:3px double #222}
.date{color:#666;border-bottom:1px solid #ddd;padding-bottom:14px;font-size:14px}

.photo-gallery{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin:18px 0;width:100%;align-items:start}
.photo-card{min-width:0;overflow:hidden;margin:0;padding:7px;border:1px solid #ddd;border-radius:10px;background:#fafafa}
.photo-card img{display:block;width:100%;height:180px;max-height:180px;object-fit:cover;border-radius:7px}
.photo-card .caption{font-size:12px;line-height:1.4;overflow-wrap:anywhere}
.caption{text-align:center;color:#667085;font-size:13px;padding-top:9px}
.article{white-space:pre-wrap;overflow-wrap:anywhere;text-align:justify;text-justify:inter-word;font-family:"Noto Serif Bengali","Noto Serif",serif;font-size:18px;line-height:1.9;letter-spacing:0;color:#202020;margin-top:22px;column-count:2;column-gap:30px;column-rule:1px solid #d5d5d5}
.article::first-letter{font-size:1.12em;font-weight:700}
.footer{text-align:center;border-top:3px solid #b5122b;margin-top:30px;padding-top:14px;color:#667085}
.publisher-info{max-width:680px;margin:18px auto 0;padding:16px 12px 0;border-top:1px solid #ddd;line-height:1.7}
.publisher-info h2{margin:0 0 4px;color:#202936;font-size:21px}
.publisher-info p{margin:7px 0;font-size:14px}
.publisher-info a{color:#b5122b;font-weight:700}
@media(max-width:500px){.article-nav,.article-subnav{margin-left:-15px;margin-right:-15px}.article-nav a,.article-subnav a{padding:9px 10px;font-size:12px}}

.photo-card-preview{margin:24px 0;padding:14px;background:#f8fafc;border:1px solid #dbe2ea;border-radius:14px}.photo-card-preview h2{margin:0 0 12px;color:#b5122b;font-size:20px}.photo-card-preview img{display:block;width:100%;max-width:560px;margin:auto;border-radius:10px;box-shadow:0 5px 20px #0002}.photo-card-preview .preview-note{text-align:center;color:#64748b;font-size:13px;margin:8px 0 0}.youtube{background:#e62117}
.bd-article-actions{margin:28px 0 18px;padding:18px 0;border-top:2px solid #a30d25;border-bottom:1px solid #ddd}
.bd-article-actions h2{font-family:"Noto Serif Bengali","Noto Sans Bengali",serif;font-size:20px;margin:0 0 12px;color:#222}
.buttons{display:flex;gap:9px;flex-wrap:wrap;margin-top:10px}
.buttons button{min-height:42px;padding:10px 15px;border:1px solid #ddd;border-radius:4px;background:#f4f4f4;color:#222;font-weight:700;cursor:pointer}
.buttons button.facebook{background:#1877f2;color:#fff;border-color:#1877f2}
.buttons button.whatsapp{background:#128c4a;color:#fff;border-color:#128c4a}
.buttons button:hover{filter:brightness(.95)}
button{padding:11px 18px;border:0;border-radius:6px;color:white;background:#087b42}
.facebook{background:#1877f2}.whatsapp{background:#128c4a}
@media(max-width:650px){.paper{padding:15px}h1{font-size:27px;line-height:1.55;padding:4px 4px 14px}.brand{font-size:20px}.article{font-size:17px;line-height:1.9;column-count:1;column-gap:0;column-rule:0}}
@media print{body{background:white;padding:0}.paper{box-shadow:none;border:0;padding:0}.buttons,.home{display:none!important}}
</style>
<style id="bd-fullscreen-clean-top">
/* Remove all content above the news category and use the full screen */
.print-masthead,.masthead,.article-nav,.article-subnav{display:none!important}
html,body{width:100%!important;min-height:100%!important;margin:0!important;padding:0!important}
body{background:#fff!important}
.paper{display:block!important;width:100%!important;max-width:none!important;min-height:100vh!important;margin:0!important;padding:18px clamp(14px,3vw,42px)!important;border:0!important;border-radius:0!important;box-shadow:none!important;background:#fff!important}
.category{margin-top:0!important}
@media(max-width:650px){.paper{padding:12px 14px!important}}
</style>
<style id="bd-reference-news-layout">
/* Clean online-news article layout inspired by the supplied reference */
.paper{max-width:100%!important;width:100%!important;margin:0!important;border:0!important;border-radius:0!important;box-shadow:none!important;padding:0 clamp(14px,3.2vw,48px)!important;background:#fff!important}
body{background:#fff!important;padding:0!important}
.print-masthead{display:none!important}
.masthead{display:flex!important;align-items:center!important;gap:12px!important;padding:12px 0!important;border-bottom:1px solid #ddd!important;border-top:0!important}
.masthead .logo,.masthead .logo-mark{width:46px!important;height:46px!important;flex:0 0 46px!important}
.masthead .brand{font-size:23px!important;color:#a30d25!important;font-weight:900!important;margin:0!important}
.masthead .tagline{font-size:12px!important;color:#555!important;margin:0!important}
.article-nav{display:flex!important;overflow-x:auto!important;white-space:nowrap!important;gap:0!important;margin:0!important;padding:0!important;border-radius:0!important}
.article-nav{background:#a30d25!important;color:#fff!important}

.article-nav a{color:#fff!important;padding:11px 13px!important;font-size:14px!important}

.category{display:block!important;margin:20px 0 8px!important;padding:0 0 8px!important;border:0!important;background:none!important;color:#a30d25!important;font-size:14px!important;font-weight:800!important}
h1{font-family:"Noto Serif Bengali","Noto Sans Bengali",serif!important;text-align:left!important;font-size:clamp(27px,3.4vw,40px)!important;line-height:1.48!important;margin:8px 0 14px!important;padding:0 0 14px!important;border:0!important;border-bottom:1px solid #ddd!important;color:#171717!important}
.date{font-size:13px!important;color:#666!important;border:0!important;padding:0!important;margin:6px 0!important}
.bd-story-tools{display:flex;flex-wrap:wrap;align-items:center;gap:8px 14px;padding:12px 0;margin:8px 0 16px;border-top:1px solid #eee;border-bottom:1px solid #eee;color:#555;font:13px Arial,sans-serif}
.bd-story-tools .byline{font-weight:700;color:#333}
.bd-story-tools button,.bd-story-tools a{border:0;background:#f1f2f4;color:#333;padding:7px 10px;border-radius:3px;text-decoration:none;font-size:13px;cursor:pointer}
.bd-story-tools button:hover,.bd-story-tools a:hover{background:#e3e5e8}
.bd-breadcrumb{font-size:13px;color:#777;padding:14px 0 0}
.bd-breadcrumb a{color:#a30d25;text-decoration:none}
.photo-card{margin:14px 0 20px!important;padding:0!important;border:0!important;border-radius:0!important;background:#fff!important}
.photo-card img{width:100%!important;max-height:650px!important;object-fit:contain!important;border-radius:0!important}
.caption{text-align:left!important;color:#777!important;font-size:12px!important}
.article{font-family:"Noto Serif Bengali","Noto Sans Bengali",serif!important;font-size:19px!important;line-height:2!important;color:#222!important;text-align:justify!important;column-count:1!important;column-rule:0!important;max-width:1000px!important;margin:20px 0!important}
.photo-card-preview{margin:24px 0!important;border-radius:0!important}
.footer{border-top:1px solid #ddd!important;text-align:left!important}
@media(max-width:650px){.paper{padding:0 14px!important}.masthead .brand{font-size:19px!important}.article-nav a{padding:10px!important;font-size:12px!important}.article{font-size:17px!important;line-height:1.95!important}h1{font-size:26px!important}}
@media print{.masthead,.article-nav,.bd-breadcrumb,.bd-story-tools,.buttons,.home{display:none!important}.paper{padding:0!important}.article{font-size:12pt!important}}
</style>
<style id="bd-print-three-photo-layout">
@media print{
.photo-card-preview,#photoCardPreview{display:none!important}
.photo-gallery{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:4mm!important;width:100%!important;margin:2mm 0 3mm!important;break-inside:avoid!important;page-break-inside:avoid!important}
.photo-gallery .photo-card{float:none!important;display:block!important;width:auto!important;min-width:0!important;margin:0!important;padding:1.5mm!important;border:1px solid #888!important;background:#fff!important;break-inside:avoid!important;page-break-inside:avoid!important}
.photo-gallery .photo-card img{display:block!important;width:100%!important;height:42mm!important;max-height:42mm!important;object-fit:contain!important;margin:0 auto!important}
.photo-gallery .caption{display:block!important;text-align:center!important;font-size:8.5pt!important;line-height:1.35!important;padding:1.5mm 0 0!important;color:#111!important;font-weight:700!important}
}
</style>
<style id="bd-one-page-news-print">
@page{size:A4 portrait;margin:7mm}
@media print{
html,body{width:100%!important;margin:0!important;padding:0!important;background:#fff!important}
.print-masthead{display:block!important;visibility:visible!important;margin:0 0 3mm!important;padding:0 0 2mm!important}
.print-topline{display:flex!important;justify-content:space-between!important;font-size:7pt!important;color:#333!important}
.print-brand{display:flex!important;align-items:center!important;gap:3mm!important;font-size:18pt!important;font-weight:900!important;color:#a30d25!important}
.print-logo{display:block!important;width:14mm!important;height:14mm!important;object-fit:contain!important}
.print-tagline{font-size:9pt!important;color:#333!important}
.print-rule{height:1mm!important;background:#a30d25!important;margin:2mm 0!important}
.print-edition{display:flex!important;justify-content:space-between!important;font-size:7pt!important}
.masthead,.article-nav,.bd-breadcrumb,.bd-story-tools,.buttons,.home,.photo-card-preview,#photoCardPreview,.article-qr,#articleViewCount,.bd-article-actions,iframe{display:none!important}
.paper{display:block!important;width:100%!important;max-width:none!important;min-height:0!important;margin:0!important;padding:0!important;border:0!important;border-radius:0!important;box-shadow:none!important;overflow:visible!important;zoom:var(--bd-print-zoom,1)!important}
.category{margin:1mm 0!important;padding:0!important;font-size:8pt!important}
h1{font-size:17pt!important;line-height:1.25!important;margin:1mm 0 2mm!important;padding:0 0 2mm!important;border-bottom:1px solid #999!important}
.date{font-size:7.5pt!important;margin:1mm 0!important;padding:0!important}
.photo-gallery{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:2mm!important;margin:2mm 0!important;break-inside:avoid!important}
.photo-gallery .photo-card{margin:0!important;padding:1mm!important;border:1px solid #aaa!important;break-inside:avoid!important}
.photo-gallery .photo-card img{width:100%!important;height:27mm!important;max-height:27mm!important;object-fit:contain!important}
.photo-gallery .caption{display:block!important;font-size:6.5pt!important;line-height:1.2!important;padding:1mm 0 0!important;color:#111!important}
.article{font-size:9.2pt!important;line-height:1.4!important;column-count:2!important;column-gap:5mm!important;column-rule:0.2mm solid #ddd!important;margin:2mm 0!important;white-space:pre-wrap!important}
.footer{font-size:7pt!important;margin-top:2mm!important;padding-top:1mm!important}
}
</style>
<script id="bd-story-toolbar-script">
document.addEventListener('DOMContentLoaded',function(){
 const paper=document.querySelector('.paper');if(!paper||paper.querySelector('.bd-story-tools'))return;
 const cat=document.querySelector('.category'),title=document.querySelector('h1'),date=document.querySelector('.date:not(#articleViewCount)'),body=document.querySelector('.article');
 if(!title)return;
 if(cat&&!paper.querySelector('.bd-breadcrumb')){const crumb=document.createElement('div');crumb.className='bd-breadcrumb';crumb.innerHTML='<a href="../">প্রচ্ছদ</a>　›　'+cat.textContent.trim();cat.parentNode.insertBefore(crumb,cat);}
 const tools=document.createElement('div');tools.className='bd-story-tools';
 tools.innerHTML='<span class="byline">BD Barguna News প্রতিবেদক</span><span class="published"></span><button type="button" class="font-down" aria-label="লেখা ছোট করুন">অ−</button><button type="button" class="font-up" aria-label="লেখা বড় করুন">অ＋</button><a href="#" class="print-link">প্রিন্ট সংস্করণ</a><a href="#photoCardPreview" class="photo-link">ফটো কার্ড</a>';
 tools.querySelector('.published').textContent=date?date.textContent.replace(/^📅\s*/,''):'';
 if(date)date.insertAdjacentElement('afterend',tools);else title.insertAdjacentElement('afterend',tools);
 let size=body?parseFloat(getComputedStyle(body).fontSize)||19:19;
 tools.querySelector('.font-down').addEventListener('click',()=>{size=Math.max(14,size-1);if(body)body.style.fontSize=size+'px';});
 tools.querySelector('.font-up').addEventListener('click',()=>{size=Math.min(30,size+1);if(body)body.style.fontSize=size+'px';});
 tools.querySelector('.print-link').addEventListener('click',e=>{e.preventDefault();window.print();});
});
</script>
</head>
<body>
<main class="paper">
<div class="print-masthead"><div class="print-topline"><span>জাতীয় অনলাইন সংবাদপত্র</span><span>বরগুনা • বাংলাদেশ</span><span>${dateText}</span></div><div class="print-brand"><img class="print-logo" src="../images/site-logo.svg" alt="BD Barguna News">BD BARGUNA NEWS</div><div class="print-tagline">সত্যের সন্ধানে, মানুষের পাশে।</div><div class="print-rule"></div><div class="print-edition"><span>BD BARGUNA NEWS</span><span>বিশেষ সংবাদ সংস্করণ</span><span>বরগুনা</span></div></div>
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
<section class="photo-card-preview" id="photoCardPreview"><h2>সংবাদের ফটোকার্ড</h2><img id="newsPhotoCardPreview" alt="BD Barguna News ফটোকার্ড প্রিভিউ" loading="lazy"><p class="preview-note">লোগো, প্রকাশের তারিখ ও এই নিউজের নিজস্ব QR স্ক্যানারসহ ফটোকার্ড</p></section>
<section class="article-qr" aria-label="সংবাদের QR কোড"><img id="articleQrImage" alt="সংবাদের QR কোড"></section>
<div class="article">${esc(n.body)}</div>
<section style="margin-top:28px;padding-top:18px;border-top:1px solid #ddd"><h2 style="color:#b5122b;font-size:21px">পাঠকের মন্তব্য</h2><iframe id="articleComments" title="পাঠকের মন্তব্য" width="100%" height="420" style="border:0;background:#fff" loading="lazy"></iframe></section>
<footer class="footer">
<strong>BD Barguna News</strong><br>
সত্যের সন্ধানে, মানুষের পাশে।

</footer>
<section class="bd-article-actions" aria-label="সংবাদ ব্যবহার ও শেয়ার">
<h2>সংবাদটি সংরক্ষণ ও শেয়ার করুন</h2>
<div class="buttons">
<button type="button" onclick="downloadNewsPhotoCard()">🖼️ ফটোকার্ড ডাউনলোড</button>
<button type="button" onclick="copyArticleText()">📋 সম্পূর্ণ নিউজ কপি</button>
<button type="button" onclick="window.print()">🖨️ নিউজ প্রিন্ট</button>
<button type="button" onclick="downloadNewsPDF()">📄 PDF ডাউনলোড</button>
<button type="button" class="gray" onclick="copyArticleLink()">🔗 কপি লিংক</button>
<button type="button" class="facebook" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(location.href),'_blank','noopener')">Facebook শেয়ার</button>
<button type="button" class="whatsapp" onclick="window.open('https://wa.me/?text='+encodeURIComponent(document.title+' '+location.href),'_blank','noopener')">WhatsApp শেয়ার</button>
</div>
</section>
<p class="home"><a href="../">প্রচ্ছদে ফিরে যান</a></p>
</main>
<script>
window.downloadNewsPDF=async function(){
 const button=Array.from(document.querySelectorAll('.bd-article-actions button')).find(b=>/PDF ডাউনলোড/.test(b.textContent));
 const oldText=button?.textContent;
 try{
  if(!window.html2canvas||!window.jspdf?.jsPDF)throw new Error('PDF তৈরির লাইব্রেরি লোড হয়নি। ইন্টারনেট সংযোগ দিয়ে আবার চেষ্টা করুন।');
  if(button){button.disabled=true;button.textContent='PDF তৈরি হচ্ছে…';}
  if(document.fonts?.ready)await document.fonts.ready;
  const source=document.querySelector('.paper');
  if(!source)throw new Error('সংবাদ পেপার পাওয়া যায়নি।');
  const clone=source.cloneNode(true);
  clone.querySelectorAll('.masthead,.article-nav,.article-subnav,.bd-breadcrumb,.bd-story-tools,.buttons,.home,.photo-card-preview,#photoCardPreview,.article-qr,#articleViewCount,.bd-article-actions,iframe').forEach(el=>el.remove());
  clone.classList.add('pdf-export');
  clone.style.cssText='display:block;width:794px;max-width:none;margin:0;padding:26px;background:#fff;color:#111;box-sizing:border-box;box-shadow:none;border:0;border-radius:0;font-family:Arial,sans-serif;';
  const staging=document.createElement('div');
  staging.style.cssText='position:fixed;left:-12000px;top:0;width:794px;background:#fff;z-index:-1;';
  const pdfStyle=document.createElement('style');
  pdfStyle.textContent='.pdf-export .print-masthead{display:block!important;visibility:visible!important;margin:0 0 12px!important;padding:0 0 8px!important;border-bottom:3px solid #a30d25!important}.pdf-export .print-topline{display:flex!important;justify-content:space-between!important;font-size:10px!important}.pdf-export .print-brand{display:flex!important;align-items:center!important;gap:10px!important;font-size:24px!important;font-weight:900!important;color:#a30d25!important}.pdf-export .print-logo{display:block!important;width:48px!important;height:48px!important;object-fit:contain!important}.pdf-export .print-tagline{font-size:13px!important}.pdf-export .print-rule{height:3px!important;background:#a30d25!important;margin:7px 0!important}.pdf-export .print-edition{display:flex!important;justify-content:space-between!important;font-size:10px!important}.pdf-export .category{display:block!important;margin:8px 0!important;font-size:12px!important;color:#a30d25!important}.pdf-export h1{font-size:25px!important;line-height:1.35!important;text-align:left!important;margin:8px 0!important;padding:0 0 8px!important;border-bottom:1px solid #bbb!important}.pdf-export .date{font-size:11px!important;margin:5px 0!important}.pdf-export .photo-gallery{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:8px!important;margin:10px 0!important}.pdf-export .photo-card{margin:0!important;padding:4px!important;border:1px solid #aaa!important;background:#fff!important}.pdf-export .photo-card img{width:100%!important;height:105px!important;max-height:105px!important;object-fit:contain!important}.pdf-export .caption{font-size:9px!important;line-height:1.25!important;text-align:center!important}.pdf-export .article{font-size:12px!important;line-height:1.45!important;column-count:2!important;column-gap:18px!important;column-rule:1px solid #ddd!important;margin:10px 0!important;white-space:pre-wrap!important}.pdf-export .footer{font-size:10px!important;margin-top:10px!important;padding-top:6px!important}';
  staging.appendChild(pdfStyle);staging.appendChild(clone);document.body.appendChild(staging);
  try{
   await Promise.all(Array.from(clone.querySelectorAll('img')).map(img=>img.complete?Promise.resolve():new Promise(resolve=>{img.onload=resolve;img.onerror=resolve;})));
   const canvas=await html2canvas(clone,{scale:2,useCORS:true,allowTaint:false,backgroundColor:'#ffffff',logging:false,windowWidth:850});
   const pdf=new jspdf.jsPDF({orientation:'portrait',unit:'mm',format:'a4',compress:true});
   const pageW=196,pageH=283,ratio=Math.min(pageW/canvas.width,pageH/canvas.height);
   const w=canvas.width*ratio,h=canvas.height*ratio;
   const x=(210-w)/2,y=7;
   pdf.addImage(canvas.toDataURL('image/jpeg',0.94),'JPEG',x,y,w,h,undefined,'FAST');
   const base=(document.querySelector('h1')?.textContent||'BD-Barguna-News').replace(/[\\/:*?"<>|]/g,' ').trim().slice(0,70)||'BD-Barguna-News';
   pdf.save(base+'.pdf');
  }finally{staging.remove();}
 }catch(error){alert(error.message||'PDF ডাউনলোড করা যায়নি।');}
 finally{if(button){button.disabled=false;button.textContent=oldText;}}
};
window.buildNewsPhotoCard=async function(){
 const title=(document.querySelector('h1')?.textContent||document.title).replace(/\s+/g,' ').trim();
 const category=(document.querySelector('.cat,.category')?.textContent||'সর্বশেষ সংবাদ').trim();
 const dateRaw=document.querySelector('meta[property="article:published_time"]')?.content||document.querySelector('.date')?.textContent||new Date().toISOString();
 const parsed=new Date(dateRaw),safeDate=isNaN(parsed.getTime())?new Date():parsed;
 const dateText=new Intl.DateTimeFormat('bn-BD',{day:'numeric',month:'long',year:'numeric',timeZone:'Asia/Dhaka'}).format(safeDate);
 const dayText=new Intl.DateTimeFormat('bn-BD',{weekday:'long',timeZone:'Asia/Dhaka'}).format(safeDate);
 const articleLink=document.querySelector('link[rel="canonical"]')?.href||location.href;
 const qrDataUrl=window.QRCode?await QRCode.toDataURL(articleLink,{width:220,margin:1,errorCorrectionLevel:'M'}):'';
 const galleryFigures=Array.from(document.querySelectorAll('.photo-gallery figure.photo-card'));
 const galleryEntries=galleryFigures.map((figure,i)=>{
  const el=figure.querySelector('img');
  return el?{url:el.currentSrc||el.src||el.getAttribute('src'),caption:(figure.querySelector('figcaption,.caption')?.textContent||'').trim()||('ছবি '+(i+1))}:null;
 }).filter(item=>item&&item.url);
 const fallbackEls=Array.from(document.querySelectorAll('.article-image, figure img')).filter(el=>!el.closest('.photo-card-preview')&&!el.closest('.photo-gallery'));
 const fallbackEntries=fallbackEls.map((el,i)=>({url:el.currentSrc||el.src||el.getAttribute('src'),caption:(el.closest('figure')?.querySelector('figcaption,.caption')?.textContent||'').trim()||('ছবি '+(i+1))})).filter(item=>item.url);
 const photoEntries=[...galleryEntries,...fallbackEntries].filter((item,i,all)=>all.findIndex(x=>x.url===item.url)===i).slice(0,3);
 const photoUrls=photoEntries.map(item=>item.url);
 const logoUrl=new URL('../images/app-icon.svg',location.href).href;
 const loadImage=src=>new Promise(resolve=>{if(!src)return resolve(null);const im=new Image();im.crossOrigin='anonymous';im.onload=()=>resolve(im);im.onerror=()=>resolve(null);im.src=src;});
 const [photos,logo,qr]=await Promise.all([Promise.all(photoUrls.map(loadImage)),loadImage(logoUrl),loadImage(qrDataUrl)]);
 const usablePhotos=photos.filter(Boolean);
 const canvas=document.createElement('canvas'),ctx=canvas.getContext('2d');
 if(!ctx)throw new Error('ফটোকার্ড তৈরি করা যাচ্ছে না।');
 const titleFont=title.length>125?38:title.length>85?42:46;
 ctx.font='bold '+titleFont+'px "Noto Sans Bengali",Arial';
 const wrap=(value,maxWidth)=>{const lines=[];let line='';for(const word of value.split(/\s+/)){const next=line?line+' '+word:word;if(ctx.measureText(next).width<=maxWidth){line=next;continue;}if(line)lines.push(line);line='';for(const ch of Array.from(word)){if(ctx.measureText(line+ch).width>maxWidth&&line){lines.push(line);line=ch;}else line+=ch;}}if(line)lines.push(line);return lines;};
 const titleLines=wrap(title,1025);
 const lineHeight=Math.ceil(titleFont*1.32),extraHeight=Math.max(0,(titleLines.length-2)*lineHeight);
 const height=1200+extraHeight;canvas.width=1200;canvas.height=height;
 const rr=(x,y,w,h,r)=>{ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath();};
 const bg=ctx.createLinearGradient(0,0,1200,height);bg.addColorStop(0,'#111827');bg.addColorStop(.55,'#18263b');bg.addColorStop(1,'#273c59');ctx.fillStyle=bg;ctx.fillRect(0,0,1200,height);
 ctx.fillStyle='#c51b36';ctx.fillRect(0,0,1200,18);ctx.fillStyle='rgba(255,255,255,.06)';ctx.beginPath();ctx.arc(1110,105,190,0,Math.PI*2);ctx.fill();
 if(logo){ctx.save();rr(58,48,92,92,22);ctx.fillStyle='#fff';ctx.fill();ctx.clip();const sc=Math.min(78/logo.naturalWidth,78/logo.naturalHeight);ctx.drawImage(logo,104-logo.naturalWidth*sc/2,94-logo.naturalHeight*sc/2,logo.naturalWidth*sc,logo.naturalHeight*sc);ctx.restore();}
 ctx.fillStyle='#fff';ctx.font='bold 34px Arial';ctx.fillText('BD BARGUNA NEWS',174,88);ctx.fillStyle='#cbd5e1';ctx.font='23px Arial';ctx.fillText('সত্যের সন্ধানে, মানুষের পাশে।',174,126);
 ctx.fillStyle='#f8fafc';ctx.font='bold 19px Arial';ctx.textAlign='right';ctx.fillText('NEWS • বরগুনা',1138,95);ctx.textAlign='left';
 ctx.save();rr(48,170,1104,535,28);ctx.clip();
 const drawCrop=(im,x,y,w,h)=>{if(!im)return;const sc=Math.max(w/im.naturalWidth,h/im.naturalHeight),sw=w/sc,sh=h/sc;ctx.drawImage(im,(im.naturalWidth-sw)/2,(im.naturalHeight-sh)/2,sw,sh,x,y,w,h);};
 ctx.fillStyle='#e8edf3';ctx.fillRect(48,170,1104,535);
 if(usablePhotos.length>=3){
  const colW=360,imgY=170,imgH=330,gap=12;
  usablePhotos.slice(0,3).forEach((photo,i)=>{
   const x=48+i*(colW+gap);
   ctx.fillStyle='#fff';ctx.fillRect(x,imgY,colW,535);
   drawCrop(photo,x,imgY,colW,imgH);
   ctx.fillStyle='#e2e8f0';ctx.fillRect(x,imgY+imgH,colW,2);
   const label=photoEntries[i]?.caption||('ছবি '+(i+1));
   ctx.save();ctx.beginPath();ctx.rect(x+10,510,colW-20,175);ctx.clip();
   ctx.fillStyle='#17212b';ctx.font='bold 22px "Noto Sans Bengali",Arial';ctx.textAlign='center';
   const words=label.split(/\s+/);let line='',lines=[],maxW=colW-28;
   for(const word of words){const next=line?line+' '+word:word;if(ctx.measureText(next).width<=maxW){line=next;}else{if(line)lines.push(line);line=word;}}
   if(line)lines.push(line);
   lines.slice(0,4).forEach((txt,j)=>ctx.fillText(txt,x+colW/2,545+j*30));
   ctx.restore();ctx.textAlign='left';
  });
 }else if(usablePhotos.length===2){
  drawCrop(usablePhotos[0],48,170,546,535);ctx.fillStyle='#fff';ctx.fillRect(594,170,6,535);drawCrop(usablePhotos[1],600,170,552,535);
 }else if(usablePhotos.length===1){drawCrop(usablePhotos[0],48,170,1104,535);}
 else{const pg=ctx.createLinearGradient(48,170,1152,705);pg.addColorStop(0,'#334b6c');pg.addColorStop(1,'#0f172a');ctx.fillStyle=pg;ctx.fillRect(48,170,1104,535);ctx.fillStyle='rgba(255,255,255,.14)';ctx.font='bold 64px Arial';ctx.fillText('BD BARGUNA NEWS',100,440);}
 ctx.restore();
 const panelHeight=390+extraHeight;ctx.save();rr(48,675,1104,panelHeight,26);ctx.fillStyle='#fff';ctx.fill();ctx.restore();
 ctx.fillStyle='#c51b36';rr(82,710,250,52,16);ctx.fill();ctx.fillStyle='#fff';ctx.font='bold 23px "Noto Sans Bengali",Arial';ctx.fillText(category.slice(0,18),104,745);
 ctx.fillStyle='#64748b';ctx.font='bold 22px "Noto Sans Bengali",Arial';ctx.textAlign='right';ctx.fillText(dayText,1115,745);ctx.textAlign='left';
 ctx.fillStyle='#111827';ctx.font='bold '+titleFont+'px "Noto Sans Bengali",Arial';let y=825;titleLines.forEach(line=>{ctx.fillText(line,82,y);y+=lineHeight;});
 const footerY=1000+extraHeight;ctx.fillStyle='#e2e8f0';ctx.fillRect(82,footerY,1036,2);ctx.fillStyle='#c51b36';ctx.fillRect(82,footerY,140,5);
 ctx.fillStyle='#475569';ctx.font='bold 21px Arial';ctx.fillText('BD BARGUNA NEWS',82,footerY+35);ctx.textAlign='right';ctx.font='20px "Noto Sans Bengali",Arial';ctx.fillText(dateText,930,footerY+35);ctx.textAlign='left';
 if(qr){ctx.fillStyle='#fff';ctx.fillRect(980,footerY+48,142,142);ctx.drawImage(qr,986,footerY+54,130,130);}
 return canvas;
};
window.downloadNewsPhotoCard=async function(){
 try{
  const canvas=await window.buildNewsPhotoCard();
  const save=url=>{const a=document.createElement('a');a.href=url;a.download='BD-Barguna-News-PhotoCard.png';a.style.display='none';document.body.appendChild(a);a.click();a.remove();};
  if(canvas.toBlob){canvas.toBlob(blob=>{if(!blob){save(canvas.toDataURL('image/png'));return;}const url=URL.createObjectURL(blob);save(url);setTimeout(()=>URL.revokeObjectURL(url),10000);},'image/png');}
  else save(canvas.toDataURL('image/png'));
 }catch(e){alert(e.message||'ফটোকার্ড ডাউনলোড করা যায়নি।');}
};
window.printNewsPhotoCard=async function(){
 try{
  const canvas=await window.buildNewsPhotoCard(),url=canvas.toDataURL('image/png'),w=window.open('','_blank');
  if(!w){alert('প্রিন্টের জন্য নতুন উইন্ডো খুলতে অনুমতি দিন।');return;}
  w.document.write('<!doctype html><html><head><title>BD Barguna News Photo Card</title><style>body{margin:0;display:grid;place-items:center;min-height:100vh}img{width:min(100vw,100vh);height:auto}@media print{img{width:100%;max-height:100vh;object-fit:contain}}</style></head><body><img src="'+url+'" onload="setTimeout(()=>window.print(),300)"></body></html>');
  w.document.close();
 }catch(e){alert(e.message||'প্রিন্ট করা যায়নি।');}
};
window.copyNewsPhotoCard=async function(){
 try{const canvas=await window.buildNewsPhotoCard();const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/png'));if(!blob)throw new Error('ছবি তৈরি করা যায়নি।');if(!navigator.clipboard||!window.ClipboardItem)throw new Error('এই ব্রাউজারে ছবি কপি সুবিধা নেই—ডাউনলোড বাটন ব্যবহার করুন।');await navigator.clipboard.write([new ClipboardItem({'image/png':blob})]);alert('ফটোকার্ড কপি হয়েছে। এখন Facebook পোস্টে পেস্ট করতে পারবেন।');}
 catch(e){alert(e.message||'ফটোকার্ড কপি করা যায়নি।'window.copyArticleText=async function(){
 const title=(document.querySelector('h1')?.textContent||document.title).trim();
 const body=(document.querySelector('.article')?.textContent||'').trim();
 const text=[title,body].filter(Boolean).join('\n\n');
 try{
  if(navigator.clipboard&&window.isSecureContext)await navigator.clipboard.writeText(text);
  else{const field=document.createElement('textarea');field.value=text;field.style.position='fixed';field.style.opacity='0';document.body.appendChild(field);field.focus();field.select();const ok=document.execCommand('copy');field.remove();if(!ok)throw new Error('কপি করা যায়নি');}
  alert('শুধু শিরোনাম ও নিউজের লেখা কপি হয়েছে।');
 }catch(e){window.prompt('শুধু শিরোনাম ও নিউজের লেখা কপি করুন:',text);}
};e);}
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

window.addEventListener('load',async function(){
 const preview=document.getElementById('newsPhotoCardPreview');
 try{
  const canonical=document.querySelector('link[rel="canonical"]')?.href||location.href;
  const qr=window.QRCode?await QRCode.toDataURL(canonical,{width:220,margin:1,errorCorrectionLevel:'M'}):'';
  const qrEl=document.getElementById('articleQrImage');if(qrEl&&qr)qrEl.src=qr;
  if(preview){const canvas=await window.buildNewsPhotoCard();preview.src=canvas.toDataURL('image/png');}
 }catch(error){if(preview){preview.alt='ফটোকার্ড তৈরি হয়নি: '+(error.message||'ছবি লোড করা যায়নি');}console.error('BD Barguna photo card:',error);}
});
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
