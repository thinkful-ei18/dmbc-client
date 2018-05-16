import React from 'react'
import '../../styles/viewButton.css'

const disabledButtonStyle = {
  opacity:.2,
  cursor:'default'
}

export default function ViewButton(props){
const disabledStyle = props.disabled ? disabledButtonStyle : {}
  return(
    <button
      className={`view-button ${props.buttonClass||''}`}
      style={{...props.overrideStyle, ...disabledStyle}}
      onClick={props.buttonFunction}
      disabled={props.disabled}
    >
      {props.buttonText}
    </button>
  )
}
