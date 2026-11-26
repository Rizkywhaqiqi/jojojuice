import {useEffect, useRef, useState} from 'react';
import {format, type Group} from './menu-data';
import './menu-category.css';

const refresherProfiles=[
 {title:'Fruity & Tropical', tagline:'Your fruity kind of goodness.', description:'Buat kamu yang suka rasa buah yang familiar dan segar.', drinks:[
  {id:'tropical-twist',tagline:'A taste of tropical goodness.',name:'Tropical Twist', ingredients:'Nanas, jeruk Sunkist, kelapa', taste:'Nanas dan jeruk membuka dengan rasa segar, lalu kelapa memberi sentuhan tropis.'},
  {id:'inner-glow',tagline:'Nourish from within.',name:'Inner Glow',ingredients:'Wortel, apel, jeruk Sunkist, jahe',taste:'Wortel dan apel memberi rasa manis, disusul jeruk dan hangatnya jahe.'},
 ]},
 {title:'Fresh & Green', tagline:'A greener kind of freshness.', description:'Buat kamu yang ingin coba perpaduan buah dan sayur dengan rasa segar.', drinks:[
  {id:'green-n-glow',tagline:'A greener kind of freshness.',name:'Green N Glow',ingredients:'Apel, bayam, nanas, timun',taste:'Bayam dan timun memberi karakter hijau. Apel dan nanas menambah rasa manis-asam.'},
  {id:'vitablends',tagline:'Naturally vibrant, freshly juiced.',name:'Vitablends',ingredients:'Jeruk, apel, bit, seledri',taste:'Bit memberi warna merah pekat. Jeruk dan apel menyeimbangkan karakter bit dan seledri.'},
 ]},
 {title:'Boost & Bold', tagline:'A little boost, a lot of character.', description:'Buat kamu yang suka rasa jeruk yang kuat dengan sentuhan jahe.', drinks:[
  {id:'boost-immunity',tagline:'Bright citrus, a little ginger taste.',name:'Boost Immunity',ingredients:'Jeruk Sunkist, jahe, madu',taste:'Jeruk membuka dengan rasa cerah. Jahe memberi hangat dan madu memberi manis.'},
 ]},
 {title:'Crisp & Refreshing', tagline:'Keep it fresh, keep it fruity.', description:'Buat kamu yang cari minuman buah yang segar dan ringan.', drinks:[
  {id:'detoxify',tagline:'Light, fruity, and refreshing.',name:'Detoxify',ingredients:'Semangka, jeruk nipis, seledri, jahe',taste:'Semangka jadi rasa utamanya. Jeruk nipis memberi asam segar, dengan sentuhan seledri dan jahe.'},
 ]},
];

const refresherDrinks=refresherProfiles.flatMap(profile=>
 profile.drinks.map(drink=>({...drink, profile:profile.title, profileTagline:profile.tagline, description:profile.description}))
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
   if(!stage||stage.height===0)return;
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

 return <section className="refresher-stories" id="cerita-refresher" aria-labelledby="refresher-stories-title">
  <h2 id="refresher-stories-title">Kenali enam racikannya</h2>
  <p className="refresher-stories-deck" lang="en">A refreshing blend of <strong>fruits and vegetables</strong>, making everyday <strong>wellness</strong> more enjoyable.</p>
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
       <p lang="en" className="refresher-poster-tagline">{drink.tagline}</p>
      </header>
      <img className="refresher-poster-photo" src={`/brands/refresher/ingredients-${drink.id}.webp`}
       width="480" height="480" alt="" loading="lazy" decoding="async"/>
      <div className="refresher-poster-copy">
       <p className="refresher-poster-ingredients"><strong>Komposisi</strong>{drink.ingredients}</p>
       <p className="refresher-poster-benefit"><strong>Pas buat kamu</strong>{drink.description}</p>
       <div className="refresher-poster-actions">
        {price!==undefined&&<strong>{format(price)}</strong>}
        <button type="button" className="button refresher-choice" aria-haspopup="dialog"
         onClick={event=>onDetails(drink,event.currentTarget)} aria-label={`Cek profil rasa ${drink.name}`}>Cek profil rasa</button>
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
 const originalHash=useRef<string|null>(null);
 const swipeStart=useRef<{id:number;x:number;y:number}|null>(null);
 const pickerRef=useRef<HTMLDivElement>(null);
 const featureRef=useRef<HTMLElement>(null);
 const [visible,setVisible]=useState(false);
 const [interacting,setInteracting]=useState(false);
 const [pageVisible,setPageVisible]=useState(()=>!document.hidden);
 const [reducedMotion,setReducedMotion]=useState(()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches);
 const [{activeIndex,previousIndex},setSlide]=useState({activeIndex:0,previousIndex:0});
 const active=refresherDrinks[activeIndex];
 const [selected,setSelected]=useState<RefresherDrink|null>(null);
 const priceFor=(name:string)=>group.items.find(item=>item.name===name)?.price;

 useEffect(()=>{
  const openFromHash=()=>{
   const hash=window.location.hash.slice(1);
   const index=refresherDrinks.findIndex(item=>item.id===hash||item.id+'-poster'===hash);
   if(index!==-1)setSlide(current=>current.activeIndex===index?current:{activeIndex:index,previousIndex:current.activeIndex});
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
  const observer=new IntersectionObserver(([entry])=>setVisible(entry.intersectionRatio>=.25),{threshold:.25});
  const hero=featureRef.current;
  if(hero)observer.observe(hero);
  preference.addEventListener('change',syncMotion);
  document.addEventListener('visibilitychange',syncVisibility);
  return()=>{
   observer.disconnect();
   preference.removeEventListener('change',syncMotion);
   document.removeEventListener('visibilitychange',syncVisibility);
  };
 },[]);

 const rotating=visible&&pageVisible&&!reducedMotion&&!selected&&!interacting;
 useEffect(()=>{
  if(!rotating)return;
  const timer=window.setTimeout(()=>setSlide(({activeIndex:index})=>({
   activeIndex:(index+1)%refresherDrinks.length,previousIndex:index
  })),3000);
  return()=>window.clearTimeout(timer);
 },[rotating,activeIndex]);

 function chooseSlide(index:number){
  window.history.replaceState(window.history.state,'','#'+refresherDrinks[index].id+'-poster');
  setSlide(current=>current.activeIndex===index?current:{activeIndex:index,previousIndex:current.activeIndex});
 }

 function openDrink(drink:RefresherDrink,trigger:HTMLButtonElement){
  dialogTrigger.current=trigger;
  originalHash.current=window.location.hash;
  window.history.replaceState(window.history.state,'','#'+drink.id);
  setSelected(drink);
 }

 function closeDrink(){
  if(!selected)return;
  const url=new URL(window.location.href);
  if(url.hash==='#'+selected.id){
   url.hash=originalHash.current??selected.id+'-poster';
   window.history.replaceState(window.history.state,'',url);
  }
  (dialogTrigger.current??pickerRef.current)?.focus({preventScroll:true});
  dialogTrigger.current=null;
  originalHash.current=null;
  setSelected(null);
 }

 const selectedPrice=selected?priceFor(selected.name):undefined;

 return <>
  <section className="refresher-feature" data-variant={active.id} ref={featureRef}
   onFocus={event=>{if(event.target.matches(':focus-visible'))setInteracting(true)}}
   onBlur={event=>{if(!event.currentTarget.contains(event.relatedTarget))setInteracting(false)}}>
   {activeIndex!==previousIndex&&<div className="refresher-feature-wipe" key={'wipe-'+active.id} data-variant={refresherDrinks[previousIndex].id} aria-hidden="true"/>}
   <p className="refresher-series-label">Refresher Series</p>
   <p className="refresher-slide-announcement" aria-live="polite">{interacting?active.name:null}</p>
   <div className="refresher-swipe-area" ref={pickerRef} tabIndex={0} role="group"
    aria-label="Varian Refresher, gunakan panah kiri dan kanan untuk mengganti varian"
    onKeyDown={event=>{
     if(event.key!=='ArrowLeft'&&event.key!=='ArrowRight')return;
     event.preventDefault();
     const count=refresherDrinks.length;
     chooseSlide((activeIndex+(event.key==='ArrowRight'?1:-1)+count)%count);
    }}
    onPointerDown={event=>{
     if(!event.isPrimary||event.button!==0)return;
     swipeStart.current={id:event.pointerId,x:event.clientX,y:event.clientY};
     event.currentTarget.setPointerCapture(event.pointerId);
    }}
    onPointerCancel={()=>{swipeStart.current=null}}
    onPointerUp={event=>{
     const start=swipeStart.current;
     swipeStart.current=null;
     if(!start||start.id!==event.pointerId)return;
     const dx=event.clientX-start.x,dy=event.clientY-start.y;
     if(Math.abs(dx)<48||Math.abs(dx)<Math.abs(dy)*1.25)return;
     const count=refresherDrinks.length;
     chooseSlide((activeIndex+(dx<0?1:-1)+count)%count);
    }}>
   <div className="refresher-feature-grid">
    <div className="refresher-feature-copy">
     <header className="refresher-feature-intro" lang="en">
      <h1>Enjoy the freshness</h1>
     </header>
     <div className="refresher-feature-title" key={active.id}>
      <p className="eyebrow">{active.profile}</p>
      <h2>{active.name}</h2>
     </div>
    </div>
    <div className="refresher-feature-cup" key={active.id}>
     <img src={`/brands/refresher/${active.id}.webp`} alt={`Cup JOJO ${active.name}`} width="360" height="600"/>
    </div>
   </div>
   </div>
   <div className="refresher-swipe-controls" role="group" aria-label="Navigasi varian Refresher">
    <button className="refresher-swipe-next refresher-swipe-prev" type="button" aria-label="Varian sebelumnya"
     onClick={()=>chooseSlide((activeIndex-1+refresherDrinks.length)%refresherDrinks.length)}>
     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 12H5m6-6-6 6 6 6"/></svg>
    </button>
    <button className="refresher-swipe-next refresher-swipe-forward" type="button" aria-label="Varian berikutnya"
     onClick={()=>chooseSlide((activeIndex+1)%refresherDrinks.length)}>
     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6"/></svg>
    </button>
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
     {selected.profileTagline!==selected.tagline&&<>
      <dt>{selected.profile}</dt><dd lang="en">{selected.profileTagline}</dd>
     </>}
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
  <section className={refresher?'refresher-closing menu-category-list':'section menu-category-list'} id="pilihan-kategori">
   {!refresher&&<>
    <h2>Pilihan menu</h2>
    {group.items.map(item=><article className="menu-category-item" key={item.name}>
     <h3>{item.name}</h3><strong>{format(item.price)}</strong>
    </article>)}
   </>}
   {refresher&&<section className="refresher-magazine" aria-labelledby="refresher-goodness-title">
    <header>
     <p className="eyebrow">Goodness in Every Blend</p>
     <h2 id="refresher-goodness-title" lang="en">Embrace the goodness</h2>
     <p className="refresher-magazine-deck">Tiga momen buat menikmati Refresher, dari istirahat siang sampai ketemu teman.</p>
    </header>
    <div className="refresher-magazine-spread">
    <figure className="refresher-magazine-lead">
     <div className="refresher-magazine-media"><img src="/brands/editorial/jojo-street-overhead.webp" alt="Dua teman menikmati makanan dan minuman JOJO dari sudut pandang atas" width="1200" height="1500" loading="lazy"/></div>
     <figcaption><h3>Jeda makan siang</h3><p>Keluar sebentar, cari makan siang, dan ambil satu cup untuk dinikmati sebelum balik beraktivitas.</p></figcaption>
    </figure>
    <div className="refresher-magazine-rail">
    <figure>
     <div className="refresher-magazine-media"><img src="/brands/editorial/jojo-street-moving.webp" alt="Dua orang berjalan sambil membawa minuman JOJO" width="1200" height="1500" loading="lazy"/></div>
     <figcaption><h3>Bawa buat di jalan</h3><p>Mampir ke gerai sebelum lanjut jalan. Kalau waktumu mepet, cek layanan pesan yang tersedia di lokasimu.</p></figcaption>
    </figure>
    <figure>
     <div className="refresher-magazine-media"><img src="/brands/editorial/jojo-street-moment.webp" alt="Dua teman membawa minuman JOJO di dekat tangga" width="1200" height="1500" loading="lazy"/></div>
     <figcaption><h3>Cobain bareng teman</h3><p>Kalau lagi nongkrong, pesan varian yang berbeda. Saling tukar cerita soal rasa mana yang paling kalian suka.</p></figcaption>
    </figure>
    </div>
    </div>
    <p className="refresher-magazine-signoff" lang="en">Real fruits. Real vegetables. Real refresher.</p>
   </section>}
   <p className="menu-category-note">Harga dan ketersediaan bisa berbeda di tiap gerai atau aplikasi.</p>
   <a className="button" href="/how-to-order#order-platforms">Pilih layanan pesan</a>
  </section>
 </div>;
}
