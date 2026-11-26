import {format, type Group} from './menu-data';
import './menu-category.css';

const refresherProfiles=[
 {title:'Fruity & Tropical', drinks:[
  {id:'tropical-twist',name:'Tropical Twist', ingredients:'Nanas, jeruk Sunkist, kelapa', taste:'Rasa tropis yang ringan dengan sentuhan kelapa.'},
  {id:'inner-glow',name:'Inner Glow',ingredients:'Wortel, apel, jeruk Sunkist, jahe',taste:'Buah dan wortel dengan sedikit hangat dari jahe.'},
 ]},
 {title:'Fresh & Green', drinks:[
  {id:'green-n-glow',name:'Green N Glow',ingredients:'Apel, bayam, nanas, timun',taste:'Rasa hijau yang segar dengan manis-asam dari nanas.'},
  {id:'vitablends',name:'Vitablends',ingredients:'Jeruk, apel, bit, seledri',taste:'Perpaduan buah dengan karakter bit dan seledri.'},
 ]},
 {title:'Boost & Bold', drinks:[
  {id:'boost-immunity',name:'Boost Immunity',ingredients:'Jeruk Sunkist, jahe, madu',taste:'Rasa jeruk dengan sentuhan jahe dan madu.'},
 ]},
 {title:'Crisp & Refreshing', drinks:[
  {id:'detoxify',name:'Detoxify',ingredients:'Semangka, jeruk nipis, seledri, jahe',taste:'Semangka yang ringan dengan rasa asam dari jeruk nipis.'},
 ]},
];

export default function MenuCategory({group}:{group:Group}){
 const refresher=group.id==='refresher';
 return <div className="menu-category">
  <section className={`menu-category-hero${group.image?' has-image':''}`}>
   <div>
    <a className="menu-category-back" href="/menu#pilihan-menu">Kembali ke katalog</a>
    {refresher&&<p className="eyebrow">{group.title}</p>}
    <h1>{refresher?'Nature’s Goodness':group.title}</h1>
    <p>{refresher?'Buah dan sayur dalam satu gelas. Lagi pengin yang tropis, ringan, atau ada sentuhan jahe? Pilih racikanmu di bawah.':group.subtitle}</p>
    <div className="menu-category-actions">
     <a className="button" href="#pilihan-kategori">Lihat pilihan</a>
     <a className="button outline" href="/how-to-order#order-platforms">Pesan JOJO</a>
    </div>
   </div>
   {group.image&&<img src={group.image} alt={group.imageAlt??''} fetchPriority="high"/>}
  </section>
  <section className="section menu-category-list" id="pilihan-kategori">
   <h2>{refresher?'Kenali enam racikannya':'Pilihan menu'}</h2>
   {refresher?refresherProfiles.map(profile=><section className="menu-category-profile" key={profile.title}>
    <h3>{profile.title}</h3>
    <div>{profile.drinks.map(drink=><article className="menu-category-item" key={drink.id} id={drink.id}>
     <div><h4>{drink.name}</h4><p>{drink.ingredients}</p><p>{drink.taste}</p></div>
     <strong>{format(group.items.find(item=>item.name===drink.name)!.price)}</strong>
    </article>)}</div>
   </section>):<div>{group.items.map(item=><article className="menu-category-item" key={item.name}>
    <h3>{item.name}</h3><strong>{format(item.price)}</strong>
   </article>)}</div>}
   <p className="menu-category-note">Harga dan ketersediaan bisa berbeda di tiap gerai atau aplikasi.</p>
   <a className="button" href="/how-to-order#order-platforms">Pilih layanan pesan</a>
  </section>
 </div>;
}
