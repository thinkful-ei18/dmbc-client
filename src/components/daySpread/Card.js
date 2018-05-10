import React, {Component} from 'react';
import { ItemTypes } from '../utils/itemTypes.js';
import { DragSource } from 'react-dnd';
import PropTypes from 'prop-types';
import Background from '../../assets/barPlaceHolder.jpg'
import ExpandedContent from './ExpandedContent';


const cardSource = {
  beginDrag(props){
    return{};
  }
}

function collect(connect,monitor){
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class Card extends Component {
  render() {
    //DUMMY PROPS FOR DESIGN
    const isExpanded = true
    const isSelected = this.props.selected; // dummy boolean, for telling the component to display extra stuff or not
    //END DUMMY PROPS
    //dnd
    const { connectDragSource, isDragging } = this.props;

    const expandedContent = isExpanded
      ? <ExpandedContent
          info={this.props.info}
          blockId={this.props.blockId}
          selected={isSelected}/>
      : undefined;

    // console.log(this.props)

    const rating = this.props.info.ratingCount === 0 ? 0 : this.props.info.ratingScore / this.props.info.ratingCount;

    const placeTags = this
      .props
      .info
      .tags
      .map((tag, index) => {
        return (
          <li key={index}>{tag}</li>
        )
      })

    let divClassName = isExpanded
      ? 'card-container-expanded'
      : 'cardContainer-minimized';

    divClassName += isSelected ? ' card-selected' : '';


    return connectDragSource(
      <div className={divClassName}
        style={{
          opacity: isDragging ? 0.2 : 1,
          fontSize:25,
          fontWeight:'bold',
          cursor:'move'
        }}
        >
        <div
          className='card-header'
          style={{
          'backgroundImage': `url(${Background})`
        }}>
          <span className='place-name'>{this.props.info.name}</span>
        </div>
        <div className='placeTags'>
          <ul>
            {placeTags}
          </ul>
        </div>
        <div>
          {rating}
          {expandedContent}
        </div>
      </div>
    );
  }
}
Card.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
}

export default DragSource(ItemTypes.CARD, cardSource, collect)(Card);
