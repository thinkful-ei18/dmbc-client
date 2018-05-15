import React, {Component} from 'react';
import Background from '../../assets/barPlaceHolder.jpg'
import LocationInfo from './location-info.js';

import './blockSpread.css';


export default class Location extends Component {
  render() {
    //DUMMY PROPS FOR DESIGN
    const isExpanded = true;
    const isSelected = this.props.selected; // dummy boolean, for telling the component to display extra stuff or not
    //END DUMMY PROPS
    //dnd


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

    return (
      <div className={divClassName}>
        {expandedContent}
        <img src={Background} alt={this.props.info.name}/>
      </div>
    );
  }
}
