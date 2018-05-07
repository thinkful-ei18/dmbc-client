import React, {Component} from 'react';
import Background from '../../assets/barPlaceHolder.jpg'
import ExpandedContent from './ExpandedContent';

class Card extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    //DUMMY PROPS FOR DESIGN
    const isExpanded = true
    const isSelected = this.props.selected; // dummy boolean, for telling the component to display extra stuff or not
    //END DUMMY PROPS

    const expandedContent = isExpanded
      ? <ExpandedContent
          info={this.props.info}
          blockId={this.props.blockId}
          selected={isSelected}/>
      : undefined;
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
      ? 'cardContainer-expanded'
      : 'cardContainer-minimized';

    divClassName += isSelected ? ' card-selected' : '';


    return (
      <div className={divClassName}>
        <div
          className='cardHeader'
          style={{
          'backgroundImage': `url(${Background})`
        }}>
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
