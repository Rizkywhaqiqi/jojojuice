import {readFile,writeFile} from 'node:fs/promises';
import ts from 'typescript';
const source=await readFile(new URL('../src/navigation.ts',import.meta.url),'utf8');
const code=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const {PUBLIC_PAGES}=await import('data:text/javascript;base64,'+Buffer.from(code).toString('base64'));
const original=await readFile('dist/index.html','utf8');
const escape=s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const images={'/':'jojo-hero','/tentang':'jojo-together','/menu':'jojo-refresh','/pesan':'jojo-refresh'};
for(const page of [...PUBLIC_PAGES,{path:'/404',title:'Halaman tidak ditemukan — JOJO Juice',description:'Kembali ke website JOJO Juice.'}]){
 const url='https://jojojuice.vercel.app'+(page.path==='/'?'/':page.path);
 let html=original.replace(/<title>[^<]*<\/title>/,`<title>${escape(page.title)}</title>`).replace(/(<meta name="description" content=")[^"]*/,`$1${escape(page.description)}`).replace(/(<link rel="canonical" href=")[^"]*/,`$1${url}`).replace(/(<meta property="og:title" content=")[^"]*/,`$1${escape(page.title)}`).replace(/(<meta property="og:description" content=")[^"]*/,`$1${escape(page.description)}`).replace(/(<meta property="og:url" content=")[^"]*/,`$1${url}`).replace(/<link rel="preload" as="image"[^>]*>/g,'');
 if(images[page.path])html=html.replace('</head>',`<link rel="preload" as="image" href="/brands/${images[page.path]}.webp" fetchpriority="high"></head>`);
 if(page.path==='/404')html=html.replace('</head>','<meta name="robots" content="noindex"></head>');
 const path=page.path==='/'?'dist/index.html':`dist${page.path}.html`;await writeFile(path,html);
}
await writeFile('dist/sitemap.xml','<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+PUBLIC_PAGES.map(p=>`<url><loc>https://jojojuice.vercel.app${p.path==='/'?'/':p.path}</loc></url>`).join('')+'</urlset>\n');
console.log(`Generated ${PUBLIC_PAGES.length} public pages and a 404 page.`);
