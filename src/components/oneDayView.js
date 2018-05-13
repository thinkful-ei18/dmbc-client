import React, {Component} from 'react';
import {connect} from 'react-redux';

//dnd
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

//actions

import {fetchTripDetails} from '../actions/tripForm';
import { putCardOnBlock, deleteBlock } from '../actions/block';

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
      cardsContainer: 'hidden',
      addBlock: false
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
      return (
          <BlockSpread
            block={currentBlock}
            key={index}
            id={currentBlock.date}
            handleCardDrop={(e) => this.handleCardDrop(e)}
            deleteBlock={blockId => {
              this.props.dispatch(deleteBlock(blockId));
              window.location.reload();
          }}/>
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
          <i
            className="far fa-times-circle fa-lg toolbelt-button"
            onClick={(event) => {
            event.preventDefault();
            this.setState({cardsContainer: 'hidden'})
          }}/>
        )
      }
    }
    let addBlock;
    if (this.state.addBlock || this.filterBlocks().length === 0) {
      addBlock = <AddNewBlock
        blocksAmmount={blocks.length}
        updateAddBlock={event => {
          this.setState({
            addBlock: false
          });
      }}/>;
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
        {addBlock}
        <span className="new-block-button">
          <i className="fas fa-plus-circle" onClick={event => {
            event.preventDefault();
            if (!this.state.addBlock) {
              this.setState({
                addBlock: true
              });
            } else {
              this.setState({
                addBlock: false
              })
            }
          }}></i>
        </span>
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

OneDayView = DragDropContext(HTML5Backend)(OneDayView);
export default connect(mapStateToProps)(OneDayView);
