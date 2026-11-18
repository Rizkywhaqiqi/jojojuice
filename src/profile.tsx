import {useEffect,useState} from 'react';
import Outlets,{OrderButtons} from './outlets';
import {api,DEFAULT_CONTENT,type Snapshot} from './content';
import {ArrowUpRight,ExternalLink} from 'lucide-react';
import BrandMenu from './menu';
import BrandHero from './heroes';
import {BRANDS} from './brands';
const PRODUCT_PHOTOS=[{src:'jojo-refresh',alt:'Minuman JOJO berwarna jingga dalam kampanye Made to refresh'},{src:'jojo-dragon',alt:'Minuman Dragon Ball JOJO dengan topping krim'},{src:'jojo-green',alt:'Minuman Green N Glow JOJO berwarna hijau'}];
const MOMENTS=[{src:'jojo-together',alt:'Dua minuman JOJO dinikmati bersama di bawah langit biru',caption:'Lebih seru, bareng kamu.'},{src:'jojo-picnic',alt:'Momen piknik dengan buah dan minuman JOJO',caption:'Segarnya ikut ke mana saja.'},{src:'jojo-moments',alt:'Menikmati minuman JOJO saat piknik di taman',caption:'Jeda kecil, banyak cerita.'}];
const STORIES:Record<string,{headline:string;accent:string;intro:string;story:string;moments:string[][]}>={
 'jojo-juice':{headline:'Segarnya rasa.',accent:'Serunya hari.',intro:'Sedikit jeda, banyak warna. Temani harimu dengan pilihan jus buah dan smoothie dari JOJO Juice.',story:'Ada banyak cara menikmati hari. Melangkah keluar, bertemu teman, atau sekadar berhenti sebentar untuk menikmati minuman favorit. JOJO Juice hadir untuk menjadi bagian dari momen-momen itu.',moments:[['Jus buah','Warna dan rasa buah dalam pilihan minuman JOJO.'],['Smoothie','Pilihan untuk menemani jeda di tengah aktivitas.'],['Momen bersama','Dari waktu sendiri sampai kumpul bareng teman.']]},

};
export default function BrandProfile({slug}:{slug:string}){
 const [content,setContent]=useState(DEFAULT_CONTENT);useEffect(()=>{api<Snapshot>('content').then(s=>setContent(s.content)).catch(()=>{})},[]);
 const b={...BRANDS.find(b=>b.slug===slug)!,url:content.profile.instagram};const story={...STORIES[slug],intro:content.profile.intro};
 return <div className={`brand-profile bp-${b.style}`}>
  <header className="bp-header"><a href="/" className="bp-wordmark" aria-label={`Beranda ${b.name}`}>{b.name}<small>FEEL FRESH, LIVE FUN</small></a><nav aria-label={`Navigasi ${b.name}`}><a href="#cerita">Cerita kami</a><a href="#rasa">Pilihan rasa</a><a href="#outlet">Outlet</a><a href="#terhubung">Terhubung</a></nav><a className="bp-header-order" href="#pesan">Pesan sekarang <ArrowUpRight size={16}/></a><BrandMenu/></header>
  <main>
   <BrandHero b={b} story={story}/>
   <div className="bp-ribbon" aria-hidden="true"><span>{b.name}</span><span>✱</span><span>{b.tagline}</span><span>✱</span><span>{b.sub}</span></div>
   <section id="cerita" className="bp-story"><div><p className="bp-kicker">KENALAN LEBIH DEKAT</p><h2>{content.profile.aboutTitle}</h2></div><div><p className="bp-large-copy">{content.profile.aboutText}</p><p>{b.description}</p><a className="bp-inline-link" href={b.url} target="_blank" rel="noopener noreferrer">Ikuti keseharian kami <ArrowUpRight size={18}/></a></div></section>
   <section id="rasa" className="bp-tastes"><div className="bp-section-heading"><div><p className="bp-kicker">TEMUKAN FAVORITMU</p><h2>Rasa, suasana,<br/><em>dan momen bersama.</em></h2></div><p>Kenali karakter {b.name}. Untuk menu, ketersediaan, dan informasi outlet terbaru, kunjungi Instagram resmi kami.</p></div><div className="bp-taste-grid">{story.moments.map(([title,text],i)=><article key={title}><img className="bp-product-photo" src={`/brands/${PRODUCT_PHOTOS[i].src}.webp`} alt={PRODUCT_PHOTOS[i].alt} width={1080} height={1350} loading="lazy" decoding="async"/><span>0{i+1}</span><h3>{title}</h3><p>{text}</p></article>)}</div><a className="bp-inline-link" href={b.url} target="_blank" rel="noopener noreferrer">Lihat menu & kabar terbaru di Instagram <ArrowUpRight size={18}/></a></section>
   <section className="jojo-gallery" aria-labelledby="moments-title"><div className="bp-section-heading"><div><p className="bp-kicker">FRESH DAYS, FUN MOMENTS</p><h2 id="moments-title">Warna segar<br/><em>di setiap cerita.</em></h2></div><p>Dari langit biru sampai piknik di taman, temukan momen JOJO favoritmu.</p></div><div className="jojo-moment-grid">{MOMENTS.map(photo=><figure key={photo.src}><img src={`/brands/${photo.src}.webp`} alt={photo.alt} width={1080} height={1350} loading="lazy" decoding="async"/><figcaption>{photo.caption}</figcaption></figure>)}</div></section>
   <Outlets outlets={content.outlets}/>
   <section id="pesan" className="jojo-order-section"><p className="bp-kicker">YOUR FRESH FIX, ONE TAP AWAY</p><h2>Segarnya JOJO,<br/><em>tinggal pesan.</em></h2><p>Pilih layanan pemesanan favoritmu atau temukan tautan langsung dari outlet terdekat.</p>{content.orderLinks.length>0?<OrderButtons links={content.orderLinks}/>:<a className="bp-button" href={b.url} target="_blank" rel="noopener noreferrer">Tanya pemesanan di Instagram <ArrowUpRight size={17}/></a>}<a className="bp-inline-link" href="#outlet">Temukan outlet <ArrowUpRight size={16}/></a></section>
   <section id="terhubung" className="bp-connect"><p className="bp-kicker">LET’S STAY CONNECTED</p><h2>Ceritanya masih<br/><em>berlanjut.</em></h2><p>Temukan kabar, menu, dan momen terbaru {b.name} di Instagram resmi kami.</p><a className="bp-button" href={b.url} target="_blank" rel="noopener noreferrer"><ExternalLink size={18}/> Instagram JOJO Juice <ArrowUpRight size={18}/></a></section>

  </main>
  <footer className="bp-footer"><a className="bp-wordmark" href="/">{b.name}</a><span>© {new Date().getFullYear()} {b.name} · Feel Fresh, Live Fun</span><a href="/admin">Pengelola <ArrowUpRight size={15}/></a></footer>
 </div>
}
