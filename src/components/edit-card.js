import React from 'react';
import {connect} from 'react-redux';
import {fetchSingleCard, updateCard} from '../actions/cards';
import { setToolbeltDisplay } from '../actions/dashboard';
import requiresLogin from '../requires-login';
import Background from '../assets/bar-large.jpg'

class SingleCard extends React.Component {
  constructor() {
    super();

    this.state = {
      name: null,
      description: null,
      address: null,
      hours: null,
      id: null,
      image: null,
    }
  }
  componentDidMount() {
    this.props.dispatch(fetchSingleCard(this.props.id))
    .then(() => {
      this.setState({
        name: this.props.singleCard.name,
        description: this.props.singleCard.description,
        address: this.props.singleCard.address,
        hours: this.props.singleCard.hours,
        id: this.props.singleCard.id,
        image: this.props.singleCard.image
      })
    });
  };
  render() {
    console.log(this.props)
    const apiTags = ['Family Friendly', 'Crowd Friendly', 'No Pets'];

    const placeTags = apiTags.map((tag,index) => {
      return (<li key={index}>{tag}</li>)
    });
    const distance = this.props.destination.distance;

    let editForm;
    if (this.state.id) {
      let newCard = {
        name: this.state.name,
        description: this.state.description,
        address: this.state.address,
        hours: this.state.hours,
        id: this.state.id,
        image: this.state.image,
        ambassador: this.props.singleCard.ambassador
      }
      editForm = (
        <form onSubmit={event => {
          event.preventDefault();
          this.props.dispatch(updateCard(newCard, this.state.id, distance))
          this.props.dispatch(setToolbeltDisplay('cards'));
        }}>
        <h4>Edit Card</h4>
        <div className='card-container-expanded no-drag' key={this.props.index}>
          <div className='card-header' style={{'backgroundImage':`url(${this.state.image})`}}>
            <div className="card-title">
              <span className='place-name'>
                <input 
                  id="name"
                  name="name"
                  defaultValue={this.state.name}
                  onChange={event => {
                    event.preventDefault();
                    this.setState({
                      name: event.target.value
                    })
                  }}
                />
              </span>
              <span className='card-blurb'>
                <input 
                  id="address"
                  name="address"
                  defaultValue={this.state.address}
                  onChange={event => {
                    event.preventDefault();
                    this.setState({
                      address: event.target.value
                    })
                  }}
                />
              </span>
            </div>
          </div>
          <div className='place-tags'>
            <ul>
              {placeTags}
            </ul>
          </div>
          <div>
            <div className='card-body'>
              <span className='blurb-header'>Details</span>
              <span className='card-blurb'>
                <textarea 
                  id="description"
                  name="description"
                  maxLength="100"
                  defaultValue={this.state.description}
                  onChange={event => {
                    event.preventDefault();
                    this.setState({
                      description: event.target.value
                    })
                }}/>
              </span>
            </div>
            <div className='card-controls'>
              <button>Submit Changes</button>
            </div>
          </div>
        </div>
        </form>
      );
    }
    return (
      <div className="edit-card-form">
        {editForm}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  singleCard: state.cards.singleCard,
  loading: state.cards.loading,
  error: state.cards.error,
  destination:state.dashboard.currentItinerary.destination
});

export default requiresLogin()(connect(mapStateToProps)(SingleCard));