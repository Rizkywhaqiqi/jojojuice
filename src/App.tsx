import EditorialHome from './editorial-home';
import './editorial-footer.css';
import HowToOrder from './how-to-order';
import {JOJO_LINKS} from './jojo-links';
import {OrderOptions,OutletDirectory,ContactOptions} from './jojo-directory';
import SiteMotion from './site-motion';
import './anna-navbar.css';
import MenuCatalog from './menu-catalog';
import {StoryNature,StoryStreet,OutletExperience} from './jojo-editorial-gallery';
import {useEffect,useRef,useState} from 'react';
const IG=JOJO_LINKS.instagram;
const nav=[['HOME','/'],['STORY','/story'],['MENU','/menu'],['HOW TO ORDER','/how-to-order'],['OUTLET','/outlet'],['CONTACT','/contact']];
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
  const dialog=overlayRef.current;
  const previousOverflow=document.body.style.overflow;
  // Hide all background content from pointer, keyboard and assistive-technology navigation.
  const background=Array.from(document.querySelectorAll<HTMLElement>('.anna-header,#main-content,.jojo-site-footer,.skip-to-content'));
  const oldInert=background.map(node=>({node,inert:node.inert}));
  document.body.style.overflow='hidden';
  background.forEach(node=>{node.inert=true});
  const focusable=()=>Array.from(dialog?.querySelectorAll<HTMLElement>('a[href],button:not([disabled]):not([tabindex="-1"])')??[])
   .filter(node=>node.getClientRects().length>0);
  const items=focusable();
  (items.find(node=>node.classList.contains('anna-overlay-close'))??items[0])?.focus();
  const closeWithFocus=()=>{setOpen(false);requestAnimationFrame(()=>toggleRef.current?.focus())};
  const onKey=(event:KeyboardEvent)=>{
   if(event.key==='Escape'){event.preventDefault();closeWithFocus();return;}
   if(event.key!=='Tab')return;
   const options=focusable();
   if(!options.length){event.preventDefault();return;}
   const first=options[0],last=options[options.length-1];
   if(!dialog?.contains(document.activeElement)){
    event.preventDefault();(event.shiftKey?last:first).focus();
   }else if(event.shiftKey&&document.activeElement===first){
    event.preventDefault();last.focus();
   }else if(!event.shiftKey&&document.activeElement===last){
    event.preventDefault();first.focus();
   }
  };
  const onFocus=(event:FocusEvent)=>{
   if(dialog&&!dialog.contains(event.target as Node))focusable()[0]?.focus();
  };
  document.addEventListener('keydown',onKey);
  document.addEventListener('focusin',onFocus);
  return()=>{
   document.body.style.overflow=previousOverflow;
   oldInert.forEach(({node,inert})=>{node.inert=inert});
   document.removeEventListener('keydown',onKey);
   document.removeEventListener('focusin',onFocus);
  };
 },[open]);
  useEffect(()=>{const onResize=()=>{if(window.innerWidth>1120)setOpen(false)};window.addEventListener('resize',onResize);return()=>window.removeEventListener('resize',onResize)},[]);
 const close=()=>{setOpen(false);requestAnimationFrame(()=>toggleRef.current?.focus())};
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
function Footer(){return <footer className="jojo-site-footer">
 <div className="jojo-footer-top"><div className="jojo-footer-brand"><a href="/" aria-label="Kembali ke beranda JOJO"><Logo/></a><p>Rasa segar buat cerita seru setiap hari.</p><span>PONTIANAK · EST. 2007</span></div><div className="jojo-footer-links"><span className="jojo-footer-label">EXPLORE JOJO</span><nav aria-label="Navigasi footer">{nav.map(([label,href])=><a href={href} key={href}>{label}</a>)}</nav></div><div className="jojo-footer-connect"><span className="jojo-footer-label">STAY CONNECTED</span><a href={IG} target="_blank" rel="noopener noreferrer">INSTAGRAM</a><a href={JOJO_LINKS.whatsapp} target="_blank" rel="noopener noreferrer">WHATSAPP</a><a className="jojo-footer-order" href={JOJO_LINKS.esb} target="_blank" rel="noopener noreferrer">ORDER NOW</a></div></div>
 <div className="jojo-footer-bottom"><span>© {new Date().getFullYear()} JOJO JUICE</span><span>FEEL FRESH. LIVE FUN.</span><span>MADE WITH FRESH ENERGY</span></div>
 </footer>}
function Banner({title,image,eyebrow,copy,cta,href}:{title:string;image:string;eyebrow:string;copy:string;cta:string;href:string}){return <section className="banner jojo-page-hero"><img src={'/brands/'+image} alt="" fetchPriority="high"/><div className="banner-inner"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{copy}</p><a className="jojo-page-hero-link" href={href}>{cta}</a></div></section>}
function Story(){return <>
 <Banner title="OUR STORY" image="jojo-story-hero-1.jpg" eyebrow="PONTIANAK · SINCE 2007" copy="Dari buah segar sampai momen seru, kenalan dengan JOJO." cta="KENALAN LEBIH DEKAT" href="#cerita-jojo"/>
 <section className="section jojo-story-intro" id="cerita-jojo">
  <div className="jojo-story-intro-heading"><span className="eyebrow">KENALAN LEBIH DEKAT</span><h2>SEJAK 2007,<br/><em>SELALU FRESH.</em></h2></div>
  <div className="jojo-story-intro-copy"><p>JOJO Juice tumbuh dari Pontianak dengan semangat menghadirkan minuman berbasis buah yang fresh, fun, dan dekat dengan keseharian.</p><p>Dari kerja, kuliah, nongkrong, sampai santai bersama teman, JOJO hadir menemani.</p><a className="button" href="/menu">LIHAT PILIHAN MENU</a></div>
 </section>
 <StoryNature/>
 <section className="story-split section jojo-story-values"><figure><img src="/brands/jojo-together.webp" alt="Dua minuman JOJO dinikmati bersama" loading="lazy"/></figure><div><span className="eyebrow">THE JOJO WAY</span><h2>FUN.<br/>FRESH.<br/><em>ACTIVE.</em></h2><p>Karakter kami ceria, aktif, dan mudah akrab. Kini hadir di berbagai lokasi Kalimantan Barat.</p><CTA href="/outlet">TEMUKAN OUTLET</CTA></div></section>
 <StoryStreet/>
</>}
function Menu(){return <MenuCatalog/>}
function Outlet(){return <><Banner title="FIND US" image="editorial/jojo-interior-space.webp" eyebrow="TEMPAT KETEMU YANG FRESH" copy="Cari cabang JOJO yang paling sesuai dengan wilayahmu." cta="LIHAT LOKASI OUTLET" href="#outlet-list"/><OutletExperience/><OutletDirectory/><OrderOptions compact/></>}
function Contact(){return <><Banner title="SAY HELLO" image="jojo-together.webp" eyebrow="KEEP IN TOUCH" copy="Ada pertanyaan atau ide kolaborasi? Hubungi JOJO melalui kanal resmi." cta="PILIH CARA KONTAK" href="#contact-channels"/><ContactOptions/><OrderOptions compact/></>}
function NotFound(){return <section className="section centered not-found"><span className="eyebrow">404 / HALAMAN TIDAK DITEMUKAN</span><h1>NYASAR,<br/>BRO?</h1><p>Halaman yang kamu cari tidak tersedia. Yuk kembali ke yang fresh.</p><CTA href="/">KEMBALI KE BERANDA</CTA></section>}
export default function App(){let path=window.location.pathname.replace(/\/$/,'')||'/';useEffect(()=>{document.title=(path==='/'?'JOJO Juice':path.slice(1).toUpperCase()+' — JOJO Juice')+' · Feel Fresh. Live Fun.'},[path]);return <><a className="skip-to-content" href="#main-content">LEWATI NAVIGASI</a><Header path={path}/><SiteMotion/><main id="main-content">{path==='/story'?<Story/>:path==='/menu'?<Menu/>:path==='/outlet'?<Outlet/>:path==='/contact'?<Contact/>:path==='/how-to-order'?<HowToOrder/>:path==='/'?<EditorialHome/>:<NotFound/>}</main><Footer/></>}
