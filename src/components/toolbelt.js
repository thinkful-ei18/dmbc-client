import React from 'react';
import {connect} from 'react-redux';


import requiresLogin from '../requires-login';
import {fetchDestinationCards, fetchSearchCards} from '../actions/cards';
import Background from '../assets/barPlaceHolder.jpg'
import ToolbeltCard from './toolBeltCard'
import '../styles/oneDayView.css';
import '../styles/toolbelt.css';
import Yelp from './yelp';
import { setToolbeltDisplay } from '../actions/dashboard';
import EditCard from './edit-card';





export class Toolbelt extends React.Component {
  constructor() {
    super();

    this.state = {
      cardId: ''
    }
  }
  componentWillMount() {
    if (this.props.availableBlocks.length > 0) {
      this.selectVal = this.props.availableBlocks[0].id
    }
    const destination = {
      distance: this.props.destination.distance,
      lat: this.props.destination.location.coordinates[1],
      lng: this.props.destination.location.coordinates[0]
    }
    if (!this.props.filtered) {
      this.props.dispatch(fetchDestinationCards(destination));
    }
  }

  componentDidUpdate() {
    if (this.props.availableBlocks.length > 0) {
      this.selectVal = this.props.availableBlocks[0].id
    }
  }

  render() {
    const apiTags = ['Family Friendly', 'Crowd Friendly', 'No Pets'];

    const placeTags = apiTags.map((tag,index) => {
      return (<li key={index}>{tag}</li>)
    });
    //cards assembled here
    const cards = this.props.cards.map((card, index) => {
      return (
        <ToolbeltCard
          Background={Background}
          key={index}
          card={card}
          index={index}
          placeTags={placeTags}
          cardId={cardId => {
            this.setState({
              cardId: cardId
            })
          }}
        />
      )
    })

    let display;
    if (this.props.toolBeltDisplay === 'cards') {
      display = (
        <div>
          <form className="card-search" onSubmit={event => {
            event.preventDefault();
            this.props.dispatch(fetchSearchCards(this.searchTerm.value));
          }}>
            <input
              placeholder="search"
              name="search"
              ref={input => this.searchTerm = input}
            />
            <button><i className="fas fa-search"></i></button>
          </form>
          <div className="cards-container">
            {cards}
          </div>
        </div>
      );
    } else if (this.props.toolBeltDisplay === 'create') {
      display = <Yelp />
    } else if (this.props.toolBeltDisplay === 'edit') {
      display = <EditCard id={this.state.cardId}/>
    }

    let changeState;
    if (this.props.toolBeltDisplay === 'cards') {
      changeState = (
        <button class="create-card" onClick={event => {
          event.preventDefault();
          this.props.dispatch(setToolbeltDisplay('create'));
        }}>New Card</button>
      )
    } else if (this.props.toolBeltDisplay !== 'cards'){
      changeState = (
        <button class="back-button" onClick={event => {
          event.preventDefault();
          this.props.dispatch(setToolbeltDisplay('cards'));
        }}>Back</button>
      )
    }

    return (
      <div className={(this.props.cardsContainer === 'hidden') ? 'toolbelt-hidden' : 'toolbelt'}>
        <div className="cards">
          {changeState}
          {display} 
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  filtered: state.cards.filtered,
  cards: state.cards.cards,
  loading: state.cards.loading,
  error: state.cards.error,
  destination:state.dashboard.currentItinerary.destination,
  toolBeltDisplay: state.dashboard.toolBeltDisplay
});

export default requiresLogin()(connect(mapStateToProps)(Toolbelt));
