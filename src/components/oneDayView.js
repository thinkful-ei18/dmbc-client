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

  filterBlocks() {
    return this.props.blocks.blocks.filter(block => {
      return block.date.getDate() === this.props.currentDay.getDate();
    })
  }

  assembleBlocks(){
    const blocksAssembled = this.filterBlocks().map((currentBlock, index) => {
      return (
        <li key={index}>
          <BlockSpread block={currentBlock}/>
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
      toolbelt = <Cards availableBlocks={this.filterBlocks()}/>
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
  currentDay:state.dashboard.currentDay
})

export default connect(mapStateToProps)(OneDayView);
