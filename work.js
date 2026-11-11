
export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/") {
      return new Response("BD Barguna News API is running!", {
        headers: {
          "Content-Type": "text/plain; charset=UTF-8"
        }
      });
    }

    if (url.pathname === "/sitemap.xml") {
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url>
<loc>https://mdsaimoon518-ship-it.github.io/BD-Barguna-News/</loc>
</url>
</urlset>`;

      return new Response(xml, {
        headers: {
          "Content-Type": "application/xml; charset=UTF-8"
        }
      });
    }

    return new Response("Not Found", { status: 404 });
  }
};
