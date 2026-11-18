import React from 'react';
import {createRoot} from 'react-dom/client';
import BrandProfile from './profile';
import './styles.css';
createRoot(document.getElementById('root')!).render(<React.StrictMode><BrandProfile slug="jojo-juice"/></React.StrictMode>);
