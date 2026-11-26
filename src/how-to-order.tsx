import {useEffect,useRef,useState} from 'react';
import {JOJO_TAGLINE} from './brand-copy';
import {JOJO_LINKS} from './jojo-links';
import {OrderOptions} from './jojo-directory';
import './how-to-order.css';

const steps=[
 {num:'01',title:'PILIH MENU',copy:'Cek pilihan minuman dan camilan, lalu pilih yang lagi kamu pengin.',label:'LIHAT MENU',url:'/menu'},
 {num:'02',title:'PILIH PLATFORM',copy:'Kamu bisa memesan lewat ESB Order, GoFood, ShopeeFood, atau GrabFood. Pilih yang paling nyaman dan tersedia di lokasimu.',label:'PILIH LAYANAN',url:'#order-platforms'},
 {num:'03',title:'SELESAIKAN PESANAN',copy:'Setelah membuka platform pilihanmu, pilih outlet serta item, periksa total harga, lalu selesaikan pembayaran atau pengambilan di aplikasi.',label:'KONFIRMASI DI PLATFORM PILIHANMU',url:null}
];
const poster='/media/how-to-order-hero-poster.webp';

export default function HowToOrder(){
 const videoRef=useRef<HTMLVideoElement>(null);
 const [motionAllowed,setMotionAllowed]=useState(()=>!window.matchMedia('(prefers-reduced-motion: reduce)').matches);
 const [playing,setPlaying]=useState(false);
 const [videoFailed,setVideoFailed]=useState(false);
 useEffect(()=>{
  const preference=window.matchMedia('(prefers-reduced-motion: reduce)');
  const syncPreference=()=>{
   setMotionAllowed(!preference.matches);
   if(preference.matches)setPlaying(false);
  };
  preference.addEventListener('change',syncPreference);
  syncPreference();
  return()=>preference.removeEventListener('change',syncPreference);
 },[]);
 const toggleVideo=()=>{
  const video=videoRef.current;
  if(!video)return;
  if(video.paused)void video.play().catch(()=>setPlaying(false));
  else video.pause();
 };
 const showVideo=motionAllowed&&!videoFailed;
 return <div className="how-order">
  <section className="how-order-hero">
   <div className="how-order-hero-media" aria-hidden="true">
    <img className="how-order-hero-fallback" src={poster} alt="" fetchPriority="high" width="1280" height="720"/>
    {showVideo&&<video ref={videoRef} id="order-hero-video" className="how-order-hero-video"
      src="/media/how-to-order-hero.mp4" autoPlay muted loop playsInline preload="metadata" poster={poster}
      onPlay={()=>setPlaying(true)} onPause={()=>setPlaying(false)} onError={()=>setVideoFailed(true)}/>}
   </div>
   <div className="how-order-hero-content">
    <span className="eyebrow">{JOJO_TAGLINE.toUpperCase()}</span>
    <h1>Cara <em>pesan</em></h1>
    <p>Mulai dari pilih menu favoritmu, lalu pesan lewat aplikasi yang tersedia di lokasimu.</p>
    <div className="how-order-hero-actions">
     <a className="button" href="#order-steps">Lihat langkahnya</a>
     {showVideo&&<button type="button" className="how-order-video-toggle" onClick={toggleVideo}>
      {playing?'Jeda video':'Putar video'}
     </button>}
    </div>
   </div>
  </section>
  <section className="how-order-steps section" id="order-steps"><div className="how-order-head"><h2>Langkah <em>pemesanan</em></h2><p>Pembayaran dilakukan di layanan pemesanan yang kamu pilih.</p></div>
   <div className="how-order-steps-grid">{steps.map(step=><article className="how-order-step" key={step.num}><span className="how-order-number">{step.num}</span><div><h3>{step.title}</h3><p>{step.copy}</p></div>{step.url?<a href={step.url}>{step.label}</a>:<p className="how-order-step-finish" role="note">{step.label}</p>}</article>)}</div>
  </section>
  <div id="order-platforms"><OrderOptions/></div>
  <section className="how-order-help section"><div><h2>Butuh <em>bantuan?</em></h2><p>Harga, stok, dan ongkir bisa berbeda di tiap aplikasi. Hubungi kami lewat WhatsApp jika ada pertanyaan.</p></div><a className="button" href={JOJO_LINKS.whatsapp} target="_blank" rel="noopener noreferrer">CHAT WHATSAPP</a></section>
 </div>;
}
