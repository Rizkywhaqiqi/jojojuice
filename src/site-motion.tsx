import {useEffect} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import './motion.css';

/**
 * JOJO motion is a progressive enhancement. All content is readable without
 * JavaScript or when the user prefers reduced motion. Context + matchMedia
 * revert every inline transform/opacity and ScrollTrigger on unmount/change.
 *
 * Keep video playback in useCoordinatedVideo, not in this component.
 */
export default function SiteMotion(){
 useEffect(()=>{
  const root=document.querySelector<HTMLElement>('#main-content');
  if(!root)return;

  gsap.registerPlugin(ScrollTrigger);
  const media=gsap.matchMedia();
  const context=gsap.context(()=>{
   media.add('(prefers-reduced-motion: no-preference)',()=>{
    const isMobile=window.matchMedia('(max-width: 760px)').matches;
    const duration=isMobile?.58:.78;
    const distance=isMobile?16:28;

    // Landing animation only for the first visible, photo-led hero.
    const hero=root.querySelector<HTMLElement>('.jojo-editorial-hero');
    if(hero){
     const headline=hero.querySelector<HTMLElement>('h1');
     const headingItems=Array.from(hero.querySelectorAll<HTMLElement>(
      '.jojo-editorial-kicker,h1,p,.jojo-editorial-actions'
     ));
     if(headline){
      gsap.fromTo(headingItems,
       {autoAlpha:0,y:isMobile?18:35},
       {autoAlpha:1,y:0,duration:.88,ease:'power3.out',
        stagger:.12,delay:.08,clearProps:'opacity,visibility,transform'});
     }
     const photo=hero.querySelector<HTMLElement>('.jojo-editorial-hero-image');
     if(photo){
      gsap.fromTo(photo,
       {scale:1.045},
       {scale:1,duration:1.5,ease:'power2.out',clearProps:'transform'});
     }
    }

    // The rest of the routes use a restrained title entrance.
    root.querySelectorAll<HTMLElement>(
     '.catalog-intro h1,.how-order-hero h1,.jojo-page-hero h1'
    ).forEach(title=>{
     gsap.fromTo(title,{autoAlpha:0,y:22},
      {autoAlpha:1,y:0,duration:.85,ease:'power3.out',
       delay:.1,clearProps:'opacity,visibility,transform'});
    });

    // Individual ScrollTriggers avoid layout shifts and never pin/scrub pages.
    const selector=[
     '.jojo-tropical-story .jojo-tropical-content',
     '.jojo-tropical-feature .jojo-tropical-feature-copy',
     '.jojo-picks-heading','.jojo-pick',
     '.jojo-gather-image','.jojo-gather-copy',
     '.jojo-community-top','.jojo-community-photos a',
     '.jojo-last-call',
     '.jojo-photo-story-heading','.jojo-editorial-gallery-photo',
     '.jojo-story-intro-heading','.jojo-story-intro-copy',
     '.jojo-story-values > div',
     '.catalog-featured-text','.catalog-featured-images figure',
     '.catalog-body-head',
     '.jojo-directory-heading','.jojo-outlet-card',
     '.jojo-order-header','.jojo-service',
     '.jojo-contact-heading','.jojo-contact-grid > a',
     '.how-order-head','.how-order-step','.how-order-help > div'
    ].join(',');
    root.querySelectorAll<HTMLElement>(selector).forEach((node,index)=>{
     const top=node.getBoundingClientRect().top;
     const settings={
      autoAlpha:1,
      y:0,
      duration,
      ease:'power2.out',
      delay:top<window.innerHeight*.86?Math.min(index%4,3)*.075:0,
      clearProps:'opacity,visibility,transform'
     };
     if(top<window.innerHeight*.86){
      gsap.fromTo(node,{autoAlpha:0,y:distance},settings);
     }else{
      gsap.fromTo(node,{autoAlpha:0,y:distance},{
       ...settings,
       scrollTrigger:{trigger:node,start:'top 92%',once:true}
      });
     }
    });

    // Full-width video sections softly fade in without moving or scaling
    // the playing <video>, protecting the approved 16:9 layout and loop.
    root.querySelectorAll<HTMLElement>('.jojo-full-bleed-film').forEach(film=>{
     gsap.fromTo(film,{opacity:.7},{opacity:1,duration:.95,ease:'power1.out',
      scrollTrigger:{trigger:film,start:'top 90%',once:true},
      clearProps:'opacity'});
    });
   });
  },root);

  return()=>{media.revert();context.revert()};
 },[]);
 return null;
}
