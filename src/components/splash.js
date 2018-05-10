import React from 'react';
import Logo from './logo'
import SplashImage from '../assets/Ludwig-Favre-California-22.jpg'
import '../styles/splash.css';

export default function Splash(props) {
  return (
    <div className="splash">
      <img src={SplashImage} alt=""/>
      <Logo/>
      <h1>We make the choices that you can't</h1>
      <p>Our application pairs you with an ambassador for your trip so that you can
        receive trusted local suggestions for your trip only for the times you need.</p>
    </div>
  )
}