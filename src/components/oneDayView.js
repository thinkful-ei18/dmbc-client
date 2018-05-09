import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

//dnd
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

//actions
//components and helpers
import BlockSpread from './daySpread/blockSpread';
import AddNewBlock from './daySpread/addNewBlock';
import Cards from './cards';
import {dayNamesArray} from './utils/dateObjectUtils';
//styles
import '../styles/oneDayView.css';


class OneDayView extends Component {
  constructor() {
    super();
    this.state = {
      cardsContainer: 'hidden'
    };
  }

  filterBlocks() {
    return this.props.blocks.blocks.filter(block => {
      return block.date.getDate() === this.props.currentDay.getDate();
    })
  }

  assembleBlocks(){
    const blocksAssembled = this.filterBlocks().map((currentBlock, index) => {
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
            id={index}
          />
        // </li>
      )
    });
    return blocksAssembled;
  }

  render() {
    if (!this.props.currentDay) {
      return <Redirect to="/dashboard" />
    }
    if (!this.props.blocks) {
<<<<<<< HEAD
      return (
        <p>no blocks yet</p>
      )
    }
=======
      return (<p>no blocks yet</p>)
    }
    if (!this.props.currentDay) return <Redirect to="/dashboard"/>


>>>>>>> blocks are draggable, adding blocks will be contextual, newer ones are "later" in the day
    const blocks = this.assembleBlocks();

    let toolbelt;
    if (this.props.currentUser.id === this.props.blocks.ambassador) {
      toolbelt = <Cards
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
