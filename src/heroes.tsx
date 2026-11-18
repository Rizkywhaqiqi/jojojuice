import {ArrowDown} from 'lucide-react';
import {BRANDS} from './brands';
type Brand=typeof BRANDS[number];
type Story={headline:string;accent:string;intro:string};
function Photo({b,className=''}:{b:Brand;className?:string}){return <img className={className} src={`/brands/${b.photo}.jpg`} alt={b.alt} width={b.width} height={b.height} fetchPriority="high" decoding="async"/>}
export default function BrandHero({b,story}:{b:Brand;story:Story}){
 return <section className="tropic-hero"><div className="tropic-orb orb-one" aria-hidden="true"/><div className="tropic-orb orb-two" aria-hidden="true"/><div className="tropic-heading"><p className="bp-kicker">JOJO JUICE · FEEL FRESH, LIVE FUN</p><h1>Sedikit segar.<br/><em>Banyak serunya.</em></h1><p>{story.intro}</p><a className="bp-button" href="#rasa">Temukan rasa segarmu <ArrowDown size={18}/></a></div><figure className="tropic-photo"><Photo b={b}/><figcaption>Good days start<br/><em>with JOJO.</em></figcaption></figure><span className="tropic-note" aria-hidden="true">FRESH DAYS<br/>FUN MOMENTS</span></section>;
}
