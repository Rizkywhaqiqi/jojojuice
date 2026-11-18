export const PUBLIC_PAGES=[
 {path:'/',label:'Beranda',title:'JOJO Juice — Feel Fresh, Live Fun',description:'Sedikit segar. Banyak serunya. Kenali jus buah, smoothie, dan momen JOJO Juice.'},
 {path:'/tentang',label:'Tentang',title:'Tentang JOJO Juice — Cerita kami',description:'Kenali cerita dan karakter JOJO Juice: jeda segar dan momen penuh warna.'},
 {path:'/menu',label:'Menu',title:'Menu JOJO Juice — Temukan rasa segarmu',description:'Jelajahi pilihan jus dan smoothie JOJO Juice, termasuk Dragon Ball dan Green N Glow.'},
 {path:'/outlet',label:'Outlet',title:'Outlet JOJO Juice — Temukan lokasi terdekat',description:'Cari outlet JOJO Juice, lihat alamat, jam operasional, titik peta, dan petunjuk arah.'},
 {path:'/kontak',label:'Kontak',title:'Kontak JOJO Juice — Tetap terhubung',description:'Terhubung dengan JOJO Juice melalui Instagram resmi dan temukan kabar terbarunya.'},
 {path:'/pesan',label:'Pesan sekarang',title:'Pesan JOJO Juice — Pilih layanan favoritmu',description:'Temukan tautan pemesanan JOJO Juice dan layanan order dari outlet terdekat.'},
];
export const normalizePath=(path:string)=>path.replace(/\/+$/,'')||'/';
