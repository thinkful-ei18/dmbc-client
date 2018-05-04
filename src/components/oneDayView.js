import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
//actions
import {fetchTripDetails} from '../actions/tripForm';
//components and helpers
import BlockSpread from './daySpread/blockSpread';
import AddNewSpread from './daySpread/addNewSpread';
import Cards from './cards';
import {dayNamesArray} from './utils/dateObjectUtils';
//styles
import '../styles/oneDayView.css';

class OneDayView extends Component {

  componentWillMount() {
    console.log('spread mounted');
    this
      .props
      .dispatch(fetchTripDetails());
  }


  assembleBlocks(){
    console.log('====assemble blocks',this.props.blocks.blocks);

    const blocksToBeAssembled = this.props.blocks.blocks;

    const filteredBlocks = blocksToBeAssembled.filter((block) => {
      return block
        .date
        .getDate() === this
        .props
        .currentDay
        .getDate();
    })

    const blocksAssembled = filteredBlocks.map((currentBlock, index) => {
      return (
        <li key={index}>
          <BlockSpread blockName={currentBlock.title}/>
        </li>
      )
    });
    return blocksAssembled;
  }

  render() {
    if (!this.props.blocks) {
      return (
        <p>no blocks yet</p>
      )
    }
    if (!this.props.currentDay) {
      return <Redirect to="/dashboard"/>
    }
    const blocks = this.assembleBlocks();
    let toolbelt;
    if (this.props.currentUser.id === this.props.blocks.ambassador) {
      toolbelt = <Cards/>
    }
    return (
      <div className="day-spreads-container">
        <h1>{dayNamesArray[
            this
              .props
              .currentDay
              .getDay()
          ]}</h1>
        <ul>
          {blocks}
          {}
        </ul>
        <AddNewSpread/> {toolbelt}
      </div>

    )
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,  
  blocks: state.dashboard.currentItinerary,
  currentDay:state.dashboard.currentDay,
  blocks:state.dashboard.currentItinerary,
  temporaryBlocks:[]
})

export default connect(mapStateToProps)(OneDayView);
