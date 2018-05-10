import React, {Component} from 'react';
import {connect} from 'react-redux';

//dnd
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

//actions

import {fetchTripDetails} from '../actions/tripForm';
import { putCardOnBlock } from '../actions/block';

//components and helpers
import BlockSpread from './daySpread/blockSpread';
import AddNewBlock from './daySpread/addNewBlock';
import Toolbelt from './toolbelt';
import { Link } from "react-router-dom";
import {dayNamesArray} from './utils/dateObjectUtils';
//styles
import '../styles/oneDayView.css';
import { setDashboardCurrentDay } from '../actions/dashboard';


class OneDayView extends Component {
  constructor() {
    super();
    this.state = {
      cardsContainer: 'hidden'
    };
  }
  handleCardDrop(cardObject){
    console.log(cardObject,'from up here');
    this.props.dispatch(putCardOnBlock(cardObject))
  }
  filterBlocks() {
    return this.props.blocks.blocks.filter(block => {
      return block.date.getDate() === this.props.currentDay.getDate();
    })
    .sort((a,b) => a-b);
  }

  assembleBlocks(){
    const blocksAssembled = this.filterBlocks().map((currentBlock, index) => {
      console.log(currentBlock,index,'blocksAssembled');
      return (
        // <li key={index}>
         // ###draganddropnotes, block dragging
        //this is a drag object for block dragging
        //this is where we can pass in the id's for organizing and re ordering blocks
        //define an order blocks function here?
        //id is temporarily index, should be comming from state once we wire things up
          <BlockSpread
            block={currentBlock}
            key={index}
            id={currentBlock.date}
            handleCardDrop={(e) => this.handleCardDrop(e)}
          />
        // </li>
      )
    });
    return blocksAssembled;
  }
  render() {
    if (!this.props.currentDay) {
      this.props.dispatch(fetchTripDetails());
      let lastDayViewed = new Date(localStorage.getItem('lastDayViewed'));
      this.props.dispatch(setDashboardCurrentDay(lastDayViewed));
    }
    if (!this.props.blocks) {
      return (
        <p>no blocks yet</p>
      )
    }
    localStorage.setItem('lastDayViewed', this.props.currentDay)
    const blocks = this.assembleBlocks();

    let toolbelt;
    let toolbeltButton;
    if (this.props.currentUser.id === this.props.blocks.ambassador.id) {
      toolbelt = <Toolbelt
        availableBlocks={this.filterBlocks()}
        cardsContainer={this.state.cardsContainer}
      />
      if (this.state.cardsContainer === 'hidden') {
        toolbeltButton = (
          <button className="toolbelt-button" onClick={event => {
            event.preventDefault();
            this.setState({
              cardsContainer: 'show'
            });
          }}>Toolbelt</button>
        )
      } else {
        toolbeltButton = (
          <i className="far fa-times-circle fa-lg toolbelt-button" onClick={event => {
            event.preventDefault();
            this.setState({
              cardsContainer: 'hidden'
            })
          }} />
        )
      }
    }

    return (
      <div className="day-spreads-container">
        {toolbeltButton}
        <h1>{dayNamesArray[
            this
              .props
              .currentDay
              .getDay()
          ]}</h1>
        <Link to="/dashboard"><button>Back To Dashboard</button></Link>
        <ul>
          {blocks}
        </ul>
        <AddNewBlock blocksAmmount={blocks.length}/> {toolbelt}
      </div>

    )
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
  blocks: state.dashboard.currentItinerary,
  currentDay:state.dashboard.currentDay
})

OneDayView = DragDropContext(HTML5Backend)(OneDayView);
export default connect(mapStateToProps)(OneDayView);
