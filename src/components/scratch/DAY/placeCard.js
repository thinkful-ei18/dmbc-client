import React, {Component} from 'react';

class ExpandedContent extends Component{
  render(){
    return(
      <div>
        <div className='cardBody'>
          <span className='blurbHeader'>Details</span>
          <span className='cardBlurb'>
            E anim illum ut occaecat. Ubi quo tamen nulla cillum, singulis graviterque iis
            iudicem, fabulas duis quid ingeniis nisi, quem doctrina nam cernantur ubi
            ingeniis esse nisi ingeniis nisi, ita ipsum possumus fidelissimae hic dolore
            litteris tractavissent.
          </span>
        </div>
        <div className='cardControls'>
          <button className='confirm-location'>Lock in</button>
        </div>
      </div>
    )
  }
}

class PlaceCard extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    //DUMMY PROPS FOR DESIGN
    const isExpanded = this.props.isExpanded  // dummy boolean, for telling the component to display extra stuff or not
    const apiTags = ['Family Friendly', 'Crowd Friendly', 'No Pets'];
    //END DUMMY PROPS
    const expandedContent =  isExpanded ? <ExpandedContent /> : undefined;
    const placeTags = apiTags.map((tag,index) => {
      return (<li key={index}>{tag}</li>)
    })

    return (
      <div className={isExpanded ? 'cardContainer-expanded' : 'cardContainer-minimized'}>
        <div
          className='cardHeader'
          style={{'backgroundImage':`url(${Background})`}}
        >
          <span className='placeName'>Foo's bar</span>
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
