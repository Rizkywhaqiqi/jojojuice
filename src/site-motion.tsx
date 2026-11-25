import {useEffect} from 'react';
import './motion.css';

/**
 * Motion is progressive enhancement: content remains visible even before JS runs.
 * A live preference switch can stop or restart observers without reloading the page.
 */
export default function SiteMotion(){
 useEffect(()=>{
  const root=document.querySelector<HTMLElement>('#main-content');
  if(!root||!('IntersectionObserver' in window))return;

  const preference=window.matchMedia('(prefers-reduced-motion: reduce)');
  const selector=[
   '.story-split > div','.story-split > figure',
   '.visual-split > div','.visual-split > img',
   '.products > h2','.products > .center-copy','.product-grid article',
   '.community > div','.community > img','.closing > *',
   '.centered > *','.catalog-featured-text',
   '.catalog-featured-images figure','.catalog-body-head',
   '.catalog-controls','.catalog-result-line','.catalog-group','.catalog-note',
   '.catalog-footer-cta','.catalog-empty',
   '.jojo-directory-heading','.jojo-outlet-card',
   '.jojo-order-header','.jojo-service',
   '.jojo-contact-heading','.jojo-contact-grid > a',
   '.how-order-head','.how-order-step','.how-order-help > div'
  ].join(',');

  let observer:IntersectionObserver|null=null;
  let mutations:MutationObserver|null=null;
  let seen=new WeakSet<Element>();

  const stop=()=>{
   observer?.disconnect();
   mutations?.disconnect();
   observer=null;
   mutations=null;
  };

  const start=()=>{
   if(preference.matches||observer)return;
   // Fresh registrations are required after an observer was disconnected.
   seen=new WeakSet<Element>();
   const entrance=new IntersectionObserver(entries=>{
    for(const entry of entries){
     if(!entry.isIntersecting)continue;
     entrance.unobserve(entry.target);
     entry.target.classList.add('motion-visible');
    }
   },{threshold:0,rootMargin:'0px 0px -35px 0px'});
   observer=entrance;

   const register=()=>{
    root.querySelectorAll<HTMLElement>(selector).forEach(node=>{
     if(seen.has(node))return;
     seen.add(node);
     // Keep anything already above the fold visible; do not animate late.
     if(node.getBoundingClientRect().top<window.innerHeight-35)return;
     entrance.observe(node);
    });
   };
   register();
   const watcher=new MutationObserver(changes=>{
    if(changes.some(change=>change.type==='childList'))register();
   });
   watcher.observe(root,{childList:true,subtree:true});
   mutations=watcher;
  };

  const onPreference=()=>{
   if(preference.matches)stop();
   else start();
  };
  preference.addEventListener('change',onPreference);
  onPreference();
  return()=>{
   preference.removeEventListener('change',onPreference);
   stop();
  };
 },[]);
 return null;
}
