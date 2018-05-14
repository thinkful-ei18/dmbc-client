import React from 'react'

const defaultButtonStyle={
  backgroundColor:'rgb(94,124,253)',
  color:'white',
  fontSize:'13px'
}
export default function CardButton(props){
  return(
    <button style={defaultButtonStyle} onClick={props.buttonFunction}>
      {props.buttonText}
    </button>

  )
}
