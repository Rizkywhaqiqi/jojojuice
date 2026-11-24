import {useMemo,useState} from 'react';
import './menu-catalog.css';

type Item={name:string;price:number;featured?:boolean;description?:string};
type Group={id:string;title:string;subtitle:string;items:Item[];image?:string;imageAlt?:string};
const groups:Group[]=[
 {id:'refresher',title:'Refresher Series',subtitle:'100% pure. 100% refreshing. No sugar added.',image:'/brands/jojo-green.webp',imageAlt:'JOJO Green N Glow',items:[
  {name:'Detoxify',price:26},{name:'Tropical Twist',price:28},{name:'Boost Immunity',price:28},{name:'Green N Glow',price:28,featured:true},{name:'Inner Glow',price:31},{name:'Vitablends',price:31}
 ]},
 {id:'special',title:'Special Series',subtitle:'Pilihan signature yang playful dan penuh warna.',image:'/brands/jojo-dragon.webp',imageAlt:'JOJO Dragon Ball',items:[
  {name:'Mahadruka',price:26},{name:'Avocado Dalgona',price:26},{name:'Mango Magic',price:26},{name:'Mango Wahaha',price:26},{name:'Dragon Ball',price:26,featured:true},{name:'Berry Boom',price:26}
 ]},
 {id:'juice',title:'Fruit Juice',subtitle:'Buah segar, favorit sepanjang hari.',image:'/brands/jojo-refresh.webp',imageAlt:'Minuman buah JOJO',items:[
  {name:'Melon',price:15},{name:'Watermelon',price:15},{name:'Tomato',price:15},{name:'Carrot',price:15},{name:'Orange',price:17},{name:'Dragonfruit',price:17},
  {name:'Banana',price:17},{name:'Red Guava',price:18},{name:'Mango',price:18},{name:'Grape',price:18},{name:'Apple',price:18},{name:'Soursop',price:18},{name:'Kiwi',price:18},{name:'Strawberry',price:20},{name:'Avocado',price:22},{name:'Orange PURE!',price:21}
 ]},
 {id:'mixed',title:'Mixed Juice',subtitle:'Kombinasi buah dengan berbagai karakter rasa.',items:[
  {name:'Papayakult',price:18},{name:'M.L.C.',price:18},{name:'TomCat',price:18},{name:'O.T.',price:18},{name:'Popeye Power',price:18},{name:'Big Red',price:18},{name:"Barry's",price:20},{name:'Salted Apple',price:20},{name:'Blackberry',price:22},{name:'Mango Mang',price:22},{name:'Fruit Punch',price:23},{name:'Pink Panther',price:23}
 ]},
 {id:'oreo',title:'Oreo Series',subtitle:'Creamy, cookies, dan cokelat.',items:[
  {name:"Cookies 'n Cream",price:18},{name:'Cookies Latte',price:18},{name:'Choco Oreo',price:18},{name:'Matcha Oreo',price:18},{name:'Cookies Mint',price:19}
 ]},
 {id:'foam',title:'Milk Foam',subtitle:'Lapisan lembut untuk pilihan minumanmu.',items:[
  {name:'Milo Milk Foam',price:19},{name:'Black Chocolate Milk Foam',price:19},{name:'Matcha Milk Foam',price:19},{name:'Coffee O Milk Foam',price:19},{name:'Very Berry Milk Foam',price:19},{name:'Lemonade Milk Foam',price:19},{name:'Lychee Tea Milk Foam',price:19}
 ]},
 {id:'coffee',title:'Coffee',subtitle:'Jeda segar untuk penikmat kopi.',items:[
  {name:'Coffee Latte',price:17},{name:'Cappuccino',price:17},{name:'Hazelnut Latte',price:18},{name:'Mocha Pop',price:19},{name:'Caramel Latte',price:19},{name:'Avocado Coffee',price:24}
 ]},
 {id:'tea',title:'Tea Series',subtitle:'Ringan dan menyegarkan.',items:[
  {name:'Milk Tea',price:16},{name:'Thai Iced Tea',price:16},{name:'Lychee Jasmine Tea',price:16},{name:'Jasmine Milk Tea',price:18},{name:'Caramel Milk Tea',price:18},{name:'Hazelnut Milk Tea',price:18},{name:'Green Tea',price:18}
 ]},
 {id:'chocolate',title:'Choco Latte',subtitle:'Cokelat untuk setiap mood.',items:[
  {name:'Original Chocolate',price:17},{name:'Milo',price:17},{name:'Choco Hazelnut',price:18},{name:'Choco Mint',price:18},{name:'Choco Blackforest',price:18},{name:'Choco Caramel',price:18},{name:'Choco Milo',price:24}
 ]},
 {id:'others',title:'Other Favorites',subtitle:'Variasi rasa di luar menu klasik.',items:[
  {name:'Vanilla Milk',price:17},{name:'Taro Yam',price:17},{name:'Peppermint',price:17}
 ]},
 {id:'bowl',title:'Fruit Bowl',subtitle:'Segarnya buah dalam mangkuk.',items:[
  {name:'Mango Tango',price:26},{name:'Avocado Delight',price:28}
 ]},
 {id:'handwich',title:'Handwich',subtitle:'Pilihan savory untuk teman minuman.',items:[
  {name:'Smoked Chicken Handwich',price:29},{name:'Chicken Schnitzel Handwich',price:29},{name:'Tortilla Handwich',price:29}
 ]},
 {id:'potato',title:'Potato Party',subtitle:'Cemilan renyah untuk dibagi.',items:[
  {name:'French Fries',price:26},{name:'Crisscut Potato',price:26},{name:'Hashbrown Potato',price:26},{name:'Potato Wedges',price:26}
 ]},
 {id:'bakery',title:'Pastry & Bakery',subtitle:'Teman yang buttery, manis, dan savory.',items:[
  {name:'Choco Suisse',price:21},{name:'Pandan Suisse',price:21},{name:'Classic Ribbon',price:18},{name:'Red Bean Suisse',price:21},{name:'Classic Croissant',price:18},{name:'Sugar Cheese',price:21},{name:'Cinnamon Roll',price:18},{name:'Milk Choco',price:24}
 ]},
 {id:'daily',title:'Daily Bowl',subtitle:'Pilihan bowl yang lebih mengenyangkan.',items:[
  {name:'Pine Drip BBQ Chicken',price:33},{name:'Golden Crunch Chicken',price:33}
 ]}
];
const format=(value:number)=>'Rp '+new Intl.NumberFormat('id-ID').format(value*1000);
export default function MenuCatalog(){
 const [category,setCategory]=useState('all');
 const [query,setQuery]=useState('');
 const search=query.trim().toLocaleLowerCase('id');
 const filtered=useMemo(()=>groups.filter(group=>(category==='all'||category===group.id)).map(group=>({...group,items:group.items.filter(item=>!search||[item.name,group.title,group.subtitle].some(text=>text.toLocaleLowerCase('id').includes(search)))})).filter(group=>group.items.length>0),[category,search]);
 const count=filtered.reduce((sum,g)=>sum+g.items.length,0);
 return <div className="menu-catalog">
  <section className="catalog-intro">
   <span className="eyebrow">FEEL FRESH. LIVE FUN.</span>
   <h1>THE <span>MENU.</span></h1>
   <p>Dari jus buah sampai camilan gurih. Pilih yang paling cocok buat harimu.</p>
   <div className="catalog-intro-links"><a className="button" href="#pilihan-menu">JELAJAHI MENU</a><a href="https://www.instagram.com/jojojuiceid/" target="_blank" rel="noopener noreferrer" className="catalog-inline-cta">TANYA KETERSEDIAAN</a></div>
  </section>
  <section className="catalog-featured" aria-label="Pilihan minuman unggulan">
   <div className="catalog-featured-text"><span className="eyebrow">THE FRESH SIDE OF JOJO</span><h2>SEGAR<br/>DARI<br/><em>BUAH.</em></h2><p>Refresher, special blends, dan banyak pilihan lainnya.</p></div>
   <div className="catalog-featured-images"><figure><img src="/brands/jojo-green.webp" alt="Green N Glow" loading="eager"/><figcaption>GREEN N GLOW</figcaption></figure><figure><img src="/brands/jojo-dragon.webp" alt="Dragon Ball" loading="eager"/><figcaption>DRAGON BALL</figcaption></figure><figure><img src="/brands/jojo-refresh.webp" alt="Minuman buah JOJO" loading="eager"/><figcaption>FRESH EVERY DAY</figcaption></figure></div>
  </section>
  <section className="catalog-body section" id="pilihan-menu">
   <div className="catalog-body-head"><div><span className="eyebrow">DARI MENU RESMI JOJO</span><h2>PILIH <em>RASAMU.</em></h2></div><p>Harga yang tertera mengikuti materi menu yang dibagikan. Harga dalam rupiah; ketersediaan dan harga outlet dapat berubah.</p></div>
   <div className="catalog-toolbar"><label className="catalog-search"><span className="sr-only">Cari nama menu atau kategori</span><input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Cari minuman atau makanan…" aria-label="Cari menu"/></label><div className="catalog-category-bar" role="group" aria-label="Filter kategori"><button type="button" aria-pressed={category==='all'} className={category==='all'?'selected':''} onClick={()=>setCategory('all')}>SEMUA</button>{groups.map(group=><button type="button" key={group.id} aria-pressed={category===group.id} className={category===group.id?'selected':''} onClick={()=>setCategory(group.id)}>{group.title}</button>)}</div></div>
   <p className="catalog-count" aria-live="polite">{count} ITEM · {filtered.length} KATEGORI</p>
   {count===0?<div className="catalog-empty"><h3>MENU TIDAK DITEMUKAN.</h3><p>Coba kata lain atau lihat semua kategori.</p><button className="button" onClick={()=>{setQuery('');setCategory('all')}}>LIHAT SEMUA</button></div>:filtered.map((group,index)=><section className="catalog-group" key={group.id} aria-labelledby={'cat-'+group.id}>
    <div className="catalog-group-top"><div><span className="catalog-index">{String(index+1).padStart(2,'0')} / MENU</span><h3 id={'cat-'+group.id}>{group.title}</h3><p>{group.subtitle}</p></div>{group.image&&<img src={group.image} alt={group.imageAlt||group.title} width="220" height="250" loading="lazy"/>}</div>
    <div className="catalog-item-grid">{group.items.map(item=><article className="catalog-item" key={item.name}><div><span className="catalog-item-name">{item.name}</span>{item.featured&&<span className="catalog-favorite" aria-label="Pilihan unggulan">FAVORIT</span>}</div><strong>{format(item.price)}</strong></article>)}</div>
   </section>)}
   <aside className="catalog-note"><strong>CATATAN MENU</strong><p>Harga disalin dari materi desain menu JOJO yang diberikan. Beberapa materi menunjukkan versi harga berbeda; angka di halaman ini menggunakan versi visual menu yang lebih terperinci untuk setiap kategori. Untuk harga dan stok terkini, konfirmasi lewat outlet atau Instagram resmi.</p><p><strong>TOPPING:</strong> Chia Seed, Bubble, Grass Jelly, Coffee Jelly, Rainbow Jelly, Nata De Coco, Popping Boba, Bouncing Pearl — tambahan Rp 4.000 menurut materi menu.</p></aside>
   <div className="catalog-footer-cta"><div><span className="eyebrow">LAGI HAUS?</span><h2>JOJO AJA.</h2></div><a className="button" href="https://www.instagram.com/jojojuiceid/" target="_blank" rel="noopener noreferrer">TANYA & PESAN</a></div>
  </section>
 </div>;
}
