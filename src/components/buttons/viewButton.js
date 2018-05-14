import React from 'react'



export default function ViewButton(props){
  const defaultButtonStyle=Object.assign({}, {
      backgroundColor:props.color === 'tomato' ? 'tomato' :'rgb(94,124,253)',
      color:'white',
      boxShadow:'0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
      width:'100px',
      height:'30px',
      float:'right',
      // marginTop:'8px'
  }, props.style);
  return(
    <button style={defaultButtonStyle} onClick={props.buttonFunction}>
      {props.buttonText}
    </button>
  )
}
