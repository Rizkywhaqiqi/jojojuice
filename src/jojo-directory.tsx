import {useMemo,useState} from 'react';
import {JOJO_LINKS,JOJO_OUTLETS,type OutletArea} from './jojo-links';
import './jojo-links.css';

type Area='Semua'|OutletArea;
const areas:Area[]=['Semua','Pontianak','Singkawang','Mempawah','Kubu Raya'];
const services=[
 {label:'ESB ORDER',sub:'Pesan langsung',url:JOJO_LINKS.esb,primary:true},
 {label:'GOFOOD',sub:'Cabang HOS Cokroaminoto, Pontianak',url:JOJO_LINKS.gofood},
 {label:'SHOPEEFOOD',sub:'Pesan via ShopeeFood',url:JOJO_LINKS.shopee},
 {label:'GRABFOOD',sub:'Pesan via GrabFood',url:JOJO_LINKS.grab}
];
export function OrderOptions({compact=false}:{compact?:boolean}){
 return <section className={compact?'jojo-order jojo-order-compact':'jojo-order'} aria-labelledby="jojo-order-title">
  <div className="jojo-order-header"><h2 id="jojo-order-title">Pilih layanan <em>pesan</em></h2><p>Pilih aplikasi yang tersedia di lokasimu.</p></div>
  <div className="jojo-order-grid">{services.map(service=><a className={service.primary?'jojo-service is-primary':'jojo-service'} href={service.url} target="_blank" rel="noopener noreferrer" key={service.label}><span>{service.label}</span><small>{service.sub}</small><span className="jojo-service-action">BUKA LAYANAN</span></a>)}</div>
 </section>
}
export function OutletDirectory(){
 const [area,setArea]=useState<Area>('Semua');
 const [query,setQuery]=useState('');
 const filtered=useMemo(()=>JOJO_OUTLETS.filter(outlet=>(area==='Semua'||outlet.area===area)&&outlet.name.toLocaleLowerCase('id').includes(query.trim().toLocaleLowerCase('id'))),[area,query]);
 return <section className="jojo-directory section" id="outlet-list">
  <div className="jojo-directory-heading"><div><span className="eyebrow">{JOJO_OUTLETS.length} LOKASI DI LINKTREE RESMI</span><h2>Cari <em>gerai</em></h2></div><p>Cari cabang berdasarkan wilayah. Lihat alamat dan jam buka di Google Maps.</p></div>
  <div className="jojo-directory-filters"><div className="jojo-directory-tabs" role="group" aria-label="Filter wilayah">{areas.map(item=><button type="button" key={item} onClick={()=>setArea(item)} aria-pressed={area===item} className={area===item?'active':''}>{item}</button>)}</div><div className="jojo-directory-search"><label htmlFor="jojo-outlet-search">CARI CABANG</label><div className="jojo-directory-search-field"><input id="jojo-outlet-search" aria-label="Cari nama outlet" type="search" placeholder="Cari nama cabang…" value={query} onChange={event=>setQuery(event.target.value)}/>{query&&<button type="button" aria-label="Hapus pencarian outlet" onClick={()=>setQuery('')}>×</button>}</div></div></div>
  <div className="jojo-directory-count-row"><p className="jojo-directory-count" role="status" aria-live="polite">{filtered.length} OUTLET DITEMUKAN</p>{(area!=='Semua'||query.trim())&&<button className="jojo-directory-clear" type="button" onClick={()=>{setArea('Semua');setQuery('')}}>RESET FILTER</button>}</div>
  {filtered.length?<div className="jojo-outlet-grid">{filtered.map(outlet=><article className="jojo-outlet-card" key={outlet.maps}><div><span className="jojo-outlet-area">{outlet.area}{outlet.kind==='daily'?' · DAILY BAR':''}</span><h3>{outlet.name}</h3></div><a href={outlet.maps} target="_blank" rel="noopener noreferrer" aria-label={'Buka Google Maps untuk '+outlet.name}>BUKA GOOGLE MAPS</a></article>)}</div>:<div className="jojo-outlet-empty"><h3>OUTLET TIDAK DITEMUKAN</h3><p>Coba kata pencarian lain atau ubah wilayah.</p><button type="button" onClick={()=>{setArea('Semua');setQuery('')}}>LIHAT SEMUA OUTLET</button></div>}
  <p className="jojo-source-note">Sumber: <a href={JOJO_LINKS.linktree} target="_blank" rel="noopener noreferrer">Linktree @jojojuiceid</a>. Nama dan link lokasi mengikuti daftar resmi; tidak semua cabang mencantumkan alamat atau jam buka di sumber tersebut.</p>
 </section>;
}
export function ContactOptions(){
 return <section className="jojo-contact-options section" id="contact-channels">
  <div className="jojo-contact-heading"><h2>Hubungi <em>JOJO</em></h2><p>Tanya soal menu, cabang, atau kerja sama.</p></div>
  <div className="jojo-contact-grid">
   <a href={JOJO_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Buka chat WhatsApp JOJO Juice"><h3>WHATSAPP</h3><p>Hubungi tim JOJO lewat nomor bisnis resmi.</p><strong>CHAT SEKARANG</strong></a>
   <a href={JOJO_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Kunjungi Instagram JOJO Juice"><h3>INSTAGRAM</h3><p>Info terbaru dan cerita fresh JOJO.</p><strong>@JOJOJUICEID</strong></a>
   <a href={JOJO_LINKS.juiceMenu} target="_blank" rel="noopener noreferrer"><h3>MENU RESMI</h3><p>Lihat materi menu JOJO Juice di Google Drive.</p><strong>BUKA MENU</strong></a>
   <a href={JOJO_LINKS.dailyBarMenu} target="_blank" rel="noopener noreferrer"><h3>DAILY BAR</h3><p>Lihat materi menu JOJO Daily Bar.</p><strong>BUKA MENU</strong></a>
  </div>
 </section>;
}
