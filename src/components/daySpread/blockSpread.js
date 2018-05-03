import React, { Component } from 'react';
//react components
import Card from './Card';

//styles
import '../../styles/daySpreads.css'
export default class BlockSpread extends Component{

  render(){
    return(
        
        <div className="block-spread">
          <Card />
          <Card />
          <Card />
        </div>
    )
  }

}
