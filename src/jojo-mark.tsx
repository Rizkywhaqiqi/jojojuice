import type {ReactNode} from 'react';
import './jojo-mark.css';

/** Official JOJO logomark in visible brand mentions; text alternative remains accessible. */
export function JojoMark({size='inline'}:{size?:'inline'|'heading'|'footer'}){
 return <span className={`jojo-mark jojo-mark--${size}`} role="img" aria-label="JOJO"><img src="/brands/jojo-logo.svg" alt="" aria-hidden="true" loading="lazy"/></span>;
}

/** Replace brand-name words in dynamic copy without changing URLs, metadata or API data. */
export function LogoText({children}:{children:string}):ReactNode{
 return children.split(/\bJOJO\b/gi).flatMap((piece,index)=>index===0?[piece]:[<JojoMark key={index}/>,piece]);
}
