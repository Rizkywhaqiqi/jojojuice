import {JOJO_LINKS} from './jojo-links';
import {OrderOptions} from './jojo-directory';
import './how-to-order.css';

const steps=[
 {num:'01',title:'PILIH MENU',copy:'Lihat pilihan minuman dan makanan JOJO terlebih dahulu. Temukan rasa favoritmu sebelum mulai memesan.',label:'LIHAT MENU',url:'/menu'},
 {num:'02',title:'PILIH PLATFORM',copy:'Kamu bisa memesan lewat ESB Order, GoFood, ShopeeFood, atau GrabFood. Pilih yang paling nyaman dan tersedia di lokasimu.',label:'PILIH LAYANAN',url:'#order-platforms'},
 {num:'03',title:'SELESAIKAN PESANAN',copy:'Pilih outlet dan item yang tersedia di aplikasi, cek detail serta total harga, lalu ikuti langkah pembayaran dan pengantaran atau pengambilan.',label:'LIHAT OPSI PEMESANAN',url:'#order-platforms'}
];
export default function HowToOrder(){
 return <div className="how-order">
  <section className="how-order-hero">
   <div className="how-order-hero-content"><span className="eyebrow">FEEL FRESH. LIVE FUN.</span><h1>HOW TO<br/><em>ORDER.</em></h1><p>Pesan JOJO favoritmu dengan cara yang paling gampang. Tiga langkah, siap fresh!</p><a className="button" href="#order-steps">MULAI DI SINI</a></div>
   <img src="/brands/jojo-refresh.webp" width="560" height="600" alt="Pilihan minuman JOJO" fetchPriority="high"/>
  </section>
  <section className="how-order-steps section" id="order-steps"><div className="how-order-head"><span className="eyebrow">SIMPLE AS 1, 2, 3</span><h2>TINGGAL<br/><em>IKUTI.</em></h2><p>Semua transaksi dilakukan di layanan pemesanan resmi yang kamu pilih, bukan di website ini.</p></div>
   <div className="how-order-steps-grid">{steps.map(step=><article className="how-order-step" key={step.num}><span className="how-order-number">{step.num}</span><div><h3>{step.title}</h3><p>{step.copy}</p></div><a href={step.url} {...(step.url.startsWith('http')?{target:'_blank',rel:'noopener noreferrer'}:{})}>{step.label}</a></article>)}</div>
  </section>
  <div id="order-platforms"><OrderOptions/></div>
  <section className="how-order-help section"><div><span className="eyebrow">BUTUH BANTUAN?</span><h2>LET'S <em>TALK.</em></h2><p>Ketersediaan outlet, harga, metode pembayaran, dan pilihan pengantaran mengikuti ketentuan masing-masing platform. Kalau ada pertanyaan, hubungi JOJO lewat WhatsApp.</p></div><a className="button" href={JOJO_LINKS.whatsapp} target="_blank" rel="noopener noreferrer">CHAT WHATSAPP</a></section>
 </div>;
}
