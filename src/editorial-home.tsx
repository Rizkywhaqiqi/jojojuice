import {useEffect,useRef,useState} from 'react';
import {JOJO_LINKS} from './jojo-links';
import './editorial-home.css';

const picks=[
 {name:'DRAGON BALL',tag:'THE FUN ONE',image:'/brands/jojo-dragon.webp',tone:'yellow'},
 {name:'GREEN N GLOW',tag:'THE FRESH ONE',image:'/brands/jojo-green.webp',tone:'pink'},
 {name:'FRESH JOJO',tag:'THE EVERYDAY ONE',image:'/brands/jojo-refresh.webp',tone:'blue'}
];

function SunDoodle({className=''}:{className?:string}){
 return <svg className={className} viewBox="0 0 140 140" fill="none" aria-hidden="true"><circle cx="70" cy="70" r="34" stroke="currentColor" strokeWidth="3"/>{Array.from({length:12},(_,i)=><path key={i} d="M70 9 V24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" transform={`rotate(${i*30} 70 70)`}/>)}</svg>
}
function ScribbleArrow(){return <svg className="jojo-scribble-arrow" viewBox="0 0 155 98" fill="none" aria-hidden="true"><path d="M7 8C45 31 74 9 93 33c17 22-9 41-25 25-19-20 40-44 69 17M119 74l18 1-4-18" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
function Spark({className=''}:{className?:string}){return <svg className={className} viewBox="0 0 90 90" fill="none" aria-hidden="true"><path d="M45 4c3 27 14 38 41 41-27 3-38 14-41 41C42 59 31 48 4 45 31 42 42 31 45 4Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/></svg>}
function PhotoStamp({src,alt,caption,className}:{src:string;alt:string;caption:string;className:string}){
 return <figure className={`jojo-photo-stamp ${className}`}><img src={src} alt={alt} loading="lazy"/><figcaption>{caption}</figcaption></figure>;
}
function JOJOFilm(){
 const videoRef=useRef<HTMLVideoElement>(null);
 const [playing,setPlaying]=useState(false);
 const [muted,setMuted]=useState(true);
 useEffect(()=>{
  const media=window.matchMedia('(prefers-reduced-motion: reduce)');
  if(media.matches){videoRef.current?.pause();return;}
  const promise=videoRef.current?.play();
  promise?.catch(()=>setPlaying(false));
 },[]);
 const togglePlay=()=>{
  const video=videoRef.current;
  if(!video)return;
  if(video.paused){video.play().catch(()=>setPlaying(false));}
  else video.pause();
 };
 const toggleMute=()=>{
  const video=videoRef.current;
  if(!video)return;
  video.muted=!video.muted;
  setMuted(video.muted);
 };
 return <section className="jojo-film" aria-label="JOJO Juice brand video">
  <div className="jojo-film-header"><span className="jojo-editorial-overline">SIX SECONDS OF FRESH</span><span className="jojo-film-divider" aria-hidden="true"/><span className="jojo-editorial-overline">THIS IS JOJO.</span></div>
  <div className="jojo-film-stage">
   <video ref={videoRef} src="/media/jojovid.mp4" poster="/brands/jojo-refresh.webp" muted={muted} loop playsInline preload="metadata" autoPlay onPlay={()=>setPlaying(true)} onPause={()=>setPlaying(false)} onVolumeChange={event=>setMuted(event.currentTarget.muted)} aria-label="Video singkat produk minuman JOJO Juice"/>
   <div className="jojo-film-controls">
    <button type="button" onClick={togglePlay} aria-label={playing?'Jeda video JOJO':'Putar video JOJO'}>{playing?'PAUSE':'PLAY'}</button>
    <button type="button" onClick={toggleMute} aria-label={muted?'Nyalakan suara video':'Matikan suara video'}>{muted?'SOUND OFF':'SOUND ON'}</button>
   </div>
  </div>
 </section>;
}

export default function EditorialHome(){
 return <div className="jojo-editorial">
  <section className="jojo-editorial-hero">
   <img className="jojo-editorial-hero-image" src="/brands/jojo-hero.webp" alt="Pilihan minuman segar JOJO Juice" fetchPriority="high"/>
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

  <section className="jojo-paper jojo-origin" aria-labelledby="jojo-origin-title">
   <div className="jojo-origin-copy">
    <span className="jojo-editorial-overline">HEY, WELCOME TO JOJO!</span>
    <h2 id="jojo-origin-title">FRESH<br/><em>FEELS</em><br/>GOOD.</h2>
    <p>Dari Pontianak sejak 2007, JOJO hadir buat nemenin momen kecil yang berarti. Habis kelas, jeda kerja, atau nongkrong bareng teman—selalu ada alasan untuk menikmati yang segar.</p>
    <a className="jojo-editorial-btn" href="/story">GET TO KNOW US</a>
   </div>
   <div className="jojo-origin-art" aria-label="Kolase foto JOJO">
    <span className="jojo-origin-outline" aria-hidden="true">JOJO<br/>JUICE</span>
    <PhotoStamp src="/brands/jojo-together.webp" alt="Dua minuman JOJO bersama" caption="BEST SHARED TOGETHER" className="jojo-stamp-one"/>
    <PhotoStamp src="/brands/jojo-picnic.webp" alt="Momen piknik bersama JOJO" caption="FRESH LITTLE MOMENTS" className="jojo-stamp-two"/>
    <Spark className="jojo-origin-spark"/>
    <span className="jojo-origin-handwritten">a little joy<br/>in every sip!</span>
   </div>
  </section>

  <section className="jojo-paper jojo-lifestyle" aria-labelledby="jojo-lifestyle-title">
   <div className="jojo-lifestyle-visual">
    <div className="jojo-lifestyle-circle"/>
    <img className="jojo-lifestyle-image" src="/brands/jojo-moments.webp" loading="lazy" alt="Momen santai bersama JOJO Juice"/>
    <span className="jojo-lifestyle-sticker">STAY<br/>FRESH!</span>
    <SunDoodle className="jojo-lifestyle-sun"/>
   </div>
   <div className="jojo-lifestyle-copy">
    <span className="jojo-editorial-overline">MADE FOR EVERYDAY MOMENTS</span>
    <h2>MADE <em>FRESH.</em><br/>MADE FOR <span>FUN!</span></h2>
    <p>Buah segar, pilihan rasa, dan vibe yang selalu bikin hari lebih asyik. Apapun aktivitasmu, ada JOJO buat nemenin.</p>
    <div className="jojo-editorial-actions"><a href="/menu" className="jojo-editorial-btn">EXPLORE OUR MENU</a><a href="/outlet" className="jojo-editorial-btn secondary">FIND JOJO NEAR YOU</a></div>
   </div>
  </section>

  <section className="jojo-paper jojo-picks" aria-labelledby="jojo-picks-title">
   <div className="jojo-picks-heading">
    <span className="jojo-editorial-overline">THE GOOD STUFF</span>
    <h2 id="jojo-picks-title">WHAT'S <em>YOUR</em><br/>FRESH MOOD?</h2>
    <p>Kenalan dengan beberapa rasa yang jadi bagian dari cerita JOJO.</p>
   </div>
   <ScribbleArrow/>
   <div className="jojo-picks-grid">{picks.map((p,i)=><a className={`jojo-pick jojo-pick-${p.tone}`} key={p.name} href="/menu">
    <span className="jojo-pick-index">0{i+1} / JOJO FAVES</span>
    <img src={p.image} alt={p.name} loading="lazy"/>
    <span className="jojo-pick-tag">{p.tag}</span>
    <h3>{p.name}</h3>
    <span className="jojo-pick-link">SEE THE MENU <span aria-hidden="true">↗</span></span>
   </a>)}</div>
  </section>

  <section className="jojo-gather" aria-labelledby="jojo-gather-title">
   <div className="jojo-gather-image"><img src="/brands/jojo-picnic.webp" loading="lazy" alt="JOJO Juice untuk momen berkumpul"/><span className="jojo-gather-stamp">GOOD TIMES<br/>TASTE BETTER</span></div>
   <div className="jojo-gather-copy"><span className="jojo-editorial-overline">EVERY SIP IS A MOMENT</span><h2 id="jojo-gather-title">GATHER.<br/>SIP.<br/><em>REPEAT.</em></h2><p>Ketemu, ngobrol, ketawa, dan ulangi. Bikin hari biasa jadi sedikit lebih spesial bareng JOJO.</p><a className="jojo-editorial-btn" href="/outlet">FIND OUR OUTLETS</a></div>
  </section>

  <section className="jojo-community-strip" aria-label="JOJO social media">
   <div className="jojo-community-top"><span className="jojo-editorial-overline">FRESHNESS IN EVERY FEED</span><h2>STAY IN <em>THE LOOP.</em></h2><p>Ikuti cerita, menu terbaru, dan momen segar JOJO di Instagram.</p></div>
   <div className="jojo-community-photos">
    <a href={JOJO_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram JOJO - minuman Dragon Ball"><img src="/brands/jojo-dragon.webp" alt="Dragon Ball JOJO" loading="lazy"/></a>
    <a href={JOJO_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram JOJO - momen bersama"><img src="/brands/jojo-together.webp" alt="Momen bersama JOJO" loading="lazy"/></a>
    <a href={JOJO_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram JOJO - minuman segar"><img src="/brands/jojo-green.webp" alt="Minuman Green N Glow JOJO" loading="lazy"/></a>
    <a href={JOJO_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram JOJO - piknik"><img src="/brands/jojo-picnic.webp" alt="Momen piknik JOJO" loading="lazy"/></a>
   </div>
   <a className="jojo-editorial-btn" href={JOJO_LINKS.instagram} target="_blank" rel="noopener noreferrer">FOLLOW @JOJOJUICEID</a>
  </section>

  <section className="jojo-last-call"><Spark className="jojo-last-spark"/><span className="jojo-editorial-overline">ONE MORE SIP?</span><h2>YOUR FRESH<br/><em>MOMENT STARTS HERE.</em></h2><div className="jojo-editorial-actions"><a className="jojo-editorial-btn" href="/how-to-order">HOW TO ORDER</a><a className="jojo-editorial-btn secondary" href={JOJO_LINKS.esb} target="_blank" rel="noopener noreferrer">ORDER NOW</a></div><span className="jojo-last-small">FEEL FRESH. LIVE FUN. · JOJO JUICE</span></section>
 </div>;
}
