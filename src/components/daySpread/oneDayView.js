import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
// import requiresLogin from "../../requires-login";
//actions
import {fetchTripDetails} from '../../actions/tripForm';
//components and helpers
import BlockSpread from './blockSpread';
import AddNewSpread from './addNewSpread';
import Toolbelt from '../toolbelt/toolbelt';
import {dayNamesArray} from '../utils/dateObjectUtils';
//styles
import './oneDayView.css';

class OneDayView extends Component {
  constructor() {
    super();

    this.state = {
      cardsContainer: 'hidden'
    };
  }

  componentWillMount() {
    console.log('spread mounted');
    this
      .props
      .dispatch(fetchTripDetails());
  }

  filterBlocks() {
    return this
            .props
            .blocks
            .blocks
            .filter(block => {
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
      toolbelt = <Toolbelt 
        availableBlocks={this.filterBlocks()}
        cardsContainer={this.state.cardsContainer}
      />
    }
    
    return (
      <div className="day-spreads-container">
      <button onClick={event => {
        event.preventDefault();
        if (this.state.cardsContainer === 'hidden') {
          this.setState({
            cardsContainer: 'show'
          });
        } else {
          this.setState({
            cardsContainer: 'hidden'
          })
        }
      }}>Toolbelt</button>
        <h1>{dayNamesArray[
            this
              .props
              .currentDay
              .getDay()
          ]}</h1>
        <ul>
          {blocks}
        </ul>
        <AddNewSpread/>
        {toolbelt}
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
// export default requiresLogin(connect(mapStateToProps)(OneDayView));