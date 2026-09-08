import React from 'react';
import {Outlet} from 'react-router-dom';
import Header from './site/Header';
import Footer from './site/Footer';
export default function Layout(){return <><Header/><main><Outlet/></main><Footer/></>}
