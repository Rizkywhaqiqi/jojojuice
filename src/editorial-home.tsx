import {useCoordinatedVideo} from './use-coordinated-video';
import {JOJO_LINKS} from './jojo-links';
import './editorial-home.css';

const picks=[
 {name:'DRAGON BALL',tag:'THE FUN ONE',image:'/brands/jojo-dragon.webp',tone:'yellow'},
 {name:'GREEN N GLOW',tag:'THE FRESH ONE',image:'/brands/jojo-green.webp',tone:'pink'},
 {name:'FRESH JOJO',tag:'THE EVERYDAY ONE',image:'/brands/jojo-refresh.webp',tone:'blue'}
];

function Spark({className=''}:{className?:string}){return <svg className={className} viewBox="0 0 90 90" fill="none" aria-hidden="true"><path d="M45 4c3 27 14 38 41 41-27 3-38 14-41 41C42 59 31 48 4 45 31 42 42 31 45 4Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/></svg>}

function JOJOVideo({className='',label='Video JOJO Juice'}:{className?:string;label?:string}){
 const ref=useCoordinatedVideo();
 return <video className={className} ref={ref} src="/media/jojovid.mp4" poster="/brands/jojo-photo-2.webp" muted loop playsInline preload="metadata" aria-label={label}/>;
}
function JOJOMomentVideo({source,poster,label}:{source:string;poster:string;label:string}){
 const ref=useCoordinatedVideo();
 return <video ref={ref} src={source} poster={poster} muted loop playsInline preload="metadata" aria-label={label}/>;
}
function JOJOFilm(){return <section className="jojo-film" aria-label="Film pendek JOJO Juice"><div className="jojo-film-stage"><JOJOVideo label="Film produk minuman segar JOJO Juice"/></div></section>}

export default function EditorialHome(){
 return <div className="jojo-editorial">
  <section className="jojo-editorial-hero">
   <img className="jojo-editorial-hero-image" src="/brands/jojo-home-cooler-landscape.jpg" alt="Cooler box merah berisi empat minuman JOJO Juice di pantai tropis" width="1920" height="1080" fetchPriority="high"/>
   <div className="jojo-editorial-hero-shade"/>
   <div className="jojo-editorial-hero-content">
    <span className="jojo-editorial-kicker">PONTIANAK · EST. 2007</span>
    <h1>FEEL <span>FRESH.</span><br/><em>LIVE FUN!</em></h1>
    <p>Rasa segar buat cerita seru setiap hari.</p>
    <div className="jojo-editorial-actions">
     <a className="jojo-editorial-btn" href="/menu">EXPLORE OUR MENU</a>
     <a className="jojo-editorial-btn secondary" href="/how-to-order">HOW TO ORDER</a>
    </div>
   </div>
   <span className="jojo-editorial-hero-side">GOOD MOOD, GOOD JUICE — SINCE 2007</span>
  </section>

  <JOJOFilm/>

  <section className="jojo-tropical-story" aria-labelledby="jojo-tropical-title">
   <div className="jojo-tropical-content">
    <span className="jojo-editorial-overline">HEY, WELCOME TO JOJO!</span>
    <h2 id="jojo-tropical-title">A LITTLE JOY<br/><em>IN EVERY SIP.</em></h2>
    <p>Segarnya buah, hangatnya matahari, dan momen seru yang selalu layak dirayakan. JOJO hadir dari Pontianak sejak 2007 untuk nemenin harimu.</p>
    <div className="jojo-tropical-highlights" aria-label="Karakter JOJO Juice">
     <span><strong>01</strong> REAL FRUITS</span>
     <span><strong>02</strong> FRESHLY BLENDED</span>
     <span><strong>03</strong> TROPICAL GOODNESS</span>
    </div>
    <a href="/menu" className="jojo-tropical-cta">EXPLORE OUR JUICES</a>
   </div>
  </section>

  <section className="jojo-full-bleed-film" aria-label="Video JOJO saat jalan-jalan di kota">
   <div className="jojo-tropical-photo jojo-tropical-video" aria-label="Momen JOJO di kota">
    <JOJOMomentVideo source="/media/jojo-moments-1.mp4" poster="/media/jojo-moments-1-poster.webp" label="Video JOJO Juice saat jalan-jalan di kota"/>
   </div>
  </section>

  <section className="jojo-tropical-feature jojo-tropical-feature-video" aria-labelledby="jojo-feature-title">
   <div className="jojo-tropical-feature-copy">
    <span className="jojo-editorial-overline">MADE FOR EVERYDAY MOMENTS</span>
    <h2 id="jojo-feature-title">MADE FRESH.<br/><em>MADE FOR FUN.</em></h2>
    <p>Dari jeda kuliah sampai nongkrong sore, selalu ada alasan buat menikmati yang fresh. Temukan JOJO favoritmu, lalu ajak teman buat berbagi cerita.</p>
    <a href="/story" className="jojo-tropical-cta">GET TO KNOW US</a>
   </div>
  </section>

  <section className="jojo-full-bleed-film" aria-label="Video JOJO bersama teman di luar ruangan">
   <div className="jojo-tropical-feature-photo jojo-tropical-video" aria-label="Momen JOJO bersama teman">
    <JOJOMomentVideo source="/media/jojo-moments-2.mp4" poster="/media/jojo-moments-2-poster.webp" label="Video JOJO Juice bersama teman di luar ruangan"/>
   </div>
  </section>

  <section className="jojo-paper jojo-picks" aria-labelledby="jojo-picks-title">
   <div className="jojo-picks-heading">
    <span className="jojo-editorial-overline">THE GOOD STUFF</span>
    <h2 id="jojo-picks-title">WHAT'S <em>YOUR</em><br/>FRESH MOOD?</h2>
    <p>Kenalan dengan beberapa rasa yang jadi bagian dari cerita JOJO.</p>
   </div>
   <div className="jojo-picks-grid">{picks.map((p,i)=><a className={`jojo-pick jojo-pick-${p.tone}`} key={p.name} href="/menu">
    <span className="jojo-pick-index">0{i+1} / JOJO FAVES</span>
    <div className="jojo-pick-media"><img src={p.image} alt={p.name} loading="lazy"/></div>
    <div className="jojo-pick-details"><span className="jojo-pick-tag">{p.tag}</span><h3>{p.name}</h3><span className="jojo-pick-link">SEE THE MENU</span></div>
   </a>)}</div>
  </section>

  <section className="jojo-gather" aria-labelledby="jojo-gather-title">
   <div className="jojo-gather-image"><img src="/brands/editorial/jojo-street-drink.webp" alt="Minuman JOJO Juice ungu ditampilkan di depan seorang teman yang sedang menikmati minuman" width="1200" height="1500" loading="lazy"/></div>
   <div className="jojo-gather-copy"><span className="jojo-editorial-overline">EVERY SIP IS A MOMENT</span><h2 id="jojo-gather-title">GATHER.<br/>SIP.<br/><em>REPEAT.</em></h2><p>Ketemu, ngobrol, ketawa, dan ulangi. Bikin hari biasa jadi sedikit lebih spesial bareng JOJO.</p><a className="jojo-editorial-btn" href="/outlet">FIND OUR OUTLETS</a></div>
  </section>

  <section className="jojo-community-strip" aria-label="JOJO social media">
   <div className="jojo-community-top"><span className="jojo-editorial-overline">FRESHNESS IN EVERY FEED</span><h2>STAY IN <em>THE LOOP.</em></h2><p>Ikuti cerita, menu terbaru, dan momen segar JOJO di Instagram.</p></div>
   <div className="jojo-community-photos">
    <a href={JOJO_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram JOJO - minuman Dragon Ball"><img src="/brands/jojo-dragon.webp" alt="Dragon Ball JOJO" loading="lazy"/></a>
    <a href={JOJO_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram JOJO - momen bersama"><img src="/brands/jojo-hero.webp" alt="Suasana segar JOJO Juice" loading="lazy"/></a>
    <a href={JOJO_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram JOJO - minuman segar"><img src="/brands/jojo-green.webp" alt="Minuman Green N Glow JOJO" loading="lazy"/></a>
    <a href={JOJO_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram JOJO - piknik"><img src="/brands/jojo-picnic.webp" alt="Momen piknik JOJO" loading="lazy"/></a>
   </div>
   <a className="jojo-editorial-btn" href={JOJO_LINKS.instagram} target="_blank" rel="noopener noreferrer">FOLLOW @JOJOJUICEID</a>
  </section>

  <section className="jojo-last-call"><Spark className="jojo-last-spark"/><span className="jojo-editorial-overline">ONE MORE SIP?</span><h2>YOUR FRESH<br/><em>MOMENT STARTS HERE.</em></h2><div className="jojo-editorial-actions"><a className="jojo-editorial-btn" href="/how-to-order">HOW TO ORDER</a><a className="jojo-editorial-btn secondary" href={JOJO_LINKS.esb} target="_blank" rel="noopener noreferrer">ORDER NOW</a></div><span className="jojo-last-small">FEEL FRESH. LIVE FUN. · JOJO JUICE</span></section>
 </div>;
}
