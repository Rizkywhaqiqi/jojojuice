import {useState} from 'react';
import {ArrowUpRight,MapPin} from 'lucide-react';
import './tropical-home.css';

const drinks=[
 {name:'DRAGON BALL',desc:'Salah satu pilihan rasa JOJO yang penuh karakter.',image:'/brands/jojo-dragon.webp',category:'fruit',alt:'Minuman JOJO Dragon Ball'},
 {name:'FRESH JOJO',desc:'Pilihan jus buah untuk hari yang panjang.',image:'/brands/jojo-refresh.webp',category:'fruit',alt:'Minuman JOJO dalam kampanye Made to Refresh'},
 {name:'GREEN N GLOW',desc:'Pilihan segar dengan karakter rasa hijau.',image:'/brands/jojo-green.webp',category:'fresh',alt:'Minuman JOJO Green N Glow'}
] as const;
type Filter='all'|'fruit'|'fresh';
export default function TropicalHome(){
 const [filter,setFilter]=useState<Filter>('all');
 return <div className="jojo-tropical">
  <section className="jt-hero" aria-labelledby="jt-hero-title">
   <div className="jt-hero-copy"><span className="jt-eyebrow">DARI PONTIANAK, SEJAK 2007</span><h1 id="jt-hero-title">FEEL FRESH.<br/><em>LIVE FUN.</em></h1><p>Jus buah fresh buat menemani harimu. Dari kuliah, kerja, sampai nongkrong bareng teman.</p><div className="jt-hero-actions"><a className="jt-pill jt-pill-light" href="/menu">Lihat menu <ArrowUpRight size={18}/></a><a className="jt-hero-secondary" href="/outlet">Cari outlet <ArrowUpRight size={17}/></a></div></div>
   <figure className="jt-hero-visual"><img src="/brands/jojo-hero.webp" alt="Foto campaign minuman JOJO Juice" fetchPriority="high" width="1080" height="1350"/></figure>
  </section>
  <section className="jt-section jt-menu" id="menu-favorit" aria-labelledby="jt-menu-title"><p className="jt-label">PILIHAN RASA JOJO</p><div className="jt-section-head"><h2 id="jt-menu-title">PILIHAN<br/><em>RASA JOJO.</em></h2><p>Beberapa pilihan dari menu JOJO. Lihat menu lengkap untuk menemukan rasa favoritmu.</p></div>
   <div className="jt-filters" role="group" aria-label="Filter pilihan minuman">{([{value:'all',label:'Semua'},{value:'fruit',label:'Fruity'},{value:'fresh',label:'Fresh & Green'}] as const).map(f=><button key={f.value} type="button" aria-pressed={filter===f.value} className={filter===f.value?'jt-filter active':'jt-filter'} onClick={()=>setFilter(f.value)}>{f.label}</button>)}</div>
   <div className="jt-products">{drinks.filter(d=>filter==='all'||d.category===filter).map(d=><a href="/menu" className="jt-product" key={d.name}><div className="jt-product-image"><img src={d.image} alt={d.alt} width="430" height="470" loading="lazy" decoding="async"/></div><div className="jt-product-bottom"><div><h3>{d.name}</h3><p>{d.desc}</p></div><span className="jt-arrow" aria-hidden="true"><ArrowUpRight size={21}/></span></div></a>)}</div>
   <a className="jt-text-link" href="/menu">Lihat menu JOJO selengkapnya <ArrowUpRight size={18}/></a>
  </section>
  <section className="jt-story" aria-labelledby="jt-story-title"><div className="jt-story-image"><img src="/brands/jojo-together.webp" alt="Momen bersama JOJO Juice" loading="lazy" width="960" height="1120"/></div><div className="jt-story-copy"><span className="jt-eyebrow">CERITA JOJO</span><h2 id="jt-story-title">SEJAK<br/>2007.</h2><p>Berawal dari Pontianak, JOJO tumbuh bersama keseharian banyak orang. Dari mampir sebentar sampai duduk lama bersama teman.</p><a href="/tentang" className="jt-pill jt-pill-red">Kenalan lebih dekat <ArrowUpRight size={18}/></a></div></section>
  <section className="jt-location" aria-labelledby="jt-location-title"><div><span className="jt-label">OUTLET JOJO</span><h2 id="jt-location-title">KETEMU<br/>JOJO DI<br/>MANA?</h2><p>Temukan lokasi dan informasi outlet JOJO di Pontianak dan Singkawang.</p><a href="/outlet" className="jt-pill jt-pill-red">Cari outlet JOJO <MapPin size={18}/></a></div><div className="jt-location-photo"><img src="/brands/jojo-picnic.webp" alt="Minuman JOJO dalam suasana piknik" loading="lazy" width="800" height="900"/></div></section>
  <section className="jt-closing"><span className="jt-eyebrow">LAGI BUTUH YANG FRESH?</span><h2>JOJO AJA.</h2><p>Pilih menu yang kamu suka, lalu pesan lewat layanan yang tersedia.</p><a href="/pesan" className="jt-pill jt-pill-light">Pesan JOJO sekarang <ArrowUpRight size={18}/></a></section>
 </div>
}