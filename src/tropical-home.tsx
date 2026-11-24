import {LogoText} from './jojo-mark';
import {useEffect,useRef,useState} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {MapPin} from 'lucide-react';
import './tropical-home.css';
import './editorial-jojo.css';

const drinks=[
 {name:'DRAGON BALL',desc:'Salah satu pilihan rasa JOJO yang penuh karakter.',image:'/brands/jojo-dragon.webp',category:'fruit',alt:'Minuman JOJO Dragon Ball'},
 {name:'FRESH JOJO',desc:'Pilihan jus buah untuk hari yang panjang.',image:'/brands/jojo-refresh.webp',category:'fruit',alt:'Minuman JOJO dalam kampanye Made to Refresh'},
 {name:'GREEN N GLOW',desc:'Pilihan segar dengan karakter rasa hijau.',image:'/brands/jojo-green.webp',category:'fresh',alt:'Minuman JOJO Green N Glow'}
] as const;
type Filter='all'|'fruit'|'fresh';
export default function TropicalHome(){
 const [filter,setFilter]=useState<Filter>('all');

 const rootRef=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const root=rootRef.current;
  if(!root)return;
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  gsap.registerPlugin(ScrollTrigger);
  const context=gsap.context(()=>{
   const intro=gsap.timeline({defaults:{ease:'power3.out'}});
   intro.from('.jt-hero-copy .jt-eyebrow',{autoAlpha:0,y:14,duration:.55})
    .from('.jt-hero h1',{autoAlpha:0,y:32,duration:.9},'-=.3')
    .from('.jt-hero-copy p',{autoAlpha:0,y:20,duration:.65},'-=.5')
    .from('.jt-hero-actions',{autoAlpha:0,y:15,duration:.55},'-=.42')
    .fromTo('.jt-hero-visual img',{scale:1.065,autoAlpha:.6},{scale:1,autoAlpha:1,duration:1.35,ease:'power2.out'},0);
   root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((section)=>{
    gsap.fromTo(section,{autoAlpha:0,y:30},{autoAlpha:1,y:0,duration:.85,ease:'power2.out',
     scrollTrigger:{trigger:section,start:'top 88%',once:true}});
   });
   const media=gsap.matchMedia();
   media.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)',()=>{
    gsap.to('.jt-hero-visual img',{yPercent:4,ease:'none',scrollTrigger:{
     trigger:'.jt-hero',start:'top top',end:'bottom top',scrub:.6}});
   });
  },root);
  return ()=>context.revert();
 },[]);
 useEffect(()=>{
  if(!rootRef.current||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const cards=rootRef.current.querySelectorAll('.jt-product');
  const tween=gsap.fromTo(cards,{autoAlpha:0,y:14},{autoAlpha:1,y:0,duration:.48,stagger:.075,ease:'power2.out',overwrite:'auto'});
  return ()=>{tween.kill();gsap.set(cards,{clearProps:'opacity,visibility,transform'});};
 },[filter]);
 return <div className="jojo-tropical jt-gsap" ref={rootRef}>
  <section className="jt-hero" aria-labelledby="jt-hero-title">
   <div className="jt-hero-copy jt-enter"><span className="jt-eyebrow">DARI PONTIANAK, SEJAK 2007</span><h1 id="jt-hero-title">FEEL FRESH.<br/><em>LIVE FUN.</em></h1><p>Jus buah fresh buat menemani harimu. Dari kuliah, kerja, sampai nongkrong bareng teman.</p><div className="jt-hero-actions"><a className="jt-pill jt-pill-light" href="/menu">Lihat menu </a><a className="jt-hero-secondary" href="/outlet">Cari outlet </a></div></div>
   <figure className="jt-hero-visual jt-enter-photo"><span className="jt-condensation" aria-hidden="true"/><img src="/brands/jojo-hero.webp" alt="Foto campaign minuman JOJO Juice" fetchPriority="high" width="1080" height="1350"/></figure>
  </section>
  <section className="jt-section jt-menu" id="menu-favorit" aria-labelledby="jt-menu-title"><p className="jt-label">01 / MENU PILIHAN</p><div className="jt-section-head" data-reveal><h2 id="jt-menu-title">PILIHAN<br/><em><LogoText>{"RASA JOJO."}</LogoText></em></h2><p><LogoText>{"Beberapa pilihan dari menu JOJO. Lihat menu lengkap untuk menemukan rasa favoritmu."}</LogoText></p></div>
   <div className="jt-filters" role="group" aria-label="Filter pilihan minuman">{([{value:'all',label:'Semua'},{value:'fruit',label:'Fruity'},{value:'fresh',label:'Fresh & Green'}] as const).map(f=><button key={f.value} type="button" aria-pressed={filter===f.value} className={filter===f.value?'jt-filter active':'jt-filter'} onClick={()=>setFilter(f.value)}>{f.label}</button>)}</div>
   <div className="jt-products" data-reveal>{drinks.filter(d=>filter==='all'||d.category===filter).map(d=><a href="/menu" className="jt-product" key={d.name}><div className="jt-product-image"><img src={d.image} alt={d.alt} width="430" height="470" loading="lazy" decoding="async"/></div><div className="jt-product-bottom"><div><h3>{d.name}</h3><p>{d.desc}</p></div></div></a>)}</div>
   <a className="jt-text-link" href="/menu"><LogoText>{"Lihat menu JOJO selengkapnya "}</LogoText></a>
  </section>
  <section className="je-overview" aria-labelledby="je-overview-title" data-reveal>
    <div className="je-overview-heading"><span className="je-index">02 / KENALAN DULU</span><h2 id="je-overview-title">BRAND<br/>OVERVIEW.</h2></div>
    <div className="je-overview-copy"><p><LogoText>{"JOJO Juice adalah brand Food and Beverage asal Pontianak yang menghadirkan minuman berbasis buah, ditemani pilihan makanan ringan sebagai pelengkap."}</LogoText></p><p><LogoText>{"Sejak 2007, JOJO menemani momen kerja, kuliah, nongkrong, hingga bersantai bersama teman. Kini hadir di 18 titik di Pontianak dan Singkawang."}</LogoText></p><a href="/tentang" className="je-inline-link"><LogoText>{"Cerita lengkap JOJO "}</LogoText></a></div>
  </section>
  <section className="je-moments" aria-labelledby="je-moments-title">
    <div className="je-moments-head" data-reveal><div><span className="je-index">03 / EVERYDAY MOMENTS</span><h2 id="je-moments-title">FRESH FOR<br/><em>EVERY MOMENT.</em></h2></div><p>Nggak perlu nunggu momen spesial. Yang penting ada waktu buat menikmati hari.</p></div>
    <div className="je-moments-gallery" data-reveal>
      <figure className="je-moment-large"><img src="/brands/jojo-together.webp" alt="Dua minuman JOJO dinikmati bersama" loading="lazy" width="1000" height="1200"/><figcaption>Bareng teman, lebih seru.</figcaption></figure>
      <figure><img src="/brands/jojo-picnic.webp" alt="JOJO menemani piknik santai" loading="lazy" width="1000" height="1200"/><figcaption>Jeda sebentar, lanjut lagi.</figcaption></figure>
      <figure><img src="/brands/jojo-moments.webp" alt="Minuman JOJO di suasana luar ruangan" loading="lazy" width="1000" height="1200"/><figcaption>Bawa segarnya ke mana aja.</figcaption></figure>
    </div>
  </section>
  <section className="jt-location" data-reveal aria-labelledby="jt-location-title"><div><span className="jt-label"><LogoText>{"04 / TEMUKAN JOJO"}</LogoText></span><h2 id="jt-location-title"><LogoText>{"MAU JOJO?"}</LogoText><br/>DEKAT KOK.</h2><p><LogoText>{"Cari outlet JOJO terdekat, lihat alamat, lalu mampir buat minuman favoritmu."}</LogoText></p><a href="/outlet" className="jt-pill jt-pill-red"><LogoText>{"Cari outlet JOJO "}</LogoText><MapPin size={18}/></a></div><div className="jt-location-photo"><img src="/brands/jojo-juice.jpg" alt="Momen JOJO di keseharian" loading="lazy" width="800" height="900"/></div></section>
  <section className="jt-closing" data-reveal><span className="jt-eyebrow">LAGI BUTUH YANG FRESH?</span><h2><LogoText>{"JOJO AJA."}</LogoText></h2><p>Pilih menu yang kamu suka, lalu pesan lewat layanan yang tersedia.</p><a href="/pesan" className="jt-pill jt-pill-light"><LogoText>{"Pesan JOJO sekarang "}</LogoText></a></section>
 </div>
}