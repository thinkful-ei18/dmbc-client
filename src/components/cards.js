import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import requiresLogin from '../requires-login';
import {fetchCards, fetchSearchCards} from '../actions/cards';
import CreateCard from './create-card';
import Background from '../assets/barPlaceHolder.jpg'

import './scratch/placeCard.css';

export class Cards extends React.Component {
  constructor() {
    super();

    this.state = {
      search: true
    }
  }
  componentDidMount() {
    this.props.dispatch(fetchCards());
  }

  render() {
    const apiTags = ['Family Friendly', 'Crowd Friendly', 'No Pets'];
    //END DUMMY PROPS
    const placeTags = apiTags.map((tag,index) => {
      return (<li key={index}>{tag}</li>)
    });
    const cards = this.props.cards.map((card, index) => {
      return (
        <div className={'cardContainer-expanded'}>
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
            <Link to={`/cards/${card.id}`}>Edit Card</Link>
            <button className='confirm-location'>Lock in</button>
          </div>
          </div>
        </div>
      )
    })

    let cardSearch;
    if (this.state.search) {
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
      cardSearch = <CreateCard />
    }
    
    let changeState;
    if (this.state.search) {
      changeState = (
        <button onClick={event => {
          event.preventDefault();
          this.setState({
            search: false
          })
        }}>Create a Card</button>
      )
    } else {
      changeState = (
        <button onClick={event => {
          event.preventDefault();
          this.setState({
            search: true
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
  error: state.cards.error
});

export default requiresLogin()(connect(mapStateToProps)(Cards));