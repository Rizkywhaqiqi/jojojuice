import {useEffect, useRef, useState} from 'react';
import {format, type Group} from './menu-data';
import './menu-category.css';

const refresherProfiles=[
 {title:'Fruity & Tropical', drinks:[
  {id:'tropical-twist',benefit:'Buat teman makan siang saat kamu pengin yang segar dengan rasa buah yang familiar.',name:'Tropical Twist', ingredients:'Nanas, jeruk Sunkist, kelapa', taste:'Nanas dan jeruk membuka dengan rasa segar, lalu kelapa memberi sentuhan tropis.'},
  {id:'inner-glow',benefit:'Buat jeda sore kalau kamu pengin mencoba kombinasi buah dan wortel dalam satu gelas.',name:'Inner Glow',ingredients:'Wortel, apel, jeruk Sunkist, jahe',taste:'Wortel dan apel memberi rasa manis, disusul jeruk dan hangatnya jahe.'},
 ]},
 {title:'Fresh & Green', drinks:[
  {id:'green-n-glow',benefit:'Buat kamu yang baru mau coba racikan buah dan sayur dan suka rasa manis-asam.',name:'Green N Glow',ingredients:'Apel, bayam, nanas, timun',taste:'Bayam dan timun memberi karakter hijau. Apel dan nanas menambah rasa manis-asam.'},
  {id:'vitablends',benefit:'Buat kamu yang sudah biasa minum jus buah dan penasaran sama racikan bit.',name:'Vitablends',ingredients:'Jeruk, apel, bit, seledri',taste:'Bit memberi warna merah pekat. Jeruk dan apel menyeimbangkan karakter bit dan seledri.'},
 ]},
 {title:'Boost & Bold', drinks:[
  {id:'boost-immunity',benefit:'Buat kamu yang lebih suka rasa jahe yang terasa jelas di minuman dingin.',name:'Boost Immunity',ingredients:'Jeruk Sunkist, jahe, madu',taste:'Jeruk membuka dengan rasa cerah. Jahe memberi hangat dan madu memberi manis.'},
 ]},
 {title:'Crisp & Refreshing', drinks:[
  {id:'detoxify',benefit:'Buat jeda di hari panas saat kamu lagi pengin minuman dengan rasa ringan.',name:'Detoxify',ingredients:'Semangka, jeruk nipis, seledri, jahe',taste:'Semangka jadi rasa utamanya. Jeruk nipis memberi asam segar, dengan sentuhan seledri dan jahe.'},
 ]},
];

const refresherDrinks=refresherProfiles.flatMap(profile=>
 profile.drinks.map(drink=>({...drink, profile:profile.title}))
);
type RefresherDrink=(typeof refresherDrinks)[number];

function RefresherStories({group,onDetails}:{group:Group;onDetails:(drink:RefresherDrink,trigger:HTMLButtonElement)=>void}){
 const storyRef=useRef<HTMLDivElement>(null);
 const stageRef=useRef<HTMLDivElement>(null);
 const [activeIndex,setActiveIndex]=useState(0);
 const active=refresherDrinks[activeIndex];
 const [cupStatus,setCupStatus]=useState<Record<string,'ready'|'failed'>>({});
 const priceFor=(name:string)=>group.items.find(item=>item.name===name)?.price;
 useEffect(()=>{
  const panels=Array.from(storyRef.current?.querySelectorAll<HTMLElement>('.refresher-scroll-panel')??[]);
  let frame=0;
  const update=()=>{
   frame=0;
   const stage=stageRef.current?.getBoundingClientRect();
   if(!stage)return;
   const readingLine=stage.top+stage.height/2;
   let current=0;
   panels.forEach((panel,index)=>{
    if(panel.getBoundingClientRect().top<=readingLine)current=index;
   });
   setActiveIndex(current);
  };
  const schedule=()=>{
   if(!frame)frame=requestAnimationFrame(update);
  };
  const observer=new ResizeObserver(schedule);
  const stage=stageRef.current;
  if(stage)observer.observe(stage);
  panels.forEach(panel=>observer.observe(panel));
  update();
  window.addEventListener('scroll',schedule,{passive:true});
  window.addEventListener('resize',schedule);
  return()=>{
   cancelAnimationFrame(frame);
   observer.disconnect();
   window.removeEventListener('scroll',schedule);
   window.removeEventListener('resize',schedule);
  };
 },[]);

 return <section className="section refresher-stories" id="cerita-refresher" aria-labelledby="refresher-stories-title">
  <h2 id="refresher-stories-title">Kenali enam racikannya</h2>
  <div className="refresher-scroll" ref={storyRef}>
   <div className="refresher-scroll-stage" ref={stageRef} aria-hidden="true">
    {refresherDrinks.map(drink=><img className="refresher-cup-display" data-variant={drink.id} key={drink.id}
     data-active={drink.id===active.id&&cupStatus[drink.id]==='ready'}
     src={`/brands/refresher/${drink.id}.webp`} alt="" width="360" height="600"
     fetchPriority={drink.id===refresherDrinks[0].id?'auto':'low'}
     onLoad={()=>setCupStatus(status=>({...status,[drink.id]:'ready'}))}
     onError={()=>setCupStatus(status=>({...status,[drink.id]:'failed'}))}/>)}
    {cupStatus[active.id]!=='ready'&&<span className="refresher-cup-fallback" data-variant={active.id}>
     {cupStatus[active.id]==='failed'?'Foto belum tersedia':'Memuat foto…'}
    </span>}
   </div>
   <div className="refresher-scroll-panels">
    {refresherDrinks.map(drink=>{
     const price=priceFor(drink.name);
     return <section className="refresher-scroll-panel" key={drink.id} id={'cerita-'+drink.id} data-variant={drink.id} aria-labelledby={drink.id+'-title'}>
      <header className="refresher-poster-heading">
       <p className="eyebrow">{drink.profile}</p>
       <h3 id={drink.id+'-title'}>{drink.name}</h3>
      </header>
      <img className="refresher-ingredient-photo" src={`/brands/refresher/ingredients-${drink.id}.webp`}
       width="480" height="480" alt={drink.ingredients} loading="lazy" decoding="async"/>
      <div className="refresher-poster-copy">
       <p className="refresher-poster-benefit"><strong>Pas buat kamu</strong>{drink.benefit}</p>
       <div className="refresher-poster-actions">
        {price!==undefined&&<strong>{format(price)}</strong>}
        <button type="button" className="button refresher-choice" aria-haspopup="dialog"
         onClick={event=>onDetails(drink,event.currentTarget)}>Cek bahan dan rasa</button>
       </div>
      </div>
     </section>;
    })}
   </div>
  </div>
 </section>;
}

function RefresherPicker({group}:{group:Group}){
 const dialogRef=useRef<HTMLDialogElement>(null);
 const dialogTrigger=useRef<HTMLButtonElement>(null);
 const featureRef=useRef<HTMLElement>(null);
 const [playing,setPlaying]=useState(true);
 const [inView,setInView]=useState(false);
 const [pageVisible,setPageVisible]=useState(()=>!document.hidden);
 const [reducedMotion,setReducedMotion]=useState(()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches);
 const [hovered,setHovered]=useState(false);
 const [reading,setReading]=useState(false);
 const [activeIndex,setActiveIndex]=useState(0);
 const active=refresherDrinks[activeIndex];
 const [selected,setSelected]=useState<RefresherDrink|null>(null);
 const priceFor=(name:string)=>group.items.find(item=>item.name===name)?.price;

 useEffect(()=>{
  const openFromHash=()=>{
   const hash=window.location.hash.slice(1);
   const index=refresherDrinks.findIndex(item=>item.id===hash||item.id+'-poster'===hash);
   if(index!==-1){setActiveIndex(index);setPlaying(false)}
   if(index!==-1&&refresherDrinks[index].id===hash)setSelected(refresherDrinks[index]);
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
  const preference=window.matchMedia('(prefers-reduced-motion: reduce)');
  const syncMotion=()=>setReducedMotion(preference.matches);
  const syncVisibility=()=>setPageVisible(!document.hidden);
  const feature=featureRef.current;
  const observer=new IntersectionObserver(([entry])=>setInView(entry.isIntersecting),{threshold:.25});
  if(feature)observer.observe(feature);
  preference.addEventListener('change',syncMotion);
  document.addEventListener('visibilitychange',syncVisibility);
  return()=>{
   observer.disconnect();
   preference.removeEventListener('change',syncMotion);
   document.removeEventListener('visibilitychange',syncVisibility);
  };
 },[]);

 const rotating=playing&&inView&&pageVisible&&!reducedMotion&&!hovered&&!reading&&!selected;
 useEffect(()=>{
  if(!rotating)return;
  const timer=window.setTimeout(()=>setActiveIndex(index=>(index+1)%refresherDrinks.length),7000);
  return()=>window.clearTimeout(timer);
 },[rotating,activeIndex]);

 function openDrink(drink:RefresherDrink,trigger:HTMLButtonElement){
  dialogTrigger.current=trigger;
  window.history.replaceState(window.history.state,'','#'+drink.id);
  setSelected(drink);
 }

 function closeDrink(){
  if(!selected)return;
  const url=new URL(window.location.href);
  if(url.hash==='#'+selected.id){
   url.hash=selected.id+'-poster';
   window.history.replaceState(window.history.state,'',url);
  }
  (dialogTrigger.current??document.getElementById('refresher-details'))?.focus({preventScroll:true});
  dialogTrigger.current=null;
  setSelected(null);
 }

 const activePrice=priceFor(active.name);
 const selectedPrice=selected?priceFor(selected.name):undefined;

 return <>
  <section className="refresher-feature" data-variant={active.id} ref={featureRef}
   onPointerEnter={event=>{if(event.pointerType==='mouse')setHovered(true)}}
   onPointerLeave={()=>setHovered(false)}>
   <a className="menu-category-back" href="/menu#pilihan-menu">Kembali ke katalog</a>
   <h1>Refresher Series</h1>
   <div className="refresher-feature-grid" key={active.id} onFocus={()=>setReading(true)}
    onBlur={event=>{if(!event.currentTarget.contains(event.relatedTarget))setReading(false)}}>
    <div className="refresher-feature-copy" aria-live={rotating?'off':'polite'}>
     <p className="eyebrow">{active.profile}</p>
     <h2>{active.name}</h2>
     <p>{active.taste}</p>
     {activePrice!==undefined&&<strong>{format(activePrice)}</strong>}
     <button className="button" type="button" id="refresher-details" aria-haspopup="dialog" onClick={event=>openDrink(active,event.currentTarget)}>Cek bahan dan rasa</button>
    </div>
    <div className="refresher-feature-cup">
     <img src={`/brands/refresher/${active.id}.webp`} alt={`Cup JOJO ${active.name}`} width="360" height="600"/>
    </div>
    <div className="refresher-feature-ingredients">
     <img src={`/brands/refresher/ingredients-${active.id}.webp`} alt="" width="480" height="480"/>
     <ul aria-label="Bahan minuman">{active.ingredients.split(', ').map(ingredient=><li key={ingredient}>{ingredient}</li>)}</ul>
    </div>
   </div>
   <div className="refresher-feature-pagination">
    <span aria-label={`Varian ${activeIndex+1} dari ${refresherDrinks.length}`}>{String(activeIndex+1).padStart(2,'0')} / {String(refresherDrinks.length).padStart(2,'0')}</span>
    {!reducedMotion&&<button type="button" onClick={()=>setPlaying(value=>!value)}>{playing?'Jeda otomatis':'Putar otomatis'}</button>}
   </div>
   <div className="refresher-feature-controls" role="group" aria-label="Pilih varian Refresher">
    {refresherDrinks.map((drink,index)=><button type="button" key={drink.id} aria-pressed={activeIndex===index}
     onClick={()=>{
      window.history.replaceState(window.history.state,'','#'+drink.id+'-poster');
      setPlaying(false);
      setActiveIndex(index);
     }}>{drink.name}</button>)}
   </div>
  </section>
  <RefresherStories group={group} onDetails={openDrink}/>
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
 return <div className={refresher?'menu-category refresher-page':'menu-category'}>
  {refresher?<RefresherPicker group={group}/>:<section className={`menu-category-hero${group.image?' has-image':''}`}>
   <div>
    <a className="menu-category-back" href="/menu#pilihan-menu">Kembali ke katalog</a>
    <h1>{group.title}</h1>
    <p>{group.subtitle}</p>
    <div className="menu-category-actions">
     <a className="button" href="#pilihan-kategori">Lihat pilihan</a>
     <a className="button outline" href="/how-to-order#order-platforms">Pesan JOJO</a>
    </div>
   </div>
   {group.image&&<img src={group.image} alt={group.imageAlt??''} fetchPriority="high"/>}
  </section>}
  <section className="section menu-category-list" id="pilihan-kategori">
   {!refresher&&<>
    <h2>Pilihan menu</h2>
    {group.items.map(item=><article className="menu-category-item" key={item.name}>
     <h3>{item.name}</h3><strong>{format(item.price)}</strong>
    </article>)}
   </>}
   {refresher&&<section className="refresher-magazine" aria-labelledby="refresher-goodness-title">
    <header>
     <p className="eyebrow">Goodness in Every Blend</p>
     <h2 id="refresher-goodness-title">Sela hari bareng Refresher</h2>
     <p className="refresher-magazine-deck">Tiga momen buat menikmati Refresher, dari istirahat siang sampai ketemu teman.</p>
    </header>
    <figure className="refresher-magazine-lead">
     <img src="/brands/refresher/ingredients-tropical-twist.webp" alt="Nanas, jeruk, dan kelapa untuk Tropical Twist" width="480" height="480" loading="lazy"/>
     <figcaption><h3>Jeda makan siang</h3><p>Keluar sebentar, cari makan siang, dan ambil satu cup untuk dinikmati sebelum balik beraktivitas.</p></figcaption>
    </figure>
    <figure>
     <img src="/brands/refresher/ingredients-green-n-glow.webp" alt="Apel, bayam, nanas, dan timun untuk Green N Glow" width="480" height="480" loading="lazy"/>
     <figcaption><h3>Bawa buat di jalan</h3><p>Mampir ke gerai sebelum lanjut jalan. Kalau waktumu mepet, cek layanan pesan yang tersedia di lokasimu.</p></figcaption>
    </figure>
    <figure>
     <img src="/brands/refresher/ingredients-boost-immunity.webp" alt="Jeruk, jahe, dan madu untuk Boost Immunity" width="480" height="480" loading="lazy"/>
     <figcaption><h3>Cobain bareng teman</h3><p>Kalau lagi nongkrong, pesan varian yang berbeda. Saling tukar cerita soal rasa mana yang paling kalian suka.</p></figcaption>
    </figure>
   </section>}
   <p className="menu-category-note">Harga dan ketersediaan bisa berbeda di tiap gerai atau aplikasi.</p>
   <a className="button" href="/how-to-order#order-platforms">Pilih layanan pesan</a>
  </section>
 </div>;
}
