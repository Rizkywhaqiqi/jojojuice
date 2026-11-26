import {JOJO_TAGLINE, JOJO_TAGLINE_LEAD, JOJO_TAGLINE_END} from './brand-copy';
import {useCoordinatedVideo} from './use-coordinated-video';
import {JOJO_LINKS} from './jojo-links';
import './editorial-home.css';

const picks=[
 {name:'DRAGON BALL',query:'Dragon Ball',tag:'Special Series',image:'/brands/jojo-dragon.webp',tone:'yellow'},
 {name:'GREEN N GLOW',query:'Green N Glow',tag:'Refresher Series',image:'/brands/jojo-green.webp',tone:'pink'},
 {name:'Jus buah',query:'Fruit Juice',tag:'Fruit Juice',image:'/brands/jojo-refresh.webp',tone:'blue'}
];


function JOJOVideo({className='',label='Video JOJO Juice'}:{className?:string;label?:string}){
 const ref=useCoordinatedVideo();
 return <video className={className} ref={ref} src="/media/jojovid.mp4" poster="/media/jojovid-poster.webp" muted loop playsInline preload="metadata" aria-label={label}/>;
}
function JOJOMomentVideo({source,poster,label}:{source:string;poster:string;label:string}){
 const ref=useCoordinatedVideo();
 return <video ref={ref} src={source} poster={poster} muted loop playsInline preload="none" aria-label={label}/>;
}
function JOJOFilm(){return <section className="jojo-film" aria-label="Film pendek JOJO Juice"><div className="jojo-film-stage"><JOJOVideo label="Film produk minuman segar JOJO Juice"/></div></section>}

export default function EditorialHome(){
 return <div className="jojo-editorial">
  <section className="jojo-editorial-hero">
   <img className="jojo-editorial-hero-image" src="/brands/jojo-home-cooler-original-20261125.jpg" alt="Cooler box merah berisi empat minuman JOJO Juice di pantai tropis" width="2048" height="1143" fetchPriority="high"/>
   <div className="jojo-editorial-hero-shade"/>
   <div className="jojo-editorial-hero-content">
    <span className="jojo-editorial-kicker">PONTIANAK · EST. 2007</span>
    <h1>{JOJO_TAGLINE_LEAD.toUpperCase()}<br/><em>{JOJO_TAGLINE_END.toUpperCase()}</em></h1>
    <p>Fresh buat nemenin aktivitasmu.</p>
    <div className="jojo-editorial-actions">
     <a className="jojo-editorial-btn" href="/menu">Lihat menu</a>
     <a className="jojo-editorial-btn secondary" href="/how-to-order">Cara pesan</a>
    </div>
   </div>
  </section>

  <JOJOFilm/>

  <section className="jojo-tropical-story" aria-labelledby="jojo-tropical-title">
   <div className="jojo-tropical-content">
    <h2 id="jojo-tropical-title">Jus dari <em>Pontianak</em></h2>
    <p>Sejak 2007, JOJO hadir di Pontianak. Kamu bisa pilih jus satu rasa atau coba campuran buah favoritmu.</p>
    <a href="/menu" className="jojo-tropical-cta">Lihat pilihan jus</a>
   </div>
  </section>

  <section className="jojo-full-bleed-film" aria-label="Video JOJO saat jalan-jalan di kota">
   <div className="jojo-tropical-photo jojo-tropical-video" aria-label="Momen JOJO di kota">
    <JOJOMomentVideo source="/media/jojo-moments-1.mp4" poster="/media/jojo-moments-1-poster.webp" label="Video JOJO Juice saat jalan-jalan di kota"/>
   </div>
  </section>

  <section className="jojo-tropical-feature jojo-tropical-feature-video" aria-labelledby="jojo-feature-title">
   <div className="jojo-tropical-feature-copy">
    <h2 id="jojo-feature-title">Buat jeda <em>di tengah hari</em></h2>
    <p>Lagi istirahat kerja atau habis kelas? Mampir buat minum jus, ngopi, atau cari camilan.</p>
    <a href="/story" className="jojo-tropical-cta">Kenali JOJO</a>
   </div>
  </section>

  <section className="jojo-full-bleed-film" aria-label="Video JOJO bersama teman di luar ruangan">
   <div className="jojo-tropical-feature-photo jojo-tropical-video" aria-label="Momen JOJO bersama teman">
    <JOJOMomentVideo source="/media/jojo-moments-2.mp4" poster="/media/jojo-moments-2-poster.webp" label="Video JOJO Juice bersama teman di luar ruangan"/>
   </div>
  </section>

  <section className="jojo-paper jojo-picks" aria-labelledby="jojo-picks-title">
   <div className="jojo-picks-heading">
    <h2 id="jojo-picks-title">Pilihan <em>jus JOJO</em></h2>
   </div>
   <div className="jojo-picks-grid">{picks.map(p=><a className={`jojo-pick jojo-pick-${p.tone}`} key={p.name} href={`/menu?q=${encodeURIComponent(p.query)}#hasil-menu`}>
    <div className="jojo-pick-media"><img src={p.image} alt={p.name} loading="lazy"/></div>
    <div className="jojo-pick-details"><span className="jojo-pick-tag">{p.tag}</span><h3>{p.name}</h3><span className="jojo-pick-link">Lihat di menu</span></div>
   </a>)}</div>
  </section>

  <section className="jojo-gather" aria-labelledby="jojo-gather-title">
   <div className="jojo-gather-image"><img src="/brands/editorial/jojo-street-drink.webp" alt="Minuman JOJO Juice ungu ditampilkan di depan seorang teman yang sedang menikmati minuman" width="1200" height="1500" loading="lazy"/></div>
   <div className="jojo-gather-copy"><h2 id="jojo-gather-title">Cari <em>gerai JOJO</em></h2><p>Pilih kota untuk melihat cabang dan petunjuk arah.</p><a className="jojo-editorial-btn" href="/outlet">Lihat lokasi</a></div>
  </section>

  <section className="jojo-community-strip" aria-label="JOJO social media">
   <div className="jojo-community-photos">
    <a href={JOJO_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram JOJO - minuman Dragon Ball"><img src="/brands/jojo-dragon.webp" alt="Dragon Ball JOJO" loading="lazy"/></a>
    <a href={JOJO_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram JOJO - momen bersama"><img src="/brands/jojo-hero.webp" alt="Suasana segar JOJO Juice" loading="lazy"/></a>
    <a href={JOJO_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram JOJO - minuman segar"><img src="/brands/jojo-green.webp" alt="Minuman Green N Glow JOJO" loading="lazy"/></a>
    <a href={JOJO_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram JOJO - piknik"><img src="/brands/jojo-picnic.webp" alt="Momen piknik JOJO" loading="lazy"/></a>
   </div>
   <a className="jojo-editorial-btn" href={JOJO_LINKS.instagram} target="_blank" rel="noopener noreferrer">Ikuti @jojojuiceid</a>
  </section>

  <section className="jojo-last-call"><h2>Lagi butuh yang fresh? <em>JOJO aja.</em></h2><div className="jojo-editorial-actions"><a className="jojo-editorial-btn" href="/how-to-order">Cara pesan</a><a className="jojo-editorial-btn secondary" href={JOJO_LINKS.esb} target="_blank" rel="noopener noreferrer">Pesan lewat ESB</a></div><span className="jojo-last-small">{JOJO_TAGLINE.toUpperCase()} · JOJO JUICE</span></section>
 </div>;
}
