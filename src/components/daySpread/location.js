import React, {Component} from 'react';
import { ItemTypes } from '../utils/itemTypes.js';
import { DragSource } from 'react-dnd';
import PropTypes from 'prop-types';
import Background from '../../assets/barPlaceHolder.jpg'
import LocationInfo from './location-info.js';

import './blockSpread.css';

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

class Location extends Component {
  render() {
    //DUMMY PROPS FOR DESIGN
    const isExpanded = true;
    const isSelected = this.props.selected; // dummy boolean, for telling the component to display extra stuff or not
    //END DUMMY PROPS
    //dnd
    const { connectDragSource, isDragging } = this.props;

    const rating = this.props.info.ratingCount === 0 ? 0 : this.props.info.ratingScore / this.props.info.ratingCount;

    const apiTags = ['Family Friendly', 'Crowd Friendly', 'No Pets'];

    const placeTags = apiTags.map((tag,index) => {
      return (<li key={index}>{tag}</li>)
    });

    const expandedContent = isExpanded
      ? <LocationInfo
          rating={rating}
          info={this.props.info}
          blockId={this.props.blockId}
          selected={isSelected}
          placeTags={placeTags}
          cards={this.props.cards}
          />
      : undefined;

    // const placeTags = this
    //   .props
    //   .info
    //   .tags
    //   .map((tag, index) => {
    //     return (
    //       <li key={index}>{tag}</li>
    //     )
    //   })

    let divClassName = 'location';

    divClassName += isSelected ? ' card-selected' : '';

    return connectDragSource(
      <div className={divClassName} 
        style={{
          opacity: isDragging ? 0.2 : 1,
          cursor:'move'
      }}>
        {expandedContent}
        <img src={Background} alt={this.props.info.name}/>
      </div>
    );
  }
}
Location.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
}

export default DragSource(ItemTypes.CARD, cardSource, collect)(Location);
