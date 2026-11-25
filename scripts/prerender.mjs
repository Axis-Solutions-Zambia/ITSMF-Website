import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
const metadata = JSON.parse(await readFile('src/lib/routeMetadata.json', 'utf8'));
const content = JSON.parse(await readFile('src/lib/auditContent.json', 'utf8'));
const template = await readFile('dist/index.html', 'utf8');
const origin = 'https://itsmf.org.zm';
const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
for (const [route, meta] of Object.entries(metadata)) {
  const page = route === '/' ? 'home' : route.slice(1);
  const paragraphs = content.filter(patch => patch.page === page).flatMap(patch => Object.entries(patch.content).filter(([key,value]) => ['body','mission_text','vision_text','desc','intro'].includes(key) && typeof value === 'string').map(([,value]) => value));
  const navigation = Object.entries(metadata).filter(([path]) => !['/privacy','/enquire','/services/benchmarking'].includes(path)).map(([path,item]) => `<a href="${path}">${escape(item.title.split(' | ')[0])}</a>`).join(' · ');
  const fallback = `<main style="max-width:60rem;margin:4rem auto;padding:1.5rem;font:18px/1.7 sans-serif"><h1>${escape(meta.title.split(' | ')[0])}</h1><p>${escape(meta.description)}</p>${paragraphs.map(text => `<p>${escape(text)}</p>`).join('')}<nav aria-label="Main navigation">${navigation}</nav><p><a href="/enquire">Contact the chapter</a> · <a href="/privacy">Privacy notice</a></p></main>`;
  const tags = `<meta name="description" content="${escape(meta.description)}" /><link rel="canonical" href="${origin}${route}" /><meta property="og:title" content="${escape(meta.title)}" /><meta property="og:description" content="${escape(meta.description)}" /><meta property="og:type" content="website" /><meta property="og:url" content="${origin}${route}" /><meta name="twitter:card" content="summary" />`;
  const html = template.replace(/<title>.*?<\/title>/, `<title>${escape(meta.title)}</title>`).replace('</head>', `${tags}</head>`).replace('<div id="root"></div>', `<div id="root">${fallback}</div>`);
  const directory = join('dist',route === '/' ? '' : route.slice(1));
  await mkdir(directory,{recursive:true});
  await writeFile(join(directory,'index.html'),html);
}
await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${Object.keys(metadata).map(route=>`<url><loc>${origin}${route}</loc></url>`).join('')}</urlset>`);
await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /portal\nSitemap: ${origin}/sitemap.xml\n`);
console.log(`Generated ${Object.keys(metadata).length} public HTML pages, metadata, sitemap and robots.txt.`);
