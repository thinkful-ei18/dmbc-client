import React from 'react'
import '../styles/quickAbout.css'

export default function QuickAbout(props){
  return(
    <div>
      <div className="quick-about">
        <div className="info-card">
          <i className="fas fa-paper-plane"></i>
          <p>Trip Details get sent to your ambassador</p>
        </div>
        <div className="info-card">
          <i className="fas fa-user"></i>
          <p>Your Ambassador suggests places that fit your criterion</p>
        </div>
        <div className="info-card">
          <i className="fas fa-map-pin"></i>
          <p>Lorem Ipsum lerm abost dolrl florot alelsg</p>
        </div>
      </div>
    </div>
  )
}
