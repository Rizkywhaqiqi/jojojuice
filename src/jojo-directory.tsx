import {useMemo,useState} from 'react';
import {JOJO_LINKS,JOJO_OUTLETS,type OutletArea} from './jojo-links';
import './jojo-links.css';

type Area='Semua'|OutletArea;
const areas:Area[]=['Semua','Pontianak','Singkawang','Mempawah','Kubu Raya'];
const services=[
 {label:'ESB ORDER',sub:'Pesan langsung',url:JOJO_LINKS.esb,primary:true},
 {label:'GOFOOD',sub:'Pesan via GoFood',url:JOJO_LINKS.gofood},
 {label:'SHOPEEFOOD',sub:'Pesan via ShopeeFood',url:JOJO_LINKS.shopee},
 {label:'GRABFOOD',sub:'Pesan via GrabFood',url:JOJO_LINKS.grab}
];
export function OrderOptions({compact=false}:{compact?:boolean}){
 return <section className={compact?'jojo-order jojo-order-compact':'jojo-order'} aria-labelledby="jojo-order-title">
  <div className="jojo-order-header"><span className="eyebrow">ONLINE ORDER</span><h2 id="jojo-order-title">PESAN <em>JOJO.</em></h2><p>Pilih layanan pemesanan yang kamu gunakan. Tautan menuju kanal yang dicantumkan JOJO.</p></div>
  <div className="jojo-order-grid">{services.map(service=><a className={service.primary?'jojo-service is-primary':'jojo-service'} href={service.url} target="_blank" rel="noopener noreferrer" key={service.label}><span>{service.label}</span><small>{service.sub}</small><span className="jojo-service-action">BUKA LAYANAN</span></a>)}</div>
 </section>
}
export function OutletDirectory(){
 const [area,setArea]=useState<Area>('Semua');
 const [query,setQuery]=useState('');
 const filtered=useMemo(()=>JOJO_OUTLETS.filter(outlet=>(area==='Semua'||outlet.area===area)&&outlet.name.toLocaleLowerCase('id').includes(query.trim().toLocaleLowerCase('id'))),[area,query]);
 return <section className="jojo-directory section" id="outlet-list">
  <div className="jojo-directory-heading"><div><span className="eyebrow">18 LOKASI DI LINKTREE RESMI</span><h2>CARI <em>OUTLET.</em></h2></div><p>Pilih wilayah dan buka navigasi menuju cabang yang tercantum. Untuk alamat atau jam terbaru, lihat Maps masing-masing outlet.</p></div>
  <div className="jojo-directory-filters"><div className="jojo-directory-tabs" aria-label="Filter wilayah">{areas.map(item=><button type="button" key={item} onClick={()=>setArea(item)} aria-pressed={area===item} className={area===item?'active':''}>{item}</button>)}</div><label><span className="jojo-screen-reader">Cari nama outlet</span><input aria-label="Cari nama outlet" type="search" placeholder="Cari nama cabang…" value={query} onChange={event=>setQuery(event.target.value)}/></label></div>
  <p className="jojo-directory-count" aria-live="polite">{filtered.length} OUTLET DITEMUKAN</p>
  {filtered.length?<div className="jojo-outlet-grid">{filtered.map(outlet=><article className="jojo-outlet-card" key={outlet.maps}><div><span className="jojo-outlet-area">{outlet.area}{outlet.kind==='daily'?' · DAILY BAR':''}</span><h3>{outlet.name}</h3></div><a href={outlet.maps} target="_blank" rel="noopener noreferrer" aria-label={'Buka Google Maps untuk '+outlet.name}>BUKA GOOGLE MAPS</a></article>)}</div>:<div className="jojo-outlet-empty"><h3>OUTLET TIDAK DITEMUKAN</h3><p>Coba kata pencarian lain atau ubah wilayah.</p><button type="button" onClick={()=>{setArea('Semua');setQuery('')}}>LIHAT SEMUA OUTLET</button></div>}
  <p className="jojo-source-note">Sumber: <a href={JOJO_LINKS.linktree} target="_blank" rel="noopener noreferrer">Linktree @jojojuiceid</a>. Nama dan link lokasi mengikuti daftar resmi; tidak semua cabang mencantumkan alamat atau jam buka di sumber tersebut.</p>
 </section>;
}
export function ContactOptions(){
 return <section className="jojo-contact-options section">
  <div className="jojo-contact-heading"><span className="eyebrow">SAY HELLO</span><h2>LET'S <em>TALK.</em></h2><p>Punya pertanyaan menu, outlet, atau kolaborasi? Hubungi JOJO melalui kanal yang tercantum di Linktree resminya.</p></div>
  <div className="jojo-contact-grid">
   <a href={JOJO_LINKS.whatsapp} target="_blank" rel="noopener noreferrer"><span>01 / CHAT</span><h3>WHATSAPP</h3><p>Hubungi tim JOJO lewat nomor bisnis resmi.</p><strong>CHAT SEKARANG</strong></a>
   <a href={JOJO_LINKS.instagram} target="_blank" rel="noopener noreferrer"><span>02 / SOCIAL</span><h3>INSTAGRAM</h3><p>Info terbaru dan cerita fresh JOJO.</p><strong>@JOJOJUICEID</strong></a>
   <a href={JOJO_LINKS.juiceMenu} target="_blank" rel="noopener noreferrer"><span>03 / MENU</span><h3>MENU RESMI</h3><p>Lihat materi menu JOJO Juice di Google Drive.</p><strong>BUKA MENU</strong></a>
   <a href={JOJO_LINKS.dailyBarMenu} target="_blank" rel="noopener noreferrer"><span>04 / MENU</span><h3>DAILY BAR</h3><p>Lihat materi menu JOJO Daily Bar.</p><strong>BUKA MENU</strong></a>
  </div>
 </section>;
}
