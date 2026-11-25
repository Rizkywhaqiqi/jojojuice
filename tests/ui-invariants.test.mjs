import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';

const read=(name)=>readFileSync(new URL('../'+name,import.meta.url),'utf8');
const home=read('src/editorial-home.tsx');
const menu=read('src/menu-catalog.tsx');
const motion=read('src/site-motion.tsx');
const css=read('src/motion.css');

test('homepage hero remains a static JOJO photograph',()=>{
 assert.match(home,/<img className="jojo-editorial-hero-image" src="\/brands\/jojo-home-hero\.jpg"/);
 assert.ok(existsSync(new URL('../public/brands/jojo-home-hero.jpg',import.meta.url)));
 assert.doesNotMatch(home,/jojo-editorial-hero-video/);
});

test('one muted looping film follows the homepage hero',()=>{
 assert.equal((home.match(/<JOJOFilm\s*\/>/g)??[]).length,1);
 assert.equal((home.match(/<JOJOVideo\b/g)??[]).length,1);
 assert.match(home,/muted loop playsInline/);
 assert.ok(existsSync(new URL('../public/media/jojovid.mp4',import.meta.url)));
});

test('menu hero retains its original JOJO fruit basket image',()=>{
 assert.match(menu,/className="catalog-intro-photo" src="\/brands\/jojo-photo-2\.webp"/);
 assert.ok(existsSync(new URL('../public/brands/jojo-photo-2.webp',import.meta.url)));
});

test('motion respects live reduced-motion changes',()=>{
 assert.match(motion,/preference\.addEventListener\('change',onPreference\)/);
 assert.match(motion,/preference\.removeEventListener\('change',onPreference\)/);
 assert.match(motion,/if\(preference\.matches\)stop\(\)/);
 assert.match(css,/@media\(prefers-reduced-motion:reduce\)/);
});

test('menu filters are retained for the UI audit',()=>{
 assert.match(menu,/catalog-category-shortcuts/);
 assert.match(menu,/catalog-control-row/);
 assert.match(menu,/catalog-empty/);
});

test('all secondary routes have a working page hero and in-page destination',()=>{
 const app=read('src/App.tsx');
 const directory=read('src/jojo-directory.tsx');
 assert.match(app,/function Banner\(\{title,image,eyebrow,copy,cta,href\}/);
 assert.match(app,/href="#cerita-jojo"/);
 assert.match(app,/href="#outlet-list"/);
 assert.match(app,/href="#contact-channels"/);
 assert.match(app,/id="cerita-jojo"/);
 assert.match(directory,/id="outlet-list"/);
 assert.match(directory,/id="contact-channels"/);
});

test('outlet search exposes filtering status and an explicit reset',()=>{
 const directory=read('src/jojo-directory.tsx');
 assert.match(directory,/role="status" aria-live="polite"/);
 assert.match(directory,/Hapus pencarian outlet/);
 assert.match(directory,/RESET FILTER/);
});

test('two uploaded JOJO moments silently loop in Home instead of Story',()=>{
 const app=read('src/App.tsx');
 const home=read('src/editorial-home.tsx');
 const story=app.slice(app.indexOf('function Story(){'),app.indexOf('function Menu(){'));
 assert.equal((home.match(/<JOJOMomentVideo source=/g)??[]).length,2);
 assert.match(home,/return <video ref={ref} src={source} poster={poster} muted loop playsInline preload="metadata"/);
 assert.match(home,/new IntersectionObserver/);
 assert.match(home,/reduced\.addEventListener\('change',sync\)/);
 assert.match(home,/source="\/media\/jojo-moments-1\.mp4"/);
 assert.match(home,/source="\/media\/jojo-moments-2\.mp4"/);
 assert.doesNotMatch(story,/jojo-moments-[12]\.mp4/);
 for(const file of ['jojo-moments-1.mp4','jojo-moments-2.mp4','jojo-moments-1-poster.webp','jojo-moments-2-poster.webp']){
  assert.ok(existsSync(new URL('../public/media/'+file,import.meta.url)),file+' must be deployed');
 }
});
