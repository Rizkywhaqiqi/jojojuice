import {JOJO_TAGLINE} from './brand-copy';
import {JOJO_LINKS} from './jojo-links';
import {useEffect,useMemo,useRef,useState} from 'react';
import './menu-catalog.css';

import {categoryHref, format, groups} from './menu-data';

const drinkIds=new Set(['refresher','special','juice','mixed','oreo','foam','coffee','tea','chocolate','others']);
type Family='all'|'drink'|'food'|'favorite';
type Sort='default'|'low'|'high';
export default function MenuCatalog(){
 const [initialFilters]=useState(()=>{
  const params=new URLSearchParams(window.location.search);
  const family=params.get('jenis');
  const sort=params.get('urut');
  return {
   family:family==='drink'||family==='food'||family==='favorite'?family:'all',
   category:params.get('kategori')||'all',
   query:params.get('q')||'',
   sort:sort==='low'||sort==='high'?sort:'default'
  } satisfies {family:Family;category:string;query:string;sort:Sort};
 });
 const [family,setFamily]=useState<Family>(initialFilters.family);
 const [requestedCategory,setCategory]=useState(initialFilters.category);
 const [query,setQuery]=useState(initialFilters.query);
 const [sort,setSort]=useState<Sort>(initialFilters.sort);
 const availableGroups=useMemo(()=>groups.filter(group=>family==='all'||(family==='drink'?drinkIds.has(group.id):family==='food'?!drinkIds.has(group.id):group.items.some(item=>item.featured))),[family]);
 const category=availableGroups.some(group=>group.id===requestedCategory)?requestedCategory:'all';
 useEffect(()=>{
  const url=new URL(window.location.href);
  const filters={jenis:family==='all'?'':family,kategori:category==='all'?'':category,q:query.trim(),urut:sort==='default'?'':sort};
  Object.entries(filters).forEach(([key,value])=>value?url.searchParams.set(key,value):url.searchParams.delete(key));
  if(url.href!==window.location.href)window.history.replaceState(window.history.state,'',url);
 },[family,category,query,sort]);
 const [showAllCategories,setShowAllCategories]=useState(false);
 const shortcutsRef=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const wrapper=shortcutsRef.current;
  if(!wrapper)return;
  const active=wrapper.querySelector<HTMLElement>('button[aria-pressed="true"]');
  if(!active)return;
  // Reveal active chip without scrolling the entire page.
  const left=active.offsetLeft-wrapper.offsetLeft;
  const right=left+active.offsetWidth;
  const viewLeft=wrapper.scrollLeft,viewRight=viewLeft+wrapper.clientWidth;
  if(left<viewLeft+8)wrapper.scrollTo({left:Math.max(0,left-12),behavior:'auto'});
  else if(right>viewRight-8)wrapper.scrollTo({left:right-wrapper.clientWidth+12,behavior:'auto'});
 },[category,family,showAllCategories]);
 const search=query.trim().toLocaleLowerCase('id');
 const filtered=useMemo(()=>availableGroups.filter(group=>category==='all'||category===group.id).map(group=>{
  const items=group.items.filter(item=>(family!=='favorite'||item.featured)&&(!search||[item.name,group.title,group.subtitle].some(text=>text.toLocaleLowerCase('id').includes(search))));
  return {...group,items};
 }).filter(group=>group.items.length>0),[availableGroups,category,search,family]);
 // When sorting by price, compare ALL matching items across category boundaries.
 const sortedItems=useMemo(()=>filtered.flatMap(group=>group.items.map(item=>({
  ...item,groupTitle:group.title,groupId:group.id
 }))).sort((a,b)=>sort==='high'?b.price-a.price:a.price-b.price),[filtered,sort]);
 const shortcutGroups=useMemo(()=>{
  if(showAllCategories)return availableGroups;
  const firstFive=availableGroups.slice(0,5);
  if(category==='all'||firstFive.some(group=>group.id===category))return firstFive;
  const active=availableGroups.find(group=>group.id===category);
  return active?[active,...firstFive.slice(0,4)]:firstFive;
 },[availableGroups,category,showAllCategories]);
 const count=filtered.reduce((sum,g)=>sum+g.items.length,0);
 const total=groups.reduce((sum,g)=>sum+g.items.length,0);
 const chooseFamily=(next:Family)=>{setFamily(next);setCategory('all');setShowAllCategories(false)};
 const reset=()=>{setFamily('all');setCategory('all');setQuery('');setSort('default');setShowAllCategories(false)};
 return <div className="menu-catalog">
  <section className="catalog-intro">
   <img className="catalog-intro-photo" src="/brands/jojo-photo-2.webp" alt="Keranjang buah tropis bersama cup JOJO Juice" fetchPriority="high"/>
   <div className="catalog-intro-shade" aria-hidden="true"/>
   <div className="catalog-intro-content">
    <span className="eyebrow">{JOJO_TAGLINE.toUpperCase()}</span>
    <h1>Menu <span>JOJO</span></h1>
    <p>Lagi pengin jus, kopi, atau camilan? Cek pilihan dan harganya di sini.</p>
    <div className="catalog-intro-links"><a className="button" href="#pilihan-menu">Lihat pilihan</a><span className="catalog-hero-counter">{total} PILIHAN · {groups.length} KATEGORI</span></div>
   </div>
  </section>
  <section className="catalog-featured" aria-label="Pilihan minuman JOJO">
   <div className="catalog-featured-text"><h2>Jus <em>favorit</em></h2></div>
   <div className="catalog-featured-images">
    <figure><img src="/brands/jojo-green.webp" alt="Green N Glow JOJO" loading="lazy" width="360" height="400"/><figcaption>GREEN N GLOW</figcaption></figure>
    <figure><img src="/brands/jojo-dragon.webp" alt="Dragon Ball JOJO" loading="lazy" width="360" height="400"/><figcaption>DRAGON BALL</figcaption></figure>
    <figure><img src="/brands/jojo-refresh.webp" alt="Minuman buah JOJO" loading="lazy" width="360" height="400"/><figcaption>Jus buah</figcaption></figure>
   </div>
  </section>
  <section className="catalog-body section" id="pilihan-menu">
   <div className="catalog-body-head"><div><h2>Katalog <em>menu</em></h2></div><p>Nama dan harga mengikuti materi menu JOJO yang dibagikan. Harga dan ketersediaan di outlet bisa berubah.</p></div>
   <div className="catalog-controls">
    <div className="catalog-families" role="group" aria-label="Jenis menu">
     {([{id:'all',label:'SEMUA'},{id:'drink',label:'MINUMAN'},{id:'food',label:'MAKANAN'},{id:'favorite',label:'FAVORIT'}] as const).map(tab=><button key={tab.id} type="button" className={family===tab.id?'active':''} aria-pressed={family===tab.id} onClick={()=>chooseFamily(tab.id)}>{tab.label}</button>)}
    </div>
    <div ref={shortcutsRef} className="catalog-category-shortcuts" role="group" aria-label="Pintasan kategori, geser ke samping untuk pilihan lain">
     <button type="button" className={category==='all'?'active':''} aria-pressed={category==='all'} onClick={()=>setCategory('all')}>SEMUA KATEGORI</button>
     {shortcutGroups.map(group=><button type="button" key={group.id} className={category===group.id?'active':''} aria-pressed={category===group.id} onClick={()=>setCategory(group.id)}>{group.title}</button>)}
     {availableGroups.length>5&&<button type="button" className="catalog-category-more" aria-expanded={showAllCategories} onClick={()=>setShowAllCategories(value=>!value)}>{showAllCategories?'LEBIH SEDIKIT':'+ KATEGORI LAIN'}</button>}
    </div>
    <div className="catalog-control-row">
     <label className="catalog-search"><span className="sr-only">Cari menu</span><input type="search" value={query} onChange={event=>setQuery(event.target.value)} placeholder="Cari minuman, buah, makanan…" aria-label="Cari nama menu"/>{query&&<button type="button" onClick={()=>setQuery('')} aria-label="Hapus pencarian">×</button>}</label>
     <label className="catalog-control-select"><span>KATEGORI</span><select value={category} onChange={event=>setCategory(event.target.value)} aria-label="Pilih kategori"><option value="all">Semua kategori</option>{availableGroups.map(group=><option value={group.id} key={group.id}>{group.title}</option>)}</select></label>
     <label className="catalog-control-select catalog-sort"><span>URUTKAN</span><select value={sort} onChange={event=>setSort(event.target.value as Sort)} aria-label="Urutkan berdasarkan harga"><option value="default">Urutan menu</option><option value="low">Harga terendah</option><option value="high">Harga tertinggi</option></select></label>
    </div>
   </div>
   <div className="catalog-result-line" id="hasil-menu"><p aria-live="polite"><strong>{count}</strong> PILIHAN · {filtered.length} KATEGORI</p>{(family!=='all'||category!=='all'||query||sort!=='default')&&<button type="button" className="catalog-reset" onClick={reset}>RESET FILTER</button>}</div>
   {count===0?<div className="catalog-empty"><h3>Menu tidak ditemukan</h3><p>Coba kata lain atau reset filter.</p><button type="button" className="button" onClick={reset}>LIHAT SEMUA MENU</button></div>:sort!=='default'?<div className="catalog-price-list" aria-label={sort==='low'?'Menu dari harga terendah':'Menu dari harga tertinggi'}>
     {sortedItems.map(item=><article className="catalog-price-item" key={item.groupId+'-'+item.name}>
      <div><a className="catalog-price-category" href={categoryHref(item.groupId)}>{item.groupTitle}</a><h3>{item.name}</h3>{item.featured&&<span className="catalog-favorite">FAVORIT</span>}</div>
      <strong>{format(item.price)}</strong>
     </article>)}
    </div>:<div className="catalog-results">{filtered.map((group,index)=><section className="catalog-group" key={group.id} aria-labelledby={'cat-'+group.id}>
    <div className="catalog-group-top"><div><span className="catalog-index">{String(index+1).padStart(2,'0')} / {drinkIds.has(group.id)?'MINUMAN':'MAKANAN'}</span><h3 id={'cat-'+group.id}>{group.title}</h3><p>{group.subtitle}</p><a className="catalog-inline-cta" href={categoryHref(group.id)}>Lihat halaman {group.title}</a></div>{group.image&&<img src={group.image} alt={group.imageAlt||group.title} width="160" height="165" loading="lazy"/>}</div>
    <div className="catalog-item-grid">{group.items.map(item=><article className="catalog-item" key={item.name}><div><span className="catalog-item-name">{item.name}</span>{item.featured&&<span className="catalog-favorite">FAVORIT</span>}</div><strong>{format(item.price)}</strong></article>)}</div>
   </section>)}</div>}
   <aside className="catalog-note"><strong>INFO MENU</strong><p>Harga disalin dari materi menu JOJO; terdapat perbedaan harga pada sebagian materi. Silakan konfirmasi harga dan stok terbaru langsung ke outlet.</p><p><strong>TOPPING +Rp 4.000:</strong> Chia Seed, Bubble, Grass Jelly, Coffee Jelly, Rainbow Jelly, Nata De Coco, Popping Boba, Bouncing Pearl.</p></aside>
   <div className="jojo-official-menu-links"><span className="eyebrow">MATERI MENU RESMI</span><p>Butuh versi asli dari JOJO? Lihat menu melalui tautan Google Drive resmi.</p><div><a href={JOJO_LINKS.juiceMenu} target="_blank" rel="noopener noreferrer">MENU JOJO JUICE</a><a href={JOJO_LINKS.dailyBarMenu} target="_blank" rel="noopener noreferrer">MENU JOJO DAILY BAR</a></div></div>
   <div className="catalog-footer-cta"><div><h2>Pesan JOJO</h2></div><a className="button" href={JOJO_LINKS.esb} target="_blank" rel="noopener noreferrer">Pesan lewat ESB</a></div>
  </section>
 </div>;
}
