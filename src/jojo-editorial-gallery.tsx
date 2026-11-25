import {JOJO_TAGLINE} from './brand-copy';
import './jojo-editorial-gallery.css';

const base='/brands/editorial/';

type EditorialPhoto={src:string;alt:string;label:string};
const freshness:EditorialPhoto[]=[
 {src:'jojo-avocado-tree.webp',alt:'Tangan memetik buah alpukat segar dari pohon',label:'01 / THE FRUIT'},
 {src:'jojo-avocado-harvest.webp',alt:'Buah alpukat hijau segar dirangkul dalam kedua tangan',label:'02 / THE HARVEST'},
 {src:'jojo-avocado-juice.webp',alt:'Minuman JOJO Juice di samping buah alpukat dan dedaunan hijau',label:'03 / THE FRESHNESS'}
];

const moments:EditorialPhoto[]=[
 {src:'jojo-street-drink.webp',alt:'Minuman JOJO berwarna ungu ditampilkan di depan teman yang sedang menikmati minuman',label:'01 / SIP'},
 {src:'jojo-street-overhead.webp',alt:'Dua teman berbincang sambil menikmati makanan dan minuman dari sudut pandang atas',label:'02 / GATHER'},
 {src:'jojo-street-moving.webp',alt:'Dua orang berjalan sambil membawa minuman JOJO di tengah bayangan cahaya kota',label:'03 / MOVE'},
 {src:'jojo-street-moment.webp',alt:'Dua teman membawa minuman JOJO di area urban dengan bayangan tangga',label:'04 / SHARE'}
];

const interiors:EditorialPhoto[]=[
 {src:'jojo-interior-counter.webp',alt:'Area counter minuman dengan signage merah BOOST YOUR ENERGY',label:'01 / ENERGY'},
 {src:'jojo-interior-space.webp',alt:'Area duduk JOJO dengan logo merah dan tulisan Nature in Every Drop',label:'02 / SPACE'},
 {src:'jojo-interior-seating.webp',alt:'Meja putih dan kursi hangat di area duduk dengan tanaman',label:'03 / CORNER'},
 {src:'jojo-interior-brand.webp',alt:'Signage logo JOJO berwarna merah dekat area counter',label:'04 / IDENTITY'}
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
   <div><span className="eyebrow">NATURE IN EVERY DROP</span><h2 id="jojo-nature-title">FRESH FROM<br/><em>NATURE.</em></h2></div>
   <p>Segar dimulai dari yang sederhana: warna buah, tekstur alami, dan rasa yang bikin penasaran. Intip inspirasi visual kesegaran JOJO dari kebun sampai ke gelas.</p>
  </div>
  <div className="jojo-nature-grid">{freshness.map(item=><GalleryImage key={item.src} item={item}/>)}</div>
 </section>;
}

export function StoryStreet(){
 return <section className="jojo-photo-story jojo-photo-story-street" aria-labelledby="jojo-street-title">
  <div className="jojo-photo-story-heading">
   <div><span className="eyebrow">JOJO EVERYDAY</span><h2 id="jojo-street-title">GOOD TIMES.<br/><em>ON THE GO.</em></h2></div>
   <p>Dari ngobrol sampai jalan bareng, setiap tegukan punya cerita sendiri. Momen urban dalam warna, cahaya, dan energi JOJO.</p>
  </div>
  <div className="jojo-street-grid">{moments.map(item=><GalleryImage key={item.src} item={item}/>)}</div>
  <div className="jojo-gallery-ending"><span>{JOJO_TAGLINE.toUpperCase()}</span><a href="/menu">FIND YOUR FRESH MOOD <span aria-hidden="true">↗</span></a></div>
 </section>;
}

export function OutletExperience(){
 return <section className="jojo-photo-story jojo-photo-story-outlet" aria-labelledby="jojo-experience-title">
  <div className="jojo-photo-story-heading">
   <div><span className="eyebrow">A LOOK INSIDE JOJO</span><h2 id="jojo-experience-title">THE JOJO<br/><em>EXPERIENCE.</em></h2></div>
   <p>Detail ruang, cahaya hangat, dan energi merah JOJO. Cuplikan suasana interior yang bikin momen singgah terasa lebih seru.</p>
  </div>
  <div className="jojo-interior-grid">{interiors.map(item=><GalleryImage key={item.src} item={item}/>)}</div>
  <div className="jojo-gallery-ending"><span>SUASANA DAPAT BERBEDA DI SETIAP CABANG</span><a href="#outlet-list">LIHAT DAFTAR OUTLET <span aria-hidden="true">↓</span></a></div>
 </section>;
}
