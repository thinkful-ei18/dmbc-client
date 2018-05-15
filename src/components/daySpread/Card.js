import React, {Component} from 'react';
import Background from '../../assets/bar-large.jpg'
import ExpandedContent from './ExpandedContent';






export default class Card extends Component {
  render() {
    //DUMMY PROPS FOR DESIGN
    const isExpanded = true
    const isSelected = this.props.selected; // dummy boolean, for telling the component to display extra stuff or not
    //END DUMMY PROPS
    //dnd

    const rating = this.props.info.ratingCount === 0 ? 0 : this.props.info.ratingScore / this.props.info.ratingCount;

    const expandedContent = isExpanded
      ? <ExpandedContent
          rating={rating}
          info={this.props.info}
          blockId={this.props.blockId}
          selected={isSelected}/>
      : undefined;

    const apiTags = ['Family Friendly', 'Crowd Friendly', 'No Pets'];

    const placeTags = apiTags.map((tag,index) => {
      return (<li key={index}>{tag}</li>)
    });

    // const placeTags = this
    //   .props
    //   .info
    //   .tags
    //   .map((tag, index) => {
    //     return (
    //       <li key={index}>{tag}</li>
    //     )
    //   })

    let divClassName = isExpanded
      ? 'card-container-expanded'
      : 'card-container-minimized';

    divClassName += isSelected ? ' card-selected' : '';


    return(
      <div className={divClassName}
        style={{
          fontSize:25,
          fontWeight:'bold'
        }}>
          <div className='card-header' style={{'backgroundImage':`url(${Background})`}}>
            <div className="card-title">
              <p className='place-name'>{this.props.info.name}</p>
              <p className='card-blurb'>{this.props.info.address}</p>            </div>
          </div>
          <div className='place-tags'>
            <ul>
              {placeTags}
            </ul>
          </div>
          <div>
            <div className='card-body'>
              {expandedContent}
            </div>
          </div>
        </div>


    );
  }
}
