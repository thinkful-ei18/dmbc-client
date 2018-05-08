import React, { Component } from 'react';
//react components
import Card from './card';

//styles
import './oneDayView.css'
export default class BlockSpread extends Component{
  createCards() {
    if (this.props.block.selectedCard) {
      const selected = this.props.block.cards.find(card => card.id === this.props.block.selectedCard)
      return <Card info={selected} key={selected} blockId={this.props.block.id} selected={true}/>
    }
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
    console.log('Here is the block', this.props.block)
    let cards = this.createCards();
    return(
        <div className="block-spread">
          <h1>{this.props.block.title}</h1>
          {cards}
        </div>
    )
  }

}
