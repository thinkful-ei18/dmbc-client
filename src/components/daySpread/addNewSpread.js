import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendNewBlock } from '../../actions/block.js';

class AddNewSpread extends Component {
  handleNewBlockSubmit(){
    const newBlock = {
      'date': this.props.currentDay,
      'title': this.refs['block-name-input'].value
    }
    // console.log(this.refs['block-name-input'].value)
    this.props.dispatch(sendNewBlock(newBlock))
  }
  render(){
    return(
      <div
        className="add-new-spread"
        onFocus={() => console.log('focus new')}
        onBlur={() => console.log('blur new')}
      >
        <input
          type="text"
          placeholder="blockName"
          className="block-name-input"
          ref="block-name-input"
         />
         <button
           onClick={()=>this.handleNewBlockSubmit()}
         >
           submit
         </button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentDay:state.dashboard.currentDay
})

export default connect(mapStateToProps)(AddNewSpread);
