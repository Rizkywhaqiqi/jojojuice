import {useEffect,useRef} from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type {Outlet} from './content';
const icon=L.divIcon({className:'jojo-map-pin',html:'<span aria-hidden="true">J</span>',iconSize:[36,44],iconAnchor:[18,44]});
type Props={outlets:Outlet[];selected?:string;onSelect?:(id:string)=>void;onPick?:(lat:number,lng:number)=>void};
export default function OutletMap({outlets,selected,onSelect,onPick}:Props){const el=useRef<HTMLDivElement>(null);const map=useRef<L.Map|null>(null);const markers=useRef<L.LayerGroup|null>(null);const callbacks=useRef({onSelect,onPick});callbacks.current={onSelect,onPick};
useEffect(()=>{if(!el.current)return;const m=L.map(el.current,{scrollWheelZoom:false}).setView([-1.8,116],4);map.current=m;L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',maxZoom:19}).addTo(m);markers.current=L.layerGroup().addTo(m);m.on('click',e=>callbacks.current.onPick?.(e.latlng.lat,e.latlng.lng));const ro=new ResizeObserver(()=>m.invalidateSize());ro.observe(el.current);return()=>{ro.disconnect();m.remove();map.current=null;markers.current=null}},[]);
useEffect(()=>{const m=map.current,g=markers.current;if(!m||!g)return;g.clearLayers();for(const o of outlets){const tip=document.createElement('span');tip.textContent=o.name;L.marker([o.lat,o.lng],{icon,keyboard:true,title:o.name}).bindTooltip(tip).on('click',()=>callbacks.current.onSelect?.(o.id)).addTo(g)}const chosen=outlets.find(o=>o.id===selected);if(chosen)m.setView([chosen.lat,chosen.lng],14,{animate:false});else if(outlets.length)m.fitBounds(L.latLngBounds(outlets.map(o=>[o.lat,o.lng] as [number,number])),{padding:[40,40],maxZoom:14,animate:false});},[outlets,selected]);
return <div className="jojo-map" ref={el} role="region" aria-label={onPick?'Pilih titik outlet pada peta. Koordinat juga bisa diisi melalui formulir.':'Peta lokasi outlet JOJO Juice'}/>}
