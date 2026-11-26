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
  {refresherProfiles.map(profile=><section className="menu-category-profile" key={profile.title}>
   <h3>{profile.title}</h3>
   <div>{profile.drinks.map(drink=>{
    const price=priceFor(drink.name);
    return <button type="button" className="menu-category-item refresher-choice" key={drink.id}
     id={drink.id} aria-haspopup="dialog" onClick={()=>openDrink(drink.id)}>
     <span><strong>{drink.name}</strong><span className="refresher-choice-label">Cek bahan dan rasa</span></span>
     <span className="refresher-choice-end">
      {price!==undefined&&<strong>{format(price)}</strong>}
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>
     </span>
    </button>;
   })}</div>
  </section>)}
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
 return <div className="menu-category">
  <section className={`menu-category-hero${group.image?' has-image':''}`}>
   <div>
    <a className="menu-category-back" href="/menu#pilihan-menu">Kembali ke katalog</a>
    {refresher&&<p className="eyebrow">{group.title}</p>}
    <h1>{refresher?'Nature’s Goodness':group.title}</h1>
    <p>{refresher?'Buah dan sayur dalam satu gelas. Lagi pengin yang tropis, ringan, atau ada sentuhan jahe? Pilih racikanmu di bawah.':group.subtitle}</p>
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
   <p className="menu-category-note">Harga dan ketersediaan bisa berbeda di tiap gerai atau aplikasi.</p>
   <a className="button" href="/how-to-order#order-platforms">Pilih layanan pesan</a>
  </section>
 </div>;
}
