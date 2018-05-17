import React, { Component } from 'react';
import CardButton from '../buttons/cardButton';
//dnd
import { DropTarget } from 'react-dnd';
import { ItemTypes } from '../utils/itemTypes';
import Location from './location';
//styles
import '../../styles/blockSpread.css';
import '../../styles/oneDayView.css';


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
    let cards = [];
    let cardIds = [];
    for (let i = 0; i < 3; i++) {
      if (this.props.block.cards[i] === undefined) {
        break;
      }
      cardIds.push(this.props.block.cards[i].id);
    }
    if (this.props.block.selectedCard) {
      const selected = this.props.block.cards.find(card => card.id === this.props.block.selectedCard)
      return <Location info={selected} key={selected} blockId={this.props.block.id} selected={true} cards={cardIds}/>
    }
    for (let i = 0; i < 3; i++) {
      if (this.props.block.cards[i] === undefined) {
        break;
      }
      cards.push(<Location info={this.props.block.cards[i]} key={`${this.props.block.id}_${i}`} blockId={this.props.block.id} cards={cardIds}/>)
    }
    if (cards.length === 0) {
      cards = <h4>Waiting for Ambassador to Add Cards</h4>
    }
    return cards;
  }

  render(){
    let deleteBlockButton;
    if (!this.props.ambassador) {
      deleteBlockButton = (
        <span className="delete-block">
          <CardButton
            buttonFunction={() => {
              this.props.deleteBlock(this.props.block.id);
            }}
            buttonText={'Delete Block'}
            overrideStyle={{backgroundColor:'red'}}
          />
        </span>
    )}
    let cards = this.createCards();
    const { connectDropTarget, isOver} = this.props;
    return connectDropTarget(
        <li key={this.props.key}
          style={{
            'backgroundColor': isOver ? 'yellow' : 'grey'
          }}>
          <div className="block-spread">
            <h2>{this.props.block.title}</h2>
            {cards}
            {deleteBlockButton}
          </div>
        </li>
    )
  }
}


export default DropTarget(ItemTypes.CARD, blockTarget, collect)(BlockSpread)
