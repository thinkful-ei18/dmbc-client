import React, { Component } from 'react';
import Background from '../../assets/barPlaceHolder.jpg'

class ExpandedContent extends Component{

  render(){
    return(
      <div>
        <div className='cardBody'>
          <span className='blurbHeader'>Details</span>
          <span className='cardBlurb'>
            {this.props.info.description}
            {this.props.info.address}
          </span>
        </div>
        <div className='cardControls'>
          <button className='confirm-location'>Lock in</button>
        </div>
      </div>
    )
  }
}

class Card extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    //DUMMY PROPS FOR DESIGN
    const isExpanded = true  // dummy boolean, for telling the component to display extra stuff or not
    //END DUMMY PROPS
    const expandedContent =  isExpanded ? <ExpandedContent info={this.props.info}/> : undefined;
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
