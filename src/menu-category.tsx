import {useEffect, useRef, useState} from 'react';
import {format, type Group} from './menu-data';
import './menu-category.css';

const refresherProfiles=[
 {title:'Fruity & Tropical', drinks:[
  {id:'tropical-twist',name:'Tropical Twist', ingredients:'Nanas, jeruk Sunkist, kelapa', taste:'Rasa tropis yang ringan dengan sentuhan kelapa.'},
  {id:'inner-glow',name:'Inner Glow',ingredients:'Wortel, apel, jeruk Sunkist, jahe',taste:'Buah dan wortel dengan sedikit hangat dari jahe.'},
 ]},
 {title:'Fresh & Green', drinks:[
  {id:'green-n-glow',name:'Green N Glow',ingredients:'Apel, bayam, nanas, timun',taste:'Rasa hijau yang segar dengan manis-asam dari nanas.'},
  {id:'vitablends',name:'Vitablends',ingredients:'Jeruk, apel, bit, seledri',taste:'Perpaduan buah dengan karakter bit dan seledri.'},
 ]},
 {title:'Boost & Bold', drinks:[
  {id:'boost-immunity',name:'Boost Immunity',ingredients:'Jeruk Sunkist, jahe, madu',taste:'Rasa jeruk dengan sentuhan jahe dan madu.'},
 ]},
 {title:'Crisp & Refreshing', drinks:[
  {id:'detoxify',name:'Detoxify',ingredients:'Semangka, jeruk nipis, seledri, jahe',taste:'Semangka yang ringan dengan rasa asam dari jeruk nipis.'},
 ]},
];

const refresherDrinks=refresherProfiles.flatMap(profile=>
 profile.drinks.map(drink=>({...drink, profile:profile.title}))
);
type RefresherDrink=(typeof refresherDrinks)[number];

function RefresherPicker({group}:{group:Group}){
 const dialogRef=useRef<HTMLDialogElement>(null);
 const storyRef=useRef<HTMLDivElement>(null);
 const [activeIndex,setActiveIndex]=useState(0);
 const active=refresherDrinks[activeIndex];
 const [selected,setSelected]=useState<RefresherDrink|null>(null);
 const priceFor=(name:string)=>group.items.find(item=>item.name===name)?.price;

 useEffect(()=>{
  const openFromHash=()=>{
   const drink=refresherDrinks.find(item=>window.location.hash==='#'+item.id);
   if(drink)setSelected(drink);
   else dialogRef.current?.close();
  };
  openFromHash();
  window.addEventListener('hashchange',openFromHash);
  return()=>window.removeEventListener('hashchange',openFromHash);
 },[]);

 useEffect(()=>{
  const dialog=dialogRef.current;
  if(selected&&dialog&&!dialog.open)dialog.showModal();
 },[selected]);

 useEffect(()=>{
  const panels=Array.from(storyRef.current?.querySelectorAll<HTMLElement>('.refresher-scroll-panel')??[]);
  let frame=0;
  const update=()=>{
   frame=0;
   const readingLine=window.innerHeight*(window.innerWidth<=760?.73:.52);
   let current=0;
   panels.forEach((panel,index)=>{
    if(panel.getBoundingClientRect().top<=readingLine)current=index;
   });
   setActiveIndex(current);
  };
  const schedule=()=>{
   if(!frame)frame=requestAnimationFrame(update);
  };
  update();
  window.addEventListener('scroll',schedule,{passive:true});
  window.addEventListener('resize',schedule);
  return()=>{
   cancelAnimationFrame(frame);
   window.removeEventListener('scroll',schedule);
   window.removeEventListener('resize',schedule);
  };
 },[]);

 function openDrink(id:string){
  const drink=refresherDrinks.find(item=>item.id===id);
  if(!drink)return;
  window.history.replaceState(window.history.state,'','#'+id);
  setSelected(drink);
 }

 function closeDrink(){
  if(!selected)return;
  const url=new URL(window.location.href);
  if(url.hash==='#'+selected.id){
   url.hash='pilihan-kategori';
   window.history.replaceState(window.history.state,'',url);
  }
  document.getElementById(selected.id)?.focus({preventScroll:true});
  setSelected(null);
 }

 const selectedPrice=selected?priceFor(selected.name):undefined;

 return <>
  <p className="refresher-picker-intro">Ketuk varianmu buat cek bahan dan rasanya.</p>
  <div className="refresher-scroll" ref={storyRef}>
   <div className="refresher-scroll-stage" aria-hidden="true">
    <div className="refresher-cup-display" data-variant={active.id} key={active.id}>
     <div className="refresher-cup-lid"/>
     <div className="refresher-cup">
      <img src="/brands/jojo-logo.svg" alt=""/>
      <span>{active.name}</span>
     </div>
    </div>
   </div>
   <div className="refresher-scroll-panels">
    {refresherDrinks.map(drink=>{
     const price=priceFor(drink.name);
     return <section className="refresher-scroll-panel" key={drink.id} aria-labelledby={drink.id+'-title'}>
      <p className="eyebrow">{drink.profile}</p>
      <h3 id={drink.id+'-title'}>{drink.name}</h3>
      <p>{drink.taste}</p>
      {price!==undefined&&<strong>{format(price)}</strong>}
      <button type="button" className="button refresher-choice" id={drink.id} aria-haspopup="dialog"
       onClick={()=>openDrink(drink.id)}>Cek bahan dan rasa</button>
     </section>;
    })}
   </div>
  </div>
  <dialog className="refresher-dialog" ref={dialogRef} aria-labelledby="refresher-variant-title" onClose={closeDrink}
   onClick={event=>{if(event.target===event.currentTarget)event.currentTarget.close()}}>
   {selected&&<div className="refresher-dialog-body">
    <button type="button" className="refresher-dialog-close" aria-label="Tutup detail varian"
     onClick={()=>dialogRef.current?.close()} autoFocus>
     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>
    </button>
    <p className="eyebrow">{selected.profile}</p>
    <h2 id="refresher-variant-title">{selected.name}</h2>
    {selectedPrice!==undefined&&<strong className="refresher-dialog-price">{format(selectedPrice)}</strong>}
    <dl>
     <dt>Bahan</dt><dd>{selected.ingredients}</dd>
     <dt>Rasanya</dt><dd>{selected.taste}</dd>
    </dl>
    <a className="button" href="/how-to-order#order-platforms">Pilih layanan pesan</a>
   </div>}
  </dialog>
 </>;
}

export default function MenuCategory({group}:{group:Group}){
 const refresher=group.id==='refresher';
 const prices=group.items.map(item=>item.price);
 return <div className="menu-category">
  <section className={`menu-category-hero${group.image?' has-image':''}`}>
   <div>
    <a className="menu-category-back" href="/menu#pilihan-menu">Kembali ke katalog</a>
    {refresher&&<p className="eyebrow">{group.title}</p>}
    <h1>{refresher?'Nature’s Goodness':group.title}</h1>
    {refresher?<div className="refresher-positioning">
     <strong>Fresh Fruit &amp; Vegetable Blends</strong>
     <p>Racikan buah dan sayur yang segar dan praktis buat nemenin harimu.</p>
     <p className="refresher-price-range">{format(Math.min(...prices))}–{format(Math.max(...prices))} per cup</p>
    </div>:<p>{group.subtitle}</p>}
    <div className="menu-category-actions">
     <a className="button" href="#pilihan-kategori">{refresher?'Cek bahan minuman':'Lihat pilihan'}</a>
     <a className="button outline" href="/how-to-order#order-platforms">Pesan JOJO</a>
    </div>
   </div>
   {group.image&&<img src={group.image} alt={group.imageAlt??''} fetchPriority="high"/>}
  </section>
  <section className="section menu-category-list" id="pilihan-kategori">
   <h2>{refresher?'Kenali enam racikannya':'Pilihan menu'}</h2>
   {refresher?<RefresherPicker group={group}/>:<div>{group.items.map(item=><article className="menu-category-item" key={item.name}>
    <h3>{item.name}</h3><strong>{format(item.price)}</strong>
   </article>)}</div>}
   {refresher&&<section className="refresher-goodness" aria-labelledby="refresher-goodness-title">
    <div>
     <h2 id="refresher-goodness-title">Goodness in Every Blend</h2>
     <p>Lagi cari minuman yang segar buat sehari-hari? Pilih racikan yang cocok sama seleramu.</p>
    </div>
    <dl>
     <dt>Bahan gampang dicek</dt>
     <dd>Ketuk varian untuk lihat buah, sayur, dan bahan lain di dalamnya.</dd>
     <dt>Rasa sesuai selera</dt>
     <dd>Ada yang tropis, ringan, sampai jeruk dengan sentuhan jahe.</dd>
     <dt>Praktis buat sehari-hari</dt>
     <dd>Tinggal pilih racikanmu buat jeda kerja, habis kelas, atau sambil jalan.</dd>
    </dl>
   </section>}
   <p className="menu-category-note">Harga dan ketersediaan bisa berbeda di tiap gerai atau aplikasi.</p>
   <a className="button" href="/how-to-order#order-platforms">Pilih layanan pesan</a>
  </section>
 </div>;
}
