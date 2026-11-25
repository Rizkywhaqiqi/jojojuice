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
 const welcomeStart=home.indexOf('<section className="jojo-tropical-story"');
 const everydayStart=home.indexOf('<section className="jojo-tropical-feature');
 const favoritesStart=home.indexOf('<section className="jojo-paper jojo-picks"');
 const firstClip=home.indexOf('source="/media/jojo-moments-1.mp4"');
 const secondClip=home.indexOf('source="/media/jojo-moments-2.mp4"');
 const welcomeHeading=home.indexOf('id="jojo-tropical-title"');
 const everydayHeading=home.indexOf('id="jojo-feature-title"');
 assert.ok(welcomeStart<welcomeHeading&&welcomeHeading<firstClip&&firstClip<everydayStart);
 assert.ok(everydayStart<everydayHeading&&everydayHeading<secondClip&&secondClip<favoritesStart);
 assert.ok(!home.includes('jojo-tropical-video-pair'));
 assert.ok(home.includes('const ref=useCoordinatedVideo()'));
 const coordinator=read('src/use-coordinated-video.ts');
 assert.ok(coordinator.includes('const candidates=new Map'));
 assert.ok(coordinator.includes('const canPlay=!document.hidden'));
 assert.ok(coordinator.includes('active.pause()'));
 assert.ok(coordinator.includes("reduced.addEventListener('change',reconcile)"));
 assert.match(home,/source="\/media\/jojo-moments-1\.mp4"/);
 assert.match(home,/source="\/media\/jojo-moments-2\.mp4"/);
 assert.doesNotMatch(story,/jojo-moments-[12]\.mp4/);
 for(const file of ['jojo-moments-1.mp4','jojo-moments-2.mp4','jojo-moments-1-poster.webp','jojo-moments-2-poster.webp']){
  assert.ok(existsSync(new URL('../public/media/'+file,import.meta.url)),file+' must be deployed');
 }
});

test('mobile navigation dialog effects rerun after open changes',()=>{
 const app=read('src/App.tsx');
 const begin=app.indexOf('const background=Array.from(document.querySelectorAll');
 const end=app.indexOf('useEffect(()=>{const onResize',begin);
 assert.ok(begin>0&&end>begin);
 const effect=app.slice(begin,end);
 assert.ok(effect.includes('},[open]);'));
 assert.ok(effect.includes("document.addEventListener('keydown',onKey)"));
 assert.ok(effect.includes("document.addEventListener('focusin',onFocus)"));
 assert.ok(effect.includes('oldInert.forEach'));
});
test('active menu category becomes visible in horizontal chips',()=>{
 const menu=read('src/menu-catalog.tsx');
 assert.ok(menu.includes('ref={shortcutsRef}'));
 assert.ok(menu.includes('wrapper.scrollTo('));
 assert.ok(menu.includes('[category,family,showAllCategories]'));
});
test('final ordering step is an accessible instruction not a fake CTA',()=>{
 const guide=read('src/how-to-order.tsx');
 assert.ok(guide.includes('KONFIRMASI DI PLATFORM PILIHANMU'));
 assert.ok(guide.includes('<p className="how-order-step-finish" role="note">'));
 assert.ok(!guide.includes('LANJUTKAN DI APLIKASI'));
});

test('new JOJO lifestyle, freshness and outlet editorial photo sets render in intended routes',()=>{
 const app=read('src/App.tsx');
 const home=read('src/editorial-home.tsx');
 const gallery=read('src/jojo-editorial-gallery.tsx');
 assert.ok(app.includes('<StoryNature/>')&&app.includes('<StoryStreet/>'));
 assert.ok(app.includes('<OutletExperience/>'));
 assert.ok(app.includes('image="editorial/jojo-interior-space.webp"'));
 assert.ok(home.includes('/brands/editorial/jojo-street-friends.webp'));
 for(const name of [
  'jojo-street-drink','jojo-street-friends','jojo-street-overhead',
  'jojo-street-moment','jojo-street-moving','jojo-avocado-harvest',
  'jojo-avocado-tree','jojo-avocado-juice','jojo-interior-counter',
  'jojo-interior-space','jojo-interior-seating','jojo-interior-brand'
 ]){
  assert.ok(existsSync(new URL('../public/brands/editorial/'+name+'.webp',import.meta.url)),name+' asset required');
  assert.ok(gallery.includes(name+'.webp')||home.includes(name+'.webp'),name+' is referenced');
 }
});

test('existing looping homepage videos remain untouched by new visual galleries',()=>{
 const home=read('src/editorial-home.tsx');
 assert.equal(home.split('<JOJOFilm/>').length-1,1);
 assert.equal((home.match(/<JOJOMomentVideo source=/g)??[]).length,2);
 assert.ok(home.includes('jojo-moments-1.mp4')&&home.includes('jojo-moments-2.mp4'));
 assert.ok(!read('src/jojo-editorial-gallery.tsx').includes('<video'));
});

test('middle homepage films stay in their own flow layout instead of overlapping sections',()=>{
 const css=read('src/editorial-home.css');
 const fix=css.slice(css.indexOf('/* 2026-11: Prevent the two middle homepage films'));
 assert.ok(fix.includes('position:relative'));
 assert.ok(fix.includes('inset:auto'));
 assert.ok(fix.includes('height:auto'));
 assert.ok(fix.includes('min-height:0'));
 assert.ok(fix.includes('aspect-ratio:16/9'));
 assert.ok(fix.includes('margin-bottom:clamp('));
 const home=read('src/editorial-home.tsx');
 assert.equal((home.match(/<JOJOMomentVideo source=/g)??[]).length,2);
});
