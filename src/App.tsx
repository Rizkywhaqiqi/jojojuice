import HowToOrder from './how-to-order';
import {JOJO_LINKS} from './jojo-links';
import {OrderOptions,OutletDirectory,ContactOptions} from './jojo-directory';
import SiteMotion from './site-motion';
import './anna-navbar.css';
import MenuCatalog from './menu-catalog';
import {useEffect,useRef,useState} from 'react';
const IG=JOJO_LINKS.instagram;
const nav=[['HOME','/'],['STORY','/story'],['MENU','/menu'],['HOW TO ORDER','/how-to-order'],['OUTLET','/outlet'],['CONTACT','/contact']];
const products=[{name:'DRAGON BALL',img:'jojo-dragon.webp',desc:'Campaign highlight dari JOJO Juice.'},{name:'FRESH JOJO',img:'jojo-refresh.webp',desc:'Segar untuk setiap momen.'},{name:'GREEN N GLOW',img:'jojo-green.webp',desc:'Warna yang fresh buat harimu.'}];
function Logo(){return <img className="logo" src="/brands/jojo-logo.svg" alt="JOJO Juice" width="135" height="70"/>}
function CTA({children,href=JOJO_LINKS.esb,outline=false}:{children:string,href?:string,outline?:boolean}){return <a className={outline?'button outline':'button'} href={href} {...(href.startsWith('http')?{target:'_blank',rel:'noreferrer noopener'}:{})}>{children}</a>}
function Header({path}:{path:string}){
 const [open,setOpen]=useState(false);
 const [scrolled,setScrolled]=useState(false);
 const [compact,setCompact]=useState(false);
 const toggleRef=useRef<HTMLButtonElement>(null);
 const overlayRef=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  let raf=0,lastY=window.scrollY,travel=0,direction=0;
  const update=()=>{
   cancelAnimationFrame(raf);
   raf=requestAnimationFrame(()=>{
    const y=Math.max(0,window.scrollY);
    const delta=y-lastY;
    const nextDirection=Math.sign(delta);
    if(nextDirection&&nextDirection!==direction){direction=nextDirection;travel=0;}
    travel+=Math.abs(delta);
    lastY=y;
    setScrolled(y>45 || !nav.some(([,href])=>href===path));
    if(y<95){setCompact(false);travel=0;}
    else if(travel>=(direction>0?26:17)){
     setCompact(direction>0);
     travel=0;
    }
   });
  };
  update();
  window.addEventListener('scroll',update,{passive:true});
  return()=>{window.removeEventListener('scroll',update);cancelAnimationFrame(raf)};
 },[path]);
 useEffect(()=>{
  if(!open)return;
  const previousOverflow=document.body.style.overflow;
  document.body.style.overflow='hidden';
  const first=overlayRef.current?.querySelector<HTMLAnchorElement>('.anna-overlay-links a');
  first?.focus();
  const onKey=(event:KeyboardEvent)=>{
   if(event.key==='Escape'){
    event.preventDefault();setOpen(false);toggleRef.current?.focus();
   }
   if(event.key==='Tab'&&overlayRef.current){
    const focusable=Array.from(overlayRef.current.querySelectorAll<HTMLElement>('a[href],button:not([disabled]):not([tabindex="-1"])'));
    const firstItem=focusable[0],lastItem=focusable[focusable.length-1];
    if(!firstItem||!lastItem)return;
    if(event.shiftKey&&document.activeElement===firstItem){event.preventDefault();lastItem.focus();}
    else if(!event.shiftKey&&document.activeElement===lastItem){event.preventDefault();firstItem.focus();}
   }
  };
  window.addEventListener('keydown',onKey);
  return()=>{document.body.style.overflow=previousOverflow;window.removeEventListener('keydown',onKey)};
 },[open]);
 useEffect(()=>{const onResize=()=>{if(window.innerWidth>1120)setOpen(false)};window.addEventListener('resize',onResize);return()=>window.removeEventListener('resize',onResize)},[]);
 const close=()=>{setOpen(false);toggleRef.current?.focus()};
 const left=nav.slice(0,3);
 const right=nav.slice(3);
 return <>
  <header className={`header anna-header${scrolled?' is-scrolled':''}${compact&&!open?' is-compact':''}${open?' is-open':''}`}>
   <div className="header-inner anna-header-inner">
    <nav className="anna-nav-side anna-nav-left" aria-label="Navigasi utama bagian kiri">{left.map(([label,href])=><a key={href} aria-current={path===href?'page':undefined} href={href}>{label}</a>)}</nav>
    <a className="anna-logo-link" href="/" aria-label="JOJO Juice, beranda"><Logo/></a>
    <nav className="anna-nav-side anna-nav-right" aria-label="Navigasi utama bagian kanan">{right.map(([label,href])=><a key={href} aria-current={path===href?'page':undefined} href={href}>{label}</a>)}</nav>
    <button ref={toggleRef} type="button" className="anna-menu-toggle" aria-expanded={open} aria-controls="jojo-nav-overlay" aria-label={open?'Tutup navigasi':'Jelajahi menu'} onClick={()=>setOpen(!open)}>
     <span className="anna-menu-bars" aria-hidden="true"><i/><i/></span><span className="anna-menu-label">{open?'TUTUP':'MENU'}</span>
    </button>
   </div>
  </header>
  {open&&<div className="anna-overlay" ref={overlayRef} id="jojo-nav-overlay" role="dialog" aria-modal="true" aria-label="Navigasi JOJO Juice">
   <button tabIndex={-1} className="anna-overlay-backdrop" type="button" aria-label="Tutup navigasi" onClick={close}/>
   <div className="anna-overlay-panel">
    <div className="anna-overlay-top"><a href="/" aria-label="Beranda JOJO"><Logo/></a><button type="button" className="anna-overlay-close" onClick={close} aria-label="Tutup menu">TUTUP <span aria-hidden="true">×</span></button></div>
    <nav className="anna-overlay-links" aria-label="Semua halaman">{nav.map(([label,href],i)=><a key={href} href={href} aria-current={path===href?'page':undefined}><span className="anna-overlay-number">{String(i+1).padStart(2,'0')}</span>{label}</a>)}</nav>
    <div className="anna-overlay-bottom"><span>FEEL FRESH. LIVE FUN.</span><a href={IG} target="_blank" rel="noopener noreferrer">INSTAGRAM JOJO</a></div>
   </div>
  </div>}
 </>;
}
function Footer(){return <footer><div className="footer-main"><a href="/" aria-label="Kembali ke beranda JOJO"><Logo/></a><nav aria-label="Navigasi footer">{nav.map(([label,href])=><a key={href} href={href}>{label}</a>)}</nav><a href={IG} target="_blank" rel="noreferrer">INSTAGRAM</a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} JOJO JUICE</span><span>FEEL FRESH. LIVE FUN.</span><span>PONTIANAK · SINCE 2007</span></div></footer>}
function Banner({title,image}:{title:string,image:string}){return <section className="banner"><img src={'/brands/'+image} alt="" /><div className="banner-inner"><h1>{title}</h1></div></section>}
function Products(){return <section className="products section"><h2>MADE FRESH DAILY.</h2><p className="center-copy">Pilihan visual minuman JOJO. Menu dan harga terbaru bisa dikonfirmasi lewat outlet resmi.</p><div className="product-grid">{products.map(p=><article key={p.name}><img src={'/brands/'+p.img} alt={p.name} loading="lazy"/><h3>{p.name}</h3><p>{p.desc}</p></article>)}</div><div className="center"><CTA href="/menu">LIHAT MENU LENGKAP</CTA></div></section>}
function Home(){return <><section className="hero"><img src="/brands/jojo-hero.webp" alt="Minuman JOJO Juice segar" fetchPriority="high"/><div className="hero-inner"><span className="eyebrow">PONTIANAK · EST. 2007</span><h1>FEEL FRESH.<br/><em>LIVE FUN.</em></h1><p>Segarnya buah, serunya tiap hari.</p><div className="actions"><CTA href="/menu">EXPLORE OUR MENU</CTA><CTA href="/how-to-order">HOW TO ORDER</CTA></div></div></section><section className="story-split section"><div><span className="eyebrow">WELCOME TO JOJO</span><h2>FRESH BUAT<br/><em>SETIAP MOMEN.</em></h2><p>JOJO hadir dari Pontianak sejak 2007. Dari jeda kuliah sampai nongkrong, selalu ada momen yang lebih asik bersama rasa segar.</p><CTA href="/story">LEARN MORE</CTA></div><figure><img src="/brands/jojo-together.webp" alt="Dua minuman JOJO dinikmati bersama" loading="lazy"/></figure></section><section className="visual-split"><img src="/brands/jojo-picnic.webp" alt="JOJO dalam momen piknik" loading="lazy"/><div><span className="eyebrow">FRESHNESS IN EVERY SIP</span><h2>YANG SEGAR,<br/><em>BUAT HARI INI.</em></h2><p>Minuman berbasis buah dengan pilihan rasa untuk menemani aktivitasmu.</p><CTA href="/menu">EXPLORE MENU</CTA></div></section><Products/><section className="community"><div><span className="eyebrow">EVERYDAY MOMENTS</span><h2>KETEMU.<br/>NGOBROL.<br/><em>HAVE FUN.</em></h2><CTA href="/outlet" outline>CARI OUTLET</CTA></div><img src="/brands/jojo-moments.webp" alt="Momen santai bersama JOJO" loading="lazy"/></section><OrderOptions compact/><section className="closing"><h2>JOJO AJA.</h2><CTA>ORDER NOW</CTA></section></>}
function Story(){return <><Banner title="OUR STORY" image="jojo-picnic.webp"/><section className="section centered"><span className="eyebrow">KENALAN LEBIH DEKAT</span><h2>SEJAK 2007,<br/><em>SELALU FRESH.</em></h2><p>JOJO Juice tumbuh dari Pontianak dengan semangat menghadirkan minuman berbasis buah yang fresh, fun, dan dekat dengan keseharian.</p><p>Dari kerja, kuliah, nongkrong, sampai santai bersama teman, JOJO hadir menemani.</p></section><section className="story-split section"><figure><img src="/brands/jojo-together.webp" alt="Momen JOJO" loading="lazy"/></figure><div><h2>FUN.<br/>FRESH.<br/><em>ACTIVE.</em></h2><p>Karakter kami ceria, aktif, dan mudah akrab. Kini hadir di berbagai lokasi Kalimantan Barat.</p><CTA href="/outlet">FIND US</CTA></div></section></>}
function Menu(){return <MenuCatalog/>}
function Outlet(){return <><Banner title="FIND US" image="jojo-moments.webp"/><OutletDirectory/><OrderOptions compact/></>}
function Contact(){return <><Banner title="SAY HELLO" image="jojo-together.webp"/><ContactOptions/><OrderOptions compact/></>}
function NotFound(){return <section className="section centered not-found"><span className="eyebrow">404 / HALAMAN TIDAK DITEMUKAN</span><h1>NYASAR,<br/>BRO?</h1><p>Halaman yang kamu cari tidak tersedia. Yuk kembali ke yang fresh.</p><CTA href="/">KEMBALI KE BERANDA</CTA></section>}
export default function App(){let path=window.location.pathname.replace(/\/$/,'')||'/';useEffect(()=>{document.title=(path==='/'?'JOJO Juice':path.slice(1).toUpperCase()+' — JOJO Juice')+' · Feel Fresh. Live Fun.'},[path]);return <><a className="skip-to-content" href="#main-content">LEWATI NAVIGASI</a><Header path={path}/><SiteMotion/><main id="main-content">{path==='/story'?<Story/>:path==='/menu'?<Menu/>:path==='/outlet'?<Outlet/>:path==='/contact'?<Contact/>:path==='/how-to-order'?<HowToOrder/>:path==='/'?<Home/>:<NotFound/>}</main><Footer/></>}
