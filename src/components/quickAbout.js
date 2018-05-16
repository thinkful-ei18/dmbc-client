import React from 'react'
import '../styles/quickAbout.css'

export default function QuickAbout(props){
  return(
    <div>
      <div className="quick-about">
        <div className="info-card">
          <i className="fas fa-paper-plane"></i>
          <p>Request options for Lunch on Tuesday, drinks on Wednesday, and a massage on Friday. Whatever you want to do, wherever you want to go, we can help.</p>
        </div>
        <div className="info-card">
          <i className="fas fa-user"></i>
          <p>Your Ambassador will provide you with three expertly curated options for each request so you can travel like a pro. </p>
        </div>
        <div className="info-card">
          <i className="fas fa-map-pin"></i>
          <p>Selct the option you like best and enjoy!</p>
        </div>
      </div>
    </div>
  )
}
