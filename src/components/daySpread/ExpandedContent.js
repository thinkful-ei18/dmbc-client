import React, {Component} from 'react';
import {selectCardOnBlock} from '../../actions/block';

import { connect } from 'react-redux';


export class ExpandedContent extends Component {
  lockIn() {
    this
      .props
      .dispatch(selectCardOnBlock({cardID: this.props.info.id, blockID: this.props.blockId}));
  }

  render() {
    let select;
    if (this.props.selected) {
      select = (
        <div className='cardControls'>
          <button onClick={() => this.lockIn()} className='confirm-location'>I want choices</button>
        </div>
      )
    } else {
      select = (
        <div className='cardControls'>
          <button onClick={() => this.lockIn()} className='confirm-location'>Lock in</button>
        </div>
      )
    }

    return (
      <div>
        <div className='cardBody'>
          <span className='blurbHeader'>Details</span>
          <span className='cardBlurb'>
            {this.props.info.description}
            {this.props.info.address}
          </span>
        </div>
        {select}
      </div>
    )
  }
}


const mapStateToProps = state => ({});

export default connect(mapStateToProps)(ExpandedContent);