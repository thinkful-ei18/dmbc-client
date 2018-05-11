import React, {Component} from 'react';
import {connect} from 'react-redux';
import { ItemTypes } from './utils/itemTypes.js';
import { DragSource } from 'react-dnd';
import PropTypes from 'prop-types';

import { setToolbeltDisplay } from '../actions/dashboard';

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
        <div className='cardContainer-expanded' key={this.props.index}
          style={{'opacity': isDragging ? 0.2:1}}
          >
          <div className='cardHeader' style={{'backgroundImage':`url(${this.props.Background})`}}>
            <div className="card-title">
              <div className='placeName'>{this.props.card.name}</div>
              <div className='cardBlurb'>{this.props.card.address}</div>
            </div>
          </div>
          <div className='placeTags'>
            <ul>
              {this.props.placeTags}
            </ul>
          </div>
          <div>
            <div className='cardBody'>
              <span className='blurbHeader'>Details</span>
              <span className='cardBlurb'>{this.props.card.description}</span>
            </div>
            <div className='cardControls'>
              {/* {this.addSelectorToCard(card.id)} */}
              <button onClick={event => {
                event.preventDefault();
                this.props.cardId(this.props.card.id);
                this.props.dispatch(setToolbeltDisplay('edit'));
              }}>Edit Card</button>
              {/* <button className='confirm-location'>Lock in</button> */}
            </div>
          </div>
        </div>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.cards.loading,
  error: state.cards.error,
  destination:state.dashboard.currentItinerary.destination
});

const toolBeltCard = connect(mapStateToProps)(ToolbeltCard);

ToolbeltCard.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
}

export default DragSource(ItemTypes.CARD, cardSource, collect)(toolBeltCard);
