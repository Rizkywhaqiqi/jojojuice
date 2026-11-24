/** Canonical public destinations sourced from https://linktr.ee/jojojuiceid (24 Nov 2026). */
export const JOJO_LINKS={
 instagram:'https://www.instagram.com/jojojuiceid/',
 whatsapp:'https://wa.me/628115617070',
 esb:'https://esborder.qs.esb.co.id/JOJO',
 gofood:'https://gofood.co.id/id/pontianak/restaurant/jojo-juice-hos-cokroaminoto-9c6db4c4-c6f8-4679-bedf-d0661658b63a',
 shopee:'https://shopee.co.id/universal-link/now-food/shop/1101258?deep_and_deferred=1&shareChannel=copy_link',
 grab:'https://r.grab.com/g/6-20241030_134952_ac07e438c8b15889_MEXMPS-6-C6EUGE3KHBJBLT',
 juiceMenu:'https://drive.google.com/drive/folders/1KtIehnAN48CHMQVG3mSAIZRhUfyJvZ1o',
 dailyBarMenu:'https://drive.google.com/file/d/13ewWMAXhaOQRNz6AbHh3BXMJJHTI-jOQ/view?usp=drivesdk',
 linktree:'https://linktr.ee/jojojuiceid'
} as const;
export type OutletArea='Pontianak'|'Singkawang'|'Mempawah'|'Kubu Raya';
export type Outlet={name:string;area:OutletArea;maps:string;kind?:'daily'};
export const JOJO_OUTLETS:Outlet[]=[
 {name:'Jojo Daily Bar',area:'Singkawang',kind:'daily',maps:'https://maps.app.goo.gl/D9eme5XX4afb4geu7'},
 {name:'Jojo Juice Niaga',area:'Singkawang',maps:'https://www.google.com/maps/@0.9097339,108.9890588,3a,75y,89.8h,84.15t/data=!3m7!1e1!3m5!1sUAUJE5hY4GW03F59F6bj6w!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client=maps_sv.tactile%26w=900%26h=600%26pitch=5.849999999999994%26panoid=UAUJE5hY4GW03F59F6bj6w%26yaw=89.8!7i16384!8i8192?coh=205410&entry=ttu'},
 {name:'Jojo Juice Sui Pinyuh',area:'Mempawah',maps:'https://maps.app.goo.gl/GW5cfTZ18DqX8hfs8'},
 {name:'Jojo Juice Merdeka',area:'Pontianak',maps:'https://goo.gl/maps/5a6ZieKLr3ExHtmK9'},
 {name:'Jojo Juice Citra Garden Aneka',area:'Kubu Raya',maps:'https://maps.app.goo.gl/LwxtHxyWcs35LrNk6'},
 {name:'Jojo Juice Ks Tubun',area:'Pontianak',maps:'https://goo.gl/maps/wJuhjYTFV9gYkAGR9'},
 {name:'Jojo Juice Ayani',area:'Pontianak',maps:'https://goo.gl/maps/E93acWENXr2crag37'},
 {name:'Jojo Juice Tanjung Raya II',area:'Pontianak',maps:'https://goo.gl/maps/6FZKvgrn8U6fzzz36'},
 {name:'Jojo Juice Podomoro',area:'Pontianak',maps:'https://goo.gl/maps/LRf3UmEkZahiMUcH7'},
 {name:'Jojo Juice Serdam I',area:'Pontianak',maps:'https://goo.gl/maps/ahacPgzTVvbagx9L8'},
 {name:'Jojo Juice Serdam II',area:'Pontianak',maps:'https://goo.gl/maps/uorRW4VcBUG1Rfxs6'},
 {name:'Jojo Juice Purnama',area:'Pontianak',maps:'https://goo.gl/maps/LNkqsdXo4eB4daod6'},
 {name:'Jojo Juice & JLy Dessert Suwignyo',area:'Pontianak',maps:'https://goo.gl/maps/WiyskeCD87yQgqwa8'},
 {name:'Jojo Juice Dr. Wahidin',area:'Pontianak',maps:'https://goo.gl/maps/eHAQx6tLHyJyBCU8A'},
 {name:'Jojo Juice GAIA',area:'Pontianak',maps:'https://maps.app.goo.gl/pawYV3nB8qPwdcpq7'},
 {name:'Jojo Juice Siantan',area:'Pontianak',maps:'https://maps.app.goo.gl/ANUz23ofUeCnDKs47'},
 {name:'Jojo Juice Mega Mall',area:'Pontianak',maps:'https://goo.gl/maps/b1TCAQip8qp4Y26S8'},
 {name:'Jojo Juice Suprapto',area:'Pontianak',maps:'https://goo.gl/maps/rGnEdxx6Nw6KPMuT7'}
];
