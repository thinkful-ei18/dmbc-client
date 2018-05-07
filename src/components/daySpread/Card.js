import React, { Component } from 'react';
import Background from '../../assets/barPlaceHolder.jpg'
import ExpandedContent from './ExpandedContent';

class Card extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    //DUMMY PROPS FOR DESIGN
    const isExpanded = true  // dummy boolean, for telling the component to display extra stuff or not
    //END DUMMY PROPS
    const expandedContent =  isExpanded ? <ExpandedContent info={this.props.info} blockId={this.props.blockId}/> : undefined;
    const placeTags = this.props.info.tags.map((tag,index) => {
      return (<li key={index}>{tag}</li>)
    })

    return (
      <div className={isExpanded ? 'cardContainer-expanded' : 'cardContainer-minimized'}>
        <div
          className='cardHeader'
          style={{'backgroundImage':`url(${Background})`}}
        >
          <span className='placeName'>{this.props.info.name}</span>
        </div>
        <div className='placeTags'>
          <ul>
          {placeTags}
          </ul>
        </div>
        <div>
        {expandedContent}
        </div>
      </div>
    );
  }
}

export default Card;
