import {useEffect} from 'react';
import './motion.css';

/** Motion is a progressive enhancement: content is never hidden waiting for JS. */
export default function SiteMotion(){
 useEffect(()=>{
  const root=document.querySelector<HTMLElement>('#main-content');
  if(!root||!('IntersectionObserver' in window))return;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  if(reduced.matches)return;

  const selector=[
   '.story-split > div','.story-split > figure',
   '.visual-split > div','.visual-split > img',
   '.products > h2','.products > .center-copy','.product-grid article',
   '.community > div','.community > img','.closing > *',
   '.centered > *','.catalog-featured-text',
   '.catalog-featured-images figure','.catalog-body-head',
   '.catalog-toolbar','.catalog-group','.catalog-note',
   '.catalog-footer-cta','.catalog-empty'
  ].join(',');
  const seen=new WeakSet<Element>();
  const observer=new IntersectionObserver(entries=>{
   for(const entry of entries){
    if(!entry.isIntersecting)continue;
    observer.unobserve(entry.target);
    entry.target.classList.add('motion-visible');
   }
  },{threshold:0,rootMargin:'0px 0px -35px 0px'});

  const register=()=>{
   root.querySelectorAll<HTMLElement>(selector).forEach(node=>{
    if(seen.has(node))return;
    seen.add(node);
    if(node.getBoundingClientRect().top<window.innerHeight-35){
     // Above the fold stays visible without an unnecessary entrance.
     return;
    }
    observer.observe(node);
   });
  };
  register();

  // Filtered catalogue sections are replaced by React; register those new nodes.
  const mutations=new MutationObserver(changes=>{
   if(changes.some(change=>change.type==='childList'))register();
  });
  mutations.observe(root,{childList:true,subtree:true});
  const onPreference=()=>{if(reduced.matches){observer.disconnect();mutations.disconnect()}};
  reduced.addEventListener('change',onPreference);
  return()=>{
   reduced.removeEventListener('change',onPreference);
   mutations.disconnect();
   observer.disconnect();
  };
 },[]);
 return null;
}
