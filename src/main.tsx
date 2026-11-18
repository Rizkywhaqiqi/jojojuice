import React from 'react';
import {createRoot} from 'react-dom/client';
import BrandProfile from './profile';
const Admin=React.lazy(()=>import('./admin'));
import './styles.css';
createRoot(document.getElementById('root')!).render(<React.StrictMode>{location.pathname.startsWith('/admin')?<React.Suspense fallback={<p style={{padding:40}}>Memuat dashboard…</p>}><Admin/></React.Suspense>:<BrandProfile slug="jojo-juice"/>}</React.StrictMode>);
