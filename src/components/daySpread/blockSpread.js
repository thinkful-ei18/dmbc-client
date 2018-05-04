import React, { Component } from 'react';
//react components
import Card from './Card';

//styles
import '../../styles/oneDayView.css'
export default class BlockSpread extends Component{

  render(){
    return(

        <div className="block-spread">
          <h1>{this.props.blockName}</h1>
          <Card />
          <Card />
          <Card />
        </div>
    )
  }

}
