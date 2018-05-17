import React, { Component } from "react";
import { connect } from "react-redux";

//dnd
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

//actions
import { fetchTripDetailsById } from "../actions/tripForm";
import { putCardOnBlock, deleteBlock } from "../actions/block";
import { setDashboardCurrentDay } from "../actions/dashboard";

//components and helpers
import requiresLogin from "../requires-login";
import BlockSpread from "./daySpread/blockSpread";
import AddNewBlock from "./daySpread/addNewBlock";
import Toolbelt from "./toolbelt";
import ViewButton from "./buttons/viewButton";
//styles
import "../styles/oneDayView.css";


class OneDayView extends Component {
  constructor() {
    super();
    this.state = {
      cardsContainer: "hidden",
      addBlock: false
    };
  }
  handleCardDrop(cardObject) {
    this.props.dispatch(putCardOnBlock(cardObject));
  }
  filterBlocks() {
    return this.props.blocks.blocks
      .filter(block => {
        return block.date.getDate() === this.props.currentDay.getDate();
      })
      .sort((a, b) => a - b);
  }

  assembleBlocks() {
    const blocksAssembled = this.filterBlocks().map((currentBlock, index) => {
      return (
        <BlockSpread
          block={currentBlock}
          key={index}
          id={currentBlock.date}
          handleCardDrop={e => this.handleCardDrop(e)}
          ambassador={this.props.currentUser.ambassador}
          deleteBlock={blockId => {
            this.props.dispatch(deleteBlock(blockId)).then(() => {
              this.props.dispatch(
                fetchTripDetailsById(this.props.match.params.id)
              );
            });
          }}
        />
      );
    });
    return blocksAssembled;
  }
  render() {
    if (!this.props.currentDay) {
      this.props.dispatch(fetchTripDetailsById(this.props.match.params.id));
      let lastDayViewed = new Date(localStorage.getItem("lastDayViewed"));
      this.props.dispatch(setDashboardCurrentDay(lastDayViewed));
    }
    if (!this.props.blocks) {
      return <p>no blocks yet</p>;
    }
    localStorage.setItem("lastDayViewed", this.props.currentDay);
    const blocks = this.assembleBlocks();

    let toolbelt;
    let toolbeltButton;
    let closeToolbeltButton;
    if (this.props.currentUser.id === this.props.blocks.ambassador.id) {
      toolbelt = (
        <Toolbelt
          availableBlocks={this.filterBlocks()}
          cardsContainer={this.state.cardsContainer}
        />
      );
      if (this.state.cardsContainer === "hidden") {
        toolbeltButton = (
          <ViewButton
            buttonFunction={event => {
              event.preventDefault();
              this.setState({ cardsContainer: "show" });
            }}
            overrideStyle={{
              position: "relative",
              left: "100%",
              transform: "translate(-100%,144%)"
            }}
            buttonText="Toolbelt"
          />
        );
      } else {
        toolbeltButton = (
          <ViewButton
            buttonFunction={event => {
              event.preventDefault();
              this.setState({ cardsContainer: "hidden" });
            }}
            buttonText="Toolbelt"
            overrideStyle={{
              position: "relative",
              left: "100%",
              transform: "translate(-100%,144%)"
            }}
          />
        );
        closeToolbeltButton = (
          <i
            style={{
              position: "absolute",
              right: "10px",
              top: "26px",
              transition: "2s"
            }}
            className="far fa-times-circle fa-lg toolbelt-button"
            onClick={event => {
              event.preventDefault();
              this.setState({ cardsContainer: "hidden" });
            }}
          />
        );
      }
    }
    let addBlock;
    if (
      (this.state.addBlock || this.filterBlocks().length === 0) &&
      !this.props.currentUser.ambassador
    ) {
      addBlock = (
        <AddNewBlock
          blocksAmmount={blocks.length}
          updateAddBlock={event => {
            this.setState({
              addBlock: false
            });
          }}
        />
      );
    } else if (
      (this.state.addBlock || this.filterBlocks().length === 0) &&
      this.props.currentUser.ambassador
    ) {
      addBlock = (
        <span className="no-user-blocks-warning">
          There are no blocks yet for this day.
        </span>
      );
    }

    let addBlockButton;
    if (!this.props.currentUser.ambassador) {
      addBlockButton = (
        <div className="tooltip">
          <span className="new-block-button">
            <i
              className="fas fa-plus-circle"
              onClick={event => {
                event.preventDefault();
                if (!this.state.addBlock) {
                  this.setState({
                    addBlock: true
                  });
                } else {
                  this.setState({
                    addBlock: false
                  });
                }
              }}
            />
          </span>
          <span className="tooltiptext">Request an additional suggestion</span>
        </div>
      );
    }

    return (
      <div className="day-spreads-container">
        <div
          className="toolbelt-overlay-close"
          onClick={event => {
            if (this.state.cardsContainer === "show") {
              this.setState({
                cardsContainer: "hidden"
              });
            }
          }}
        >
          {toolbeltButton}
          {closeToolbeltButton}
          <h2>{this.props.currentDay.toDateString()}</h2>
          {/* <div className="one-day-view-logo">
            <Logo />
          </div> */}
          <ul>{blocks}</ul>
          {addBlock}
          {addBlockButton}
        </div>
        {toolbelt}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  blocks: state.dashboard.currentItinerary,
  currentDay: state.dashboard.currentDay
});

OneDayView = DragDropContext(HTML5Backend)(OneDayView);
export default requiresLogin()(connect(mapStateToProps)(OneDayView));
