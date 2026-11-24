import {useEffect,useState} from 'react';
import {ArrowUpRight,MapPin} from 'lucide-react';
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
 useEffect(()=>{
  const root=document.querySelector<HTMLElement>('.jojo-tropical');
  const nodes=Array.from(document.querySelectorAll<HTMLElement>('.jojo-tropical [data-reveal]'));
  root?.classList.add('jt-motion-ready');
  if(!('IntersectionObserver' in window)||window.matchMedia('(prefers-reduced-motion: reduce)').matches){
   nodes.forEach(node=>node.classList.add('is-visible'));
   return;
  }
  const observer=new IntersectionObserver(entries=>{
   for(const entry of entries){
    if(entry.isIntersecting){
     entry.target.classList.add('is-visible');
     observer.unobserve(entry.target);
    }
   }
  },{threshold:0.12,rootMargin:'0px 0px -35px 0px'});
  nodes.forEach(node=>observer.observe(node));
  return ()=>observer.disconnect();
 },[]);
 return <div className="jojo-tropical">
  <section className="jt-hero" aria-labelledby="jt-hero-title">
   <div className="jt-hero-copy jt-enter"><span className="jt-eyebrow">DARI PONTIANAK, SEJAK 2007</span><h1 id="jt-hero-title">FEEL FRESH.<br/><em>LIVE FUN.</em></h1><p>Jus buah fresh buat menemani harimu. Dari kuliah, kerja, sampai nongkrong bareng teman.</p><div className="jt-hero-actions"><a className="jt-pill jt-pill-light" href="/menu">Lihat menu <ArrowUpRight size={18}/></a><a className="jt-hero-secondary" href="/outlet">Cari outlet <ArrowUpRight size={17}/></a></div></div>
   <figure className="jt-hero-visual jt-enter-photo"><span className="jt-condensation" aria-hidden="true"/><img src="/brands/jojo-hero.webp" alt="Foto campaign minuman JOJO Juice" fetchPriority="high" width="1080" height="1350"/></figure>
  </section>
  <section className="jt-section jt-menu" id="menu-favorit" aria-labelledby="jt-menu-title"><p className="jt-label">01 / MENU PILIHAN</p><div className="jt-section-head" data-reveal><h2 id="jt-menu-title">PILIHAN<br/><em>RASA JOJO.</em></h2><p>Beberapa pilihan dari menu JOJO. Lihat menu lengkap untuk menemukan rasa favoritmu.</p></div>
   <div className="jt-filters" role="group" aria-label="Filter pilihan minuman">{([{value:'all',label:'Semua'},{value:'fruit',label:'Fruity'},{value:'fresh',label:'Fresh & Green'}] as const).map(f=><button key={f.value} type="button" aria-pressed={filter===f.value} className={filter===f.value?'jt-filter active':'jt-filter'} onClick={()=>setFilter(f.value)}>{f.label}</button>)}</div>
   <div className="jt-products" data-reveal>{drinks.filter(d=>filter==='all'||d.category===filter).map(d=><a href="/menu" className="jt-product" key={d.name}><div className="jt-product-image"><img src={d.image} alt={d.alt} width="430" height="470" loading="lazy" decoding="async"/></div><div className="jt-product-bottom"><div><h3>{d.name}</h3><p>{d.desc}</p></div><span className="jt-arrow" aria-hidden="true"><ArrowUpRight size={21}/></span></div></a>)}</div>
   <a className="jt-text-link" href="/menu">Lihat menu JOJO selengkapnya <ArrowUpRight size={18}/></a>
  </section>
  <section className="je-overview" aria-labelledby="je-overview-title" data-reveal>
    <div className="je-overview-heading"><span className="je-index">02 / KENALAN DULU</span><h2 id="je-overview-title">BRAND<br/>OVERVIEW.</h2></div>
    <div className="je-overview-copy"><p>JOJO Juice adalah brand Food and Beverage asal Pontianak yang menghadirkan minuman berbasis buah, ditemani pilihan makanan ringan sebagai pelengkap.</p><p>Sejak 2007, JOJO menemani momen kerja, kuliah, nongkrong, hingga bersantai bersama teman. Kini hadir di 18 titik di Pontianak dan Singkawang.</p><a href="/tentang" className="je-inline-link">Cerita lengkap JOJO <ArrowUpRight size={18}/></a></div>
  </section>
  <section className="je-moments" aria-labelledby="je-moments-title">
    <div className="je-moments-head" data-reveal><div><span className="je-index">03 / EVERYDAY MOMENTS</span><h2 id="je-moments-title">FRESH FOR<br/><em>EVERY MOMENT.</em></h2></div><p>Nggak perlu nunggu momen spesial. Yang penting ada waktu buat menikmati hari.</p></div>
    <div className="je-moments-gallery" data-reveal>
      <figure className="je-moment-large"><img src="/brands/jojo-together.webp" alt="Dua minuman JOJO dinikmati bersama" loading="lazy" width="1000" height="1200"/><figcaption>Bareng teman, lebih seru.</figcaption></figure>
      <figure><img src="/brands/jojo-picnic.webp" alt="JOJO menemani piknik santai" loading="lazy" width="1000" height="1200"/><figcaption>Jeda sebentar, lanjut lagi.</figcaption></figure>
      <figure><img src="/brands/jojo-moments.webp" alt="Minuman JOJO di suasana luar ruangan" loading="lazy" width="1000" height="1200"/><figcaption>Bawa segarnya ke mana aja.</figcaption></figure>
    </div>
  </section>
  <section className="jt-location" data-reveal aria-labelledby="jt-location-title"><div><span className="jt-label">04 / TEMUKAN JOJO</span><h2 id="jt-location-title">MAU JOJO?<br/>DEKAT KOK.</h2><p>Cari outlet JOJO terdekat, lihat alamat, lalu mampir buat minuman favoritmu.</p><a href="/outlet" className="jt-pill jt-pill-red">Cari outlet JOJO <MapPin size={18}/></a></div><div className="jt-location-photo"><img src="/brands/jojo-juice.jpg" alt="Momen JOJO di keseharian" loading="lazy" width="800" height="900"/></div></section>
  <section className="jt-closing" data-reveal><span className="jt-eyebrow">LAGI BUTUH YANG FRESH?</span><h2>JOJO AJA.</h2><p>Pilih menu yang kamu suka, lalu pesan lewat layanan yang tersedia.</p><a href="/pesan" className="jt-pill jt-pill-light">Pesan JOJO sekarang <ArrowUpRight size={18}/></a></section>
 </div>
}