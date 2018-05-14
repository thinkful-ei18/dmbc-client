import React from 'react'
import '../../styles/viewButton.css'

const disabledButtonStyle = {
  opacity:.2,
  cursor:'default'
}

export default function ViewButton(props){
<<<<<<< HEAD
  const defaultButtonStyle=Object.assign({}, {
      backgroundColor:props.color === 'tomato' ? 'tomato' :'rgb(94,124,253)',
      color:'white',
      boxShadow:'0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
      width:'100px',
      height:'30px',
      float:'right',
      // marginTop:'8px'
  }, props.style);
=======
const disabledStyle = props.disabled ? disabledButtonStyle : {}
console.log('from view button',disabledStyle);
>>>>>>> button disabled on trip form looks unclickable when dates are wrong
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
