import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendNewBlock } from '../../actions/block.js';
import CardButton from '../buttons/cardButton';

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
      <div className="add-new-spread">
        <form onSubmit={event=> {
          event.preventDefault();
          this.handleNewBlockSubmit();
          this.props.updateAddBlock();
        }}>
          <label htmlFor="newblock">Enter a Block Name</label>
          <input
            type="text"
            placeholder="blockname"
            className="block-name-input"
            name="newblock"
            ref="block-name-input"
          />
          <CardButton buttonText={'Submit'} />
          {/* <button>submit</button> */}
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentDay:state.dashboard.currentDay
})

export default connect(mapStateToProps)(AddNewBlock);
