import {Menu} from 'lucide-react';
import {PUBLIC_PAGES} from './navigation';
export default function BrandMenu({currentPage}:{currentPage:string}){return <details className="bp-mobile-menu" onKeyDown={e=>{if(e.key==='Escape')e.currentTarget.removeAttribute('open')}}><summary aria-label="Menu navigasi JOJO Juice"><Menu size={23}/></summary><nav aria-label="Navigasi mobile">{PUBLIC_PAGES.map(p=><a href={p.path} key={p.path} aria-current={currentPage===p.path?'page':undefined}>{p.label}</a>)}</nav></details>}
