import {JOJO_TAGLINE} from './brand-copy';
import './jojo-editorial-gallery.css';

const base='/brands/editorial/';

type EditorialPhoto={src:string;alt:string;label:string};
const freshness:EditorialPhoto[]=[
 {src:'jojo-avocado-tree.webp',alt:'Tangan memetik buah alpukat segar dari pohon',label:'Pohon alpukat'},
 {src:'jojo-avocado-harvest.webp',alt:'Buah alpukat hijau segar dirangkul dalam kedua tangan',label:'Buah yang dipetik'},
 {src:'jojo-avocado-juice.webp',alt:'Minuman JOJO Juice di samping buah alpukat dan dedaunan hijau',label:'Jus alpukat'}
];

const moments:EditorialPhoto[]=[
 {src:'jojo-street-drink.webp',alt:'Minuman JOJO berwarna ungu ditampilkan di depan teman yang sedang menikmati minuman',label:'Minum jus'},
 {src:'jojo-street-overhead.webp',alt:'Dua teman berbincang sambil menikmati makanan dan minuman dari sudut pandang atas',label:'Makan bersama'},
 {src:'jojo-street-moving.webp',alt:'Dua orang berjalan sambil membawa minuman JOJO di tengah bayangan cahaya kota',label:'Jalan kaki'},
 {src:'jojo-street-moment.webp',alt:'Dua teman membawa minuman JOJO di area urban dengan bayangan tangga',label:'Bersama teman'}
];

const interiors:EditorialPhoto[]=[
 {src:'jojo-interior-counter.webp',alt:'Area counter minuman dengan signage merah BOOST YOUR ENERGY',label:'Meja pemesanan'},
 {src:'jojo-interior-space.webp',alt:'Area duduk JOJO dengan logo merah dan tulisan Nature in Every Drop',label:'Ruang gerai'},
 {src:'jojo-interior-seating.webp',alt:'Meja putih dan kursi hangat di area duduk dengan tanaman',label:'Area duduk'},
 {src:'jojo-interior-brand.webp',alt:'Signage logo JOJO berwarna merah dekat area counter',label:'Logo JOJO'}
];

function GalleryImage({item,priority=false}:{item:EditorialPhoto;priority?:boolean}){
 return <figure className="jojo-editorial-gallery-photo">
  <img src={base+item.src} alt={item.alt} width="1200" height="1500" loading={priority?'eager':'lazy'} decoding="async"/>
  <figcaption>{item.label}</figcaption>
 </figure>;
}

export function StoryNature(){
 return <section className="jojo-photo-story jojo-photo-story-nature" aria-labelledby="jojo-nature-title">
  <div className="jojo-photo-story-heading">
   <div><h2 id="jojo-nature-title">Dari buah <em>ke gelas</em></h2></div>
   <p>Lihat alpukat dari pohon hingga disajikan sebagai jus.</p>
  </div>
  <div className="jojo-nature-grid">{freshness.map(item=><GalleryImage key={item.src} item={item}/>)}</div>
 </section>;
}

export function StoryStreet(){
 return <section className="jojo-photo-story jojo-photo-story-street" aria-labelledby="jojo-street-title">
  <div className="jojo-photo-story-heading">
   <div><h2 id="jojo-street-title">JOJO di <em>kota</em></h2></div>
  </div>
  <div className="jojo-street-grid">{moments.map(item=><GalleryImage key={item.src} item={item}/>)}</div>
  <div className="jojo-gallery-ending"><span>{JOJO_TAGLINE.toUpperCase()}</span><a href="/menu">Lihat menu <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg></a></div>
 </section>;
}

export function OutletExperience(){
 return <section className="jojo-photo-story jojo-photo-story-outlet" aria-labelledby="jojo-experience-title">
  <div className="jojo-photo-story-heading">
   <div><h2 id="jojo-experience-title">Suasana <em>gerai</em></h2></div>
   <p>Lihat area duduk dan meja pemesanan di gerai JOJO.</p>
  </div>
  <div className="jojo-interior-grid">{interiors.map(item=><GalleryImage key={item.src} item={item}/>)}</div>
  <div className="jojo-gallery-ending"><span>SUASANA DAPAT BERBEDA DI SETIAP CABANG</span><a href="#outlet-list">Lihat daftar gerai <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 5v14m-6-6 6 6 6-6"/></svg></a></div>
 </section>;
}
