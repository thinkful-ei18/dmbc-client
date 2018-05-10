import React, { Component } from 'react';

//dnd
import { DropTarget } from 'react-dnd';
import { ItemTypes } from '../utils/itemTypes';
import Card from './Card';
//styles
import '../../styles/oneDayView.css'

const blockTarget = {
  drop(props,monitor,component){
    component.handleCardDroppedOnBlock(props.block.id,monitor.getItem().cardId)
    return{};
  }
}
function collect(connect, monitor){
  return{
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
}

class BlockSpread extends Component{
  handleCardDroppedOnBlock(blockId,cardId){
    return this.props.handleCardDrop({blockID:blockId, cardID:cardId})
  }
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

    let cards = this.createCards();
    const { connectDropTarget, isOver} = this.props;
    return connectDropTarget(
        <li key={this.props.key}
          style={{
            'backgroundColor': isOver ? 'yellow' : 'grey'
          }}>
          <div className="block-spread">
            <h1>{this.props.block.title}</h1>
            {cards}
          </div>
        </li>
    )
  }
}

export default DropTarget(ItemTypes.CARD, blockTarget, collect)(BlockSpread)
