import {useEffect} from 'react';
import './motion.css';

/**
 * Progressive enhancement: sections are readable before JS and under reduced motion.
 * Only observed sections animate; dynamic menu filter results are registered as they appear.
 */
export default function SiteMotion(){
 useEffect(()=>{
  if(typeof window==='undefined'||!('IntersectionObserver' in window)||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const root=document.querySelector<HTMLElement>('#main-content');
  if(!root)return;
  const selector=[
   '.story-split > div','.story-split > figure',
   '.visual-split > div','.visual-split > img',
   '.products > h2','.products > .center-copy','.product-grid article',
   '.community > div','.community > img','.closing > *',
   '.centered > *:not(.banner)', '.catalog-featured-text',
   '.catalog-featured-images figure','.catalog-body-head',
   '.catalog-toolbar','.catalog-group','.catalog-note',
   '.catalog-footer-cta','.catalog-empty'
  ].join(',');
  const seen=new WeakSet<Element>();
  const observer=new IntersectionObserver(entries=>{
   for(const entry of entries){
    if(!entry.isIntersecting)continue;
    entry.target.classList.add('motion-visible');
    observer.unobserve(entry.target);
   }
  },{threshold:0.08,rootMargin:'0px 0px -28px 0px'});
  const register=()=>{
   root.querySelectorAll<HTMLElement>(selector).forEach(node=>{
    if(seen.has(node))return;
    seen.add(node);
    if(node.getBoundingClientRect().top<window.innerHeight*0.94){
     node.classList.add('motion-visible');
     return;
    }
    node.classList.add('motion-pending');
    observer.observe(node);
   });
  };
  register();
  const changes=new MutationObserver(mutations=>{
   if(mutations.some(mutation=>mutation.type==='childList'))register();
  });
  changes.observe(root,{childList:true,subtree:true});
  return()=>{changes.disconnect();observer.disconnect();root.querySelectorAll('.motion-pending').forEach(el=>el.classList.remove('motion-pending'))};
 },[]);
 return null;
}
