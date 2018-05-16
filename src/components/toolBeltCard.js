import React, {Component} from 'react';
import {connect} from 'react-redux';
import { ItemTypes } from './utils/itemTypes.js';
import { DragSource } from 'react-dnd';
import PropTypes from 'prop-types';

import { setToolbeltDisplay } from '../actions/dashboard';
import CardButton from './buttons/cardButton';
import { putCardOnBlock } from '../actions/block.js';

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
  constructor(props) {
    super(props);
    this.state = { 
      width: 0, 
      height: 0 
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }
  
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  selectBlocks() {
    let options = [];
    for (let i = 0; i < this.props.blocks.length; i++) {
      options[i] = <option value={this.props.blocks[i].id} key={i}>{this.props.blocks[i].title}</option>
    }
    this.selectVal = this.props.blocks[0].id;
    const selector = (
      <form
        onSubmit={e => {
        e.preventDefault();
        const ids = {
          cardID: this.props.card.id,
          blockID: this.selectVal
        }
        this.props.dispatch(putCardOnBlock(ids))
      }}>
        <label>Block</label>
        <select onChange={(input) => this.selectVal = input.target.value}>
          {options}
        </select>
        <CardButton buttonText={'Add'} />
      </form>
    )
    return selector;
  }

  render(){
    let select = (this.state.width <= 600 ? this.selectBlocks() : '');
    const { connectDragSource, isDragging } = this.props
    return connectDragSource(
        <div className='card-container-expanded' key={this.props.index}
          style={{'opacity': isDragging ? 0.2:1}}
          >
          <div className='card-header' style={{'backgroundImage':`url(${this.props.card.image})`}}>
            <div className="card-title">
              <p className='place-name'>{this.props.card.name}</p>
              <p className='card-blurb'>{this.props.card.address}</p>
            </div>
          </div>
          <div className='place-tags'>
            <ul>
              {this.props.placeTags}
            </ul>
          </div>
          <div>
            <div className='card-body'>
              <span className='blurb-header'>Details</span>
              <span className='card-blurb'>{this.props.card.description}</span>
            </div>
            <div className='card-controls'>
              {/* {this.addSelectorToCard(this.props.card.id)} */}
              {select}
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
