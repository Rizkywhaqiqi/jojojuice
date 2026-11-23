import {useState} from 'react';
import {ArrowUpRight,MapPin} from 'lucide-react';
import './tropical-home.css';

const drinks=[
 {name:'DRAGON BALL',desc:'Bright, bold, full of JOJO energy.',image:'/brands/jojo-dragon.webp',category:'fruit',alt:'Minuman JOJO Dragon Ball'},
 {name:'FRESH JOJO',desc:'Segar buat nemenin hari kamu.',image:'/brands/jojo-refresh.webp',category:'fruit',alt:'Minuman JOJO dalam kampanye Made to Refresh'},
 {name:'GREEN N GLOW',desc:'Fresh greens, good mood.',image:'/brands/jojo-green.webp',category:'fresh',alt:'Minuman JOJO Green N Glow'}
] as const;
type Filter='all'|'fruit'|'fresh';
export default function TropicalHome(){
 const [filter,setFilter]=useState<Filter>('all');
 return <div className="jojo-tropical">
  <section className="jt-hero" aria-labelledby="jt-hero-title">
   <div className="jt-hero-copy"><span className="jt-eyebrow">JUS BUAH · FRESH EVERYDAY · PONTIANAK</span><h1 id="jt-hero-title">FEEL<br/>FRESH.<br/><em>LIVE FUN!</em></h1><p>Segarnya buah, serunya hari. Dari kuliah sampai nongkrong, ada JOJO buat nemenin setiap momen.</p><a className="jt-pill jt-pill-light" href="#menu-favorit">Temukan rasa favoritmu <ArrowUpRight size={18}/></a></div>
   <div className="jt-hero-visual"><span className="jt-hero-circle" aria-hidden="true"/><span className="jt-sticker" aria-hidden="true">FRESH<br/>EVERY<br/>DAY!</span><img src="/brands/jojo-refresh.webp" alt="JOJO Juice fresh drink campaign" fetchPriority="high" width="620" height="720"/><span className="jt-hero-tag">#FeelFreshLiveFun</span></div>
  </section>
  <div className="jt-ticker" aria-label="Feel Fresh, Live Fun"><span aria-hidden="true">✳ FEEL FRESH, LIVE FUN ✳ LAGI BUTUH YANG FRESH? JOJO AJA ✳ FRESH SIP, BETTER MOOD ✳ FEEL FRESH, LIVE FUN ✳ LAGI BUTUH YANG FRESH? JOJO AJA ✳ FRESH SIP, BETTER MOOD&nbsp;</span></div>
  <section className="jt-section jt-menu" id="menu-favorit" aria-labelledby="jt-menu-title"><p className="jt-label">PILIHAN RASA JOJO</p><div className="jt-section-head"><h2 id="jt-menu-title">YOUR DAILY<br/><em>FRESH FIX.</em></h2><p>Mau yang fruity, creamy, atau refreshing? Temukan rasa JOJO buat mood kamu hari ini.</p></div>
   <div className="jt-filters" role="group" aria-label="Filter pilihan minuman">{([{value:'all',label:'Semua'},{value:'fruit',label:'Fruity'},{value:'fresh',label:'Fresh & Green'}] as const).map(f=><button key={f.value} type="button" aria-pressed={filter===f.value} className={filter===f.value?'jt-filter active':'jt-filter'} onClick={()=>setFilter(f.value)}>{f.label}</button>)}</div>
   <div className="jt-products">{drinks.filter(d=>filter==='all'||d.category===filter).map((d,i)=><a href="/menu" className="jt-product" key={d.name}><div className="jt-product-image"><img src={d.image} alt={d.alt} width="430" height="470" loading="lazy" decoding="async"/></div><div className="jt-product-bottom"><div><h3>{d.name}</h3><p>{d.desc}</p></div><span className="jt-arrow" aria-hidden="true"><ArrowUpRight size={21}/></span></div></a>)}</div>
   <a className="jt-text-link" href="/menu">Lihat menu JOJO selengkapnya <ArrowUpRight size={18}/></a>
  </section>
  <section className="jt-story" aria-labelledby="jt-story-title"><div className="jt-story-image"><img src="/brands/jojo-together.webp" alt="Momen bersama JOJO Juice" loading="lazy" width="960" height="1120"/></div><div className="jt-story-copy"><span className="jt-eyebrow">HELLO, WE'RE JOJO!</span><h2 id="jt-story-title">FRESH<br/>SINCE 2007.</h2><p>Lahir di Pontianak dan terus tumbuh bersama banyak cerita. JOJO adalah teman minum yang santai, seru, dan selalu ada buat berbagai momen harianmu.</p><a href="/tentang" className="jt-pill jt-pill-red">Kenalan lebih dekat <ArrowUpRight size={18}/></a></div></section>
  <section className="jt-location" aria-labelledby="jt-location-title"><div><span className="jt-label">JOJO NEAR YOU</span><h2 id="jt-location-title">SEGERNYA<br/>DEKAT<br/>KAMU.</h2><p>Lagi di mana? Cari outlet JOJO terdekat dan temukan lokasi favorit untuk isi ulang mood fresh kamu.</p><a href="/outlet" className="jt-pill jt-pill-red">Cari outlet JOJO <MapPin size={18}/></a></div><div className="jt-location-art" aria-hidden="true"><span className="jt-location-ring"/><span className="jt-location-ring jt-location-ring-outer"/><span className="jt-pin">JOJO<br/>HERE!</span></div></section>
  <section className="jt-closing"><span className="jt-eyebrow">ALWAYS READY FOR A FRESH SIP</span><h2>MAKE TODAY<br/>FRESHER.</h2><p>Sedikit segar bisa bikin hari lebih seru. Yuk, pilih JOJO kamu sekarang!</p><a href="/pesan" className="jt-pill jt-pill-light">Pesan JOJO sekarang <ArrowUpRight size={18}/></a></section>
 </div>
}