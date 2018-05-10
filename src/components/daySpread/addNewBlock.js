import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendNewBlock } from '../../actions/block.js';

class AddNewBlock extends Component {
  handleNewBlockSubmit(){
    const newBlock = {
      'date': this.props.currentDay,
      'title': this.refs['block-name-input'].value
    }
    this.props.dispatch(sendNewBlock(newBlock));
    return this.refs['block-name-input'].value = '';
  }
  
  render(){
  //sets it up so that when you are gonna add a block it will be the "sooner/newer" date
  this.props.currentDay.setHours(this.props.blocksAmmount);
    return(
      <div
        className="add-new-spread"
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

export default connect(mapStateToProps)(AddNewBlock);
