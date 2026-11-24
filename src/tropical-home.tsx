import {useEffect,useRef,useState} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {JojoMark,LogoText} from './jojo-mark';
import './madre-redesign.css';

const drinks=[
 {name:'DRAGON BALL',image:'/brands/jojo-dragon.webp',tone:'pink',note:'Bold, playful, dan penuh karakter.'},
 {name:'FRESH JOJO',image:'/brands/jojo-refresh.webp',tone:'yellow',note:'Pilihan fruity buat refresh harimu.'},
 {name:'GREEN N GLOW',image:'/brands/jojo-green.webp',tone:'blue',note:'Warna hijau dengan kesegaran tersendiri.'}
] as const;
type Filter='semua'|'fruity'|'green';

export default function TropicalHome(){
 const rootRef=useRef<HTMLDivElement>(null);
 const [filter,setFilter]=useState<Filter>('semua');
 const visible=drinks.filter((drink)=>filter==='semua'||(filter==='green'?drink.name==='GREEN N GLOW':drink.name!=='GREEN N GLOW'));
 useEffect(()=>{
  const root=rootRef.current;
  if(!root||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  gsap.registerPlugin(ScrollTrigger);
  const ctx=gsap.context(()=>{
   const timeline=gsap.timeline({defaults:{ease:'power3.out'}});
   timeline.from('.md-hero-kicker',{y:16,autoAlpha:0,duration:.6})
    .from('.md-hero-title',{y:40,autoAlpha:0,duration:1},'-=.35')
    .from('.md-hero-bottom',{y:22,autoAlpha:0,duration:.75},'-=.55')
    .fromTo('.md-hero-image img',{scale:1.12,autoAlpha:.7},{scale:1,autoAlpha:1,duration:1.5,ease:'power2.out'},0);
   gsap.utils.toArray<HTMLElement>('[data-md-reveal]').forEach(node=>{
    gsap.fromTo(node,{autoAlpha:0,y:32},{autoAlpha:1,y:0,duration:.85,ease:'power2.out',scrollTrigger:{trigger:node,start:'top 89%',once:true}});
   });
   gsap.matchMedia().add('(min-width: 768px)',()=>{
    gsap.to('.md-hero-image img',{yPercent:6,ease:'none',scrollTrigger:{trigger:'.md-hero',start:'top top',end:'bottom top',scrub:.8}});
   });
  },root);
  return ()=>ctx.revert();
 },[]);
 useEffect(()=>{
  const root=rootRef.current;if(!root||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const cards=root.querySelectorAll('.md-drink-card');
  const tween=gsap.fromTo(cards,{autoAlpha:0,y:16},{autoAlpha:1,y:0,duration:.45,stagger:.09,ease:'power2.out',overwrite:'auto'});
  return ()=>{tween.kill();gsap.set(cards,{clearProps:'all'});};
 },[filter]);
 return <div className="md-home" ref={rootRef}>
  <section className="md-hero" aria-labelledby="md-hero-title">
   <div className="md-hero-image"><img src="/brands/jojo-hero.webp" width="1080" height="1350" alt="Campaign minuman buah segar JOJO" fetchPriority="high"/></div>
   <div className="md-hero-shade" aria-hidden="true"/>
   <div className="md-hero-inner">
    <div className="md-hero-kicker"><span>FRUIT-BASED DRINKS</span><span>PONTIANAK · EST. 2007</span></div>
    <h1 id="md-hero-title" className="md-hero-title">FEEL<br/>FRESH.<br/><span>LIVE FUN.</span></h1>
    <div className="md-hero-bottom"><p>Jus buah fresh, mood makin asik. Dari kuliah sampai nongkrong, ada yang segar buat setiap momen.</p><a className="md-button md-button-white" href="/menu">LIHAT MENU</a></div>
   </div>
   <span className="md-hero-index" aria-hidden="true">01 / 05</span>
  </section>
  <div className="md-ticker" aria-label="Feel Fresh Live Fun"><div aria-hidden="true">FEEL FRESH <span>✳</span> LIVE FUN <span>✳</span> FEEL FRESH <span>✳</span> LIVE FUN <span>✳</span> FEEL FRESH <span>✳</span> LIVE FUN <span>✳</span></div></div>
  <section className="md-intro" aria-labelledby="md-intro-title">
   <div className="md-section-no" data-md-reveal>01 — TENTANG KAMI</div>
   <div className="md-intro-content" data-md-reveal><h2 id="md-intro-title">BUKAN<br/>CUMA<br/><span>JUS.</span></h2>
    <div className="md-intro-aside"><p>Lebih dari sekadar minuman. Sejak 2007, <JojoMark/> hadir di Pontianak sebagai teman di sela-sela harimu—dari sibuknya aktivitas sampai momen santai bareng orang terdekat.</p><a className="md-button md-button-red" href="/tentang">KENALAN LEBIH DEKAT</a></div>
   </div>
  </section>
  <section className="md-visual-break" aria-label="Momen segar bersama JOJO">
   <figure data-md-reveal><img src="/brands/jojo-together.webp" alt="Dua minuman JOJO dinikmati bersama" loading="lazy" width="960" height="1120"/></figure>
   <div className="md-visual-caption" data-md-reveal><span>THE GOOD STUFF</span><strong>FRESH SIP.<br/>BETTER MOOD.</strong></div>
  </section>
  <section className="md-drinks" id="menu-favorit" aria-labelledby="md-drinks-title">
   <div className="md-drinks-header" data-md-reveal><div><span className="md-section-no">02 — PILIHAN RASA</span><h2 id="md-drinks-title">TEMUKAN<br/><span>FAVORITMU.</span></h2></div><p>Beda rasa, beda cerita. Pilih yang paling cocok sama mood kamu hari ini.</p></div>
   <div className="md-filters" role="group" aria-label="Filter pilihan minuman">
    {([{id:'semua',label:'SEMUA RASA'},{id:'fruity',label:'FRUITY'},{id:'green',label:'FRESH & GREEN'}] as const).map(item=><button type="button" key={item.id} aria-pressed={filter===item.id} onClick={()=>setFilter(item.id)} className={filter===item.id?'md-filter active':'md-filter'}>{item.label}</button>)}
   </div>
   <div className="md-drink-grid">{visible.map((drink,i)=><a href="/menu" className={`md-drink-card md-tone-${drink.tone}`} key={drink.name}><div className="md-drink-image"><img src={drink.image} width="440" height="510" alt={drink.name} loading="lazy"/></div><div className="md-drink-info"><span>0{i+1}</span><h3>{drink.name}</h3><p>{drink.note}</p></div></a>)}</div>
   <a href="/menu" className="md-button md-button-outline md-view-menu">LIHAT SEMUA MENU</a>
  </section>
  <section className="md-manifesto" aria-labelledby="md-manifesto-title">
   <span className="md-section-no" data-md-reveal>03 — EVERYDAY MOMENTS</span>
   <h2 id="md-manifesto-title" data-md-reveal>GOOD DAYS<br/>START WITH<br/><span>A FRESH SIP.</span></h2>
   <div className="md-manifesto-row" data-md-reveal><p>Jalan sore, jeda kerja, atau kumpul bareng teman. Ada cerita kecil di setiap tegukan.</p><a className="md-button md-button-white" href="/outlet">CARI OUTLET</a></div>
   <div className="md-manifesto-photos"><figure data-md-reveal><img src="/brands/jojo-picnic.webp" loading="lazy" alt="JOJO saat piknik" width="800" height="980"/></figure><figure data-md-reveal><img src="/brands/jojo-moments.webp" loading="lazy" alt="Momen santai ditemani JOJO" width="800" height="980"/></figure></div>
  </section>
  <section className="md-find" aria-labelledby="md-find-title">
   <div className="md-find-copy" data-md-reveal><span className="md-section-no">04 — FIND US</span><h2 id="md-find-title">HAUS?<br/><span>DEKAT KOK.</span></h2><p><LogoText>{"JOJO hadir di 18 titik di Pontianak dan Singkawang. Cari outlet terdekat dan mampir buat rasa favoritmu."}</LogoText></p><a className="md-button md-button-red" href="/outlet">TEMUKAN OUTLET</a></div>
   <figure className="md-find-image" data-md-reveal><img src="/brands/jojo-juice.jpg" loading="lazy" alt="Produk minuman JOJO" width="800" height="950"/></figure>
  </section>
  <section className="md-last" aria-labelledby="md-last-title"><div data-md-reveal><span>05 — MAKE IT FRESH</span><h2 id="md-last-title">LAGI<br/>BUTUH YANG<br/><JojoMark size="heading"/>?</h2><a className="md-button md-button-white" href="/pesan">PESAN SEKARANG</a></div><span className="md-last-foot">FEEL FRESH. LIVE FUN.</span></section>
 </div>;
}
