import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
//actions
import { fetchTripDetails } from '../actions/tripForm';
//components and helpers
import BlockSpread from './daySpread/blockSpread';
import AddNewSpread from './daySpread/addNewSpread';
import { dayNamesArray } from './utils/dateObjectUtils';
//styles
import '../styles/oneDayView.css';

class OneDayView extends Component{


  componentWillMount(){
    console.log('spread mounted');
    this.props.dispatch(fetchTripDetails());
  }

  componentDidUpdate(){

  }
  assembleBlocks(){
    const blocksToBeAssembled = this.props.blocks.blocks;

   const filteredBlocks = blocksToBeAssembled.filter((block) => {
      return block.date.getDate() === this.props.currentDay.getDate();
    })

    const blocksAssembled = filteredBlocks.map((currentBlock, index) => {
      return(
        <li key={index}>
          <BlockSpread blockName={currentBlock.title}/>
        </li>
    )
    });
    return blocksAssembled;
  }

  render(){
    if(!this.props.blocks){
      return(<p>no blocks yet</p>)
    }
    const blocks = this.assembleBlocks();
    return(
      <div className="day-spreads-container">
        <h1>{dayNamesArray[this.props.currentDay.getDay()]}</h1>
        <ul>
          {blocks}
        </ul>
        <AddNewSpread />
      </div>


    )
  }
}

const mapStateToProps = (state) => ({
  currentDay:state.dashboard.currentDay,
  blocks:state.dashboard.currentItinerary
})

export default connect(mapStateToProps)(OneDayView);
