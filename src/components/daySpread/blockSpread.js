import React, { Component } from 'react';
//react components
import Card from './Card';

//styles
import '../../styles/oneDayView.css'
export default class BlockSpread extends Component{

  createCards() {
    let cards = [];
    for (let i = 0; i < 3; i++) {
      if (this.props.block.cards[i] === undefined) {
        break;
      }
      cards.push(<Card info={this.props.block.cards[i]} key={`${this.props.block.id}_${i}`} blockId={this.props.block.id}/>)
    }
    return cards;
  }

  render(){
    let cards = this.createCards();
    return(
        
        <div className="block-spread">
          <h1>{this.props.block.title}</h1>
          {cards}
        </div>
    )
  }

}
