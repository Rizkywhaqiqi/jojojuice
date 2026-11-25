import {useEffect,useRef} from 'react';

// A shared scheduler ensures just one eligible JOJO video plays at once.
const candidates=new Map<HTMLVideoElement,number>();
let active:HTMLVideoElement|null=null;

function reconcile(){
 const canPlay=!document.hidden&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 let best:HTMLVideoElement|null=null;
 let ratio=.24;
 if(canPlay)for(const [video,visible] of candidates){
  if(visible>ratio){best=video;ratio=visible}
 }
 if(active&&active!==best)active.pause();
 active=best;
 for(const video of candidates.keys()){
  if(video!==best){video.pause();continue}
  if(video.paused)video.play().catch(()=>{/* Poster remains when autoplay is blocked */});
 }
}

export function useCoordinatedVideo(){
 const ref=useRef<HTMLVideoElement>(null);
 useEffect(()=>{
  const video=ref.current;
  if(!video)return;
  candidates.set(video,0);
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  const observer=typeof IntersectionObserver==='undefined'?null:new IntersectionObserver(([entry])=>{
   candidates.set(video,entry.intersectionRatio);
   reconcile();
  },{threshold:[0,.25,.4,.6,.8,1]});
  if(observer)observer.observe(video);
  else candidates.set(video,1);
  reduced.addEventListener('change',reconcile);
  document.addEventListener('visibilitychange',reconcile);
  reconcile();
  return()=>{
   observer?.disconnect();
   reduced.removeEventListener('change',reconcile);
   document.removeEventListener('visibilitychange',reconcile);
   video.pause();
   candidates.delete(video);
   if(active===video)active=null;
   reconcile();
  };
 },[]);
 return ref;
}
