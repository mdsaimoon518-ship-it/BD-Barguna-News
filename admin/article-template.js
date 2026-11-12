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

.buttons{display:flex;gap:8px;flex-wrap:wrap;margin-top:20px}
button{padding:11px 18px;border:0;border-radius:6px;color:white;background:#087b42}
.facebook{background:#1877f2}.whatsapp{background:#128c4a}
@media(max-width:500px){.paper{padding:15px}h1{font-size:23px}.brand{font-size:20px}.article{font-size:16px}}
@media print{body{background:white;padding:0}.paper{box-shadow:none;border:0;padding:0}.buttons,.home{display:none!important}}
</style>
</head>
<body>
<main class="paper">
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
<button onclick="downloadNewsPhotoCard()">🖼️ নিউজ ফটোকার্ড ডাউনলোড</button>
<button onclick="window.print()">🖨️ সংবাদ প্রিন্ট</button>
<button class="gray" onclick="copyArticleLink()">🔗 লিংক কপি</button>
<button class="facebook" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(location.href),'_blank','noopener')">Facebook শেয়ার</button>
<button class="whatsapp" onclick="window.open('https://wa.me/?text='+encodeURIComponent(document.title+' '+location.href),'_blank','noopener')">WhatsApp শেয়ার</button>
</div>
<p class="home"><a href="../">প্রচ্ছদে ফিরে যান</a></p>
</main>
<script>
window.downloadNewsPhotoCard=async function(){
 const title=(document.querySelector('h1')?.textContent||document.title).trim();
 const canvas=document.createElement('canvas');canvas.width=1200;canvas.height=1200;
 const ctx=canvas.getContext('2d');if(!ctx){alert('ফটোকার্ড তৈরি করা যাচ্ছে না।');return;}
 const published=document.querySelector('meta[property="article:published_time"]')?.content||document.querySelector('.date')?.textContent?.replace(/^📅 প্রকাশিত:\s*/,'')||new Date().toISOString();
 const date=new Date(published),dateText=new Intl.DateTimeFormat('bn-BD',{day:'numeric',month:'long',year:'numeric',timeZone:'Asia/Dhaka'}).format(isNaN(date)?new Date():date);
 const photoEl=document.querySelector('.photo-card img');
 const photoUrl=photoEl?.currentSrc||photoEl?.src||'';
 const logoUrl=new URL('../images/site-logo.svg',location.href).href;
 const loadImage=src=>new Promise(resolve=>{if(!src)return resolve(null);const im=new Image();im.crossOrigin='anonymous';im.onload=()=>resolve(im);im.onerror=()=>resolve(null);im.src=src;});
 const [photo,logo]=await Promise.all([loadImage(photoUrl),loadImage(logoUrl)]);
 ctx.fillStyle='#101827';ctx.fillRect(0,0,1200,1200);ctx.fillStyle='#f8fafc';ctx.beginPath();ctx.roundRect(28,28,1144,1144,34);ctx.fill();
 ctx.save();ctx.beginPath();ctx.roundRect(42,42,1116,1116,26);ctx.clip();
 if(photo){const scale=Math.max(1116/photo.naturalWidth,690/photo.naturalHeight),sw=1116/scale,sh=690/scale;ctx.drawImage(photo,(photo.naturalWidth-sw)/2,(photo.naturalHeight-sh)/2,sw,sh,42,42,1116,690);}else{const g=ctx.createLinearGradient(42,42,1158,732);g.addColorStop(0,'#243b55');g.addColorStop(1,'#141e30');ctx.fillStyle=g;ctx.fillRect(42,42,1116,690);}
 const overlay=ctx.createLinearGradient(42,440,42,735);overlay.addColorStop(0,'rgba(4,12,24,0)');overlay.addColorStop(1,'rgba(4,12,24,.68)');ctx.fillStyle=overlay;ctx.fillRect(42,400,1116,332);
 ctx.fillStyle='#fff';ctx.font='bold 28px Arial';ctx.fillText('BD BARGUNA NEWS',78,105);
 ctx.fillStyle='#c8102e';ctx.beginPath();ctx.roundRect(78,625,240,58,18);ctx.fill();ctx.fillStyle='#fff';ctx.font='bold 25px Arial';ctx.fillText('সর্বশেষ সংবাদ',101,664);
 ctx.fillStyle='#fff';ctx.fillRect(42,732,1116,426);ctx.fillStyle='#c8102e';ctx.fillRect(42,732,12,426);
 if(logo){ctx.fillStyle='#fff';ctx.beginPath();ctx.roundRect(78,775,112,112,24);ctx.fill();const s=Math.min(84/logo.naturalWidth,84/logo.naturalHeight);ctx.drawImage(logo,92,789,logo.naturalWidth*s,logo.naturalHeight*s);}
 ctx.fillStyle='#a20d27';ctx.font='bold 30px Arial';ctx.fillText('BD BARGUNA NEWS',214,815);ctx.fillStyle='#667085';ctx.font='24px Arial';ctx.fillText('বরগুনা ও দেশের সর্বশেষ সংবাদ',214,855);
 ctx.fillStyle='#a20d27';ctx.beginPath();ctx.roundRect(850,780,260,58,18);ctx.fill();ctx.fillStyle='#fff';ctx.font='bold 24px Arial';ctx.textAlign='center';ctx.fillText(dateText,980,818);ctx.textAlign='left';
 ctx.fillStyle='#172033';ctx.font='bold 48px "Noto Sans Bengali",Arial';const words=title.split(/\s+/),lines=[];let line='';for(const word of words){const next=line?line+' '+word:word;if(ctx.measureText(next).width>1000&&line){lines.push(line);line=word;}else line=next;}if(line)lines.push(line);
 let y=950;lines.slice(0,3).forEach(t=>{ctx.fillText(t,82,y);y+=65;});if(lines.length>3){ctx.fillStyle='#c8102e';ctx.font='bold 34px Arial';ctx.fillText('বিস্তারিত পড়ুন ওয়েবসাইটে',82,1130);}else{ctx.fillStyle='#c8102e';ctx.fillRect(82,1092,120,6);}
 ctx.restore();
 canvas.toBlob(blob=>{if(!blob){alert('ফটোকার্ড তৈরি হয়নি।');return;}const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='bd-barguna-news-photo-card.png';a.click();setTimeout(()=>URL.revokeObjectURL(url),2000);},'image/png');
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
