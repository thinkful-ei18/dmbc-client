import React from 'react'
import '../../styles/viewButton.css'

const disabledButtonStyle = {
  opacity:.2,
  cursor:'default'
}

export default function ViewButton(props){
const disabledStyle = props.disabled ? disabledButtonStyle : {}
console.log('from view button',disabledStyle);
  return(
    <button
      className="view-button"
      style={{...props.overrideStyle, ...disabledStyle}}
      onClick={props.buttonFunction}
      disabled={props.disabled}
    >
      {props.buttonText}
    </button>
  )
}
