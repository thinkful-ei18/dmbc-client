import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import requiresLogin from '../requires-login';
import {fetchCards, fetchSearchCards} from '../actions/cards';
import Background from '../assets/barPlaceHolder.jpg'
import { putCardOnBlock } from '../actions/block';

import '../styles/oneDayView.css';
import Yelp from './yelp';

export class Cards extends React.Component {
  constructor() {
    super();

    this.state = {
      displayCards: true
    }
  }
  componentDidMount() {
    if (this.props.availableBlocks > 0) {
      this.selectVal = this.props.availableBlocks[0].id
    }
    this.props.dispatch(fetchCards());
  }

  addSelectorToCard(cardId) {
    const options = this.props.availableBlocks.map(block => {
      return <option value={block.id} key={block.id}>{block.title}</option>
    });
    const selector = (
      <form onSubmit={e => {
        e.preventDefault();
        console.log('Block ID',this.selectVal, 'Card ID', cardId);
        this.props.dispatch(putCardOnBlock({ blockID: this.selectVal, cardID: cardId}));
      }}>
        <label>Assign to Card
          <select onChange={(input) => this.selectVal = input.target.value}>
            {options}
          </select>
        </label>
        <button type="submit">Lock In</button>
      </form>
    )
    return selector;
  }

  render() {
    const apiTags = ['Family Friendly', 'Crowd Friendly', 'No Pets'];
    
    const placeTags = apiTags.map((tag,index) => {
      return (<li key={index}>{tag}</li>)
    });
    const cards = this.props.cards.map((card, index) => {
      return (
        <div className={'cardContainer-expanded'} key={index}>
          <div className='cardHeader' style={{'backgroundImage':`url(${Background})`}}>
            <span className='placeName'>{card.name}</span>
          </div>
          <div className='placeTags'>
            <ul>
              {placeTags}
            </ul>
          </div>
          <div>
          <div className='cardBody'>
            <span className='blurbHeader'>Details</span>
            <span className='cardBlurb'>
              {card.description}
            </span>
          </div>
          <div className='cardControls'>
            {this.addSelectorToCard(card.id)}
            <Link to={`/cards/${card.id}`}>Edit Card</Link>
            <button className='confirm-location'>Lock in</button>
          </div>
          </div>
        </div>
      )
    })

    let cardSearch;
    if (this.state.displayCards) {
      cardSearch = (
        <div>
          <form onSubmit={event => {
            event.preventDefault();
            this.props.dispatch(fetchSearchCards(this.searchTerm.value));
          }}>
          <input
            placeholder="search"
            name="search"
            ref={input => this.searchTerm = input}
          />
          <button>Submit</button>
          </form>
          {cards}
        </div>
      );
    } else {
      cardSearch = <Yelp />
    }

    let changeState;
    if (this.state.displayCards) {
      changeState = (
        <button onClick={event => {
          event.preventDefault();
          this.setState({
            displayCards: false
          })
        }}>Create a Card</button>
      )
    } else {
      changeState = (
        <button onClick={event => {
          event.preventDefault();
          this.setState({
            displayCards: true
          })
        }}>Back</button>
      )
    }

    return (
      <div>
        {cardSearch}
        {changeState}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cards: state.cards.cards,
  loading: state.cards.loading,
  error: state.cards.error,
  // blocks:state.dashboard.currentItinerary.blocks
});

export default requiresLogin()(connect(mapStateToProps)(Cards));
