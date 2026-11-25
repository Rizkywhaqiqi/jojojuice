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
