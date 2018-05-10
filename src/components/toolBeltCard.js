import React, {Component} from 'react';
import { ItemTypes } from './utils/itemTypes.js';
import { DragSource } from 'react-dnd';
import PropTypes from 'prop-types';

import {Link} from 'react-router-dom';

const cardSource = {
  beginDrag(props){
    return{
      cardId:props.card.id
    };
  }
}
function collect(connect, monitor){
  return{
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class ToolbeltCard extends Component {

  render(){
    const { connectDragSource, isDragging } = this.props
    return connectDragSource(
        <div className='card-container-expanded' key={this.props.index}
          style={{'opacity': isDragging ? 0.2:1}}
          >
          <div className='card-header' style={{'backgroundImage':`url(${this.props.Background})`}}>
            <span className='place-name'>{this.props.card.name}</span>
          </div>
          <div className='placeTags'>
            <ul>
              {this.props.placeTags}
            </ul>
          </div>
          <div>
          <div className='card-body'>
            <span className='blurb-header'>Details</span>
            <span className='card-blurb'>
              {this.props.card.description}
            </span>
          </div>
          <div className='cardControls'>
            {/* {this.addSelectorToCard(card.id)} */}
            <Link to={`/cards/${this.props.card.id}`}>Edit Card</Link>
            <button className='confirm-location'>Lock in</button>
          </div>
          </div>
        </div>
    )
  }
}

ToolbeltCard.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
}

export default DragSource(ItemTypes.CARD, cardSource, collect)(ToolbeltCard);
