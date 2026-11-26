type Item={name:string;price:number;featured?:boolean;description?:string};
export type Group={id:string;title:string;subtitle:string;items:Item[];image?:string;imageAlt?:string};
export const groups:Group[]=[
 {id:'refresher',title:'Refresher Series',subtitle:'Racikan buah dan sayur dengan karakter rasa yang beda-beda.',image:'/brands/jojo-green.webp',imageAlt:'JOJO Green N Glow',items:[
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
export const format=(value:number)=>'Rp '+new Intl.NumberFormat('id-ID').format(value*1000);

export const categoryHref=(id:string)=>id==='refresher'?'/refresher':`/menu/${id}`;
