import React, { Component } from 'react';
//react components
import Card from './Card';
//dnd
import { DragSource } from 'react-dnd';
import PropTypes from 'prop-types';
import { ItemTypes } from '../utils/itemTypes';
//styles
import '../../styles/oneDayView.css'

const blockSource = {
  beginDrag(props){
    console.log('dragging',props.id);
    return{
      // id:props.id
    };
  }
}

function collect(connect, monitor){
  return{
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class BlockSpread extends Component{
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

    // console.log('Here is the block', this.props.block)
    let cards = this.createCards();
    const { connectDragSource, isDragging} = this.props;
    console.log(this.props.block,'woow');
    return connectDragSource(
        <li key={this.props.key}
          style={{
            opacity: isDragging ? 0.2 : 1,
            fontSize:25,
            fontWeight:'bold',
            cursor:'move'
        }}>
          <div className="block-spread">
            <h1>{this.props.block.title}</h1>
            {cards}
          </div>
        </li>
    )
  }
}

BlockSpread.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
}

export default DragSource(ItemTypes.BLOCK, blockSource, collect)(BlockSpread)
