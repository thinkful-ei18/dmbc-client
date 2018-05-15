import React, {Component} from 'react';
import {selectCardOnBlock, removeSelectOnBlock, removeCardOnBlock} from '../../actions/block';
import { rateCard } from "../../actions/cards";

import {connect} from 'react-redux';

export class LocationInfo extends Component {
  componentDidMount() {
    this.selectVal = 1;
  }

  lockIn() {
    this
      .props
      .dispatch(selectCardOnBlock({cardID: this.props.info.id, blockID: this.props.blockId}));
  }

  deselect() {
    this.props.dispatch(removeSelectOnBlock({blockId: this.props.blockId}))
  }

  removeCard() {
    this.props.dispatch(removeCardOnBlock({
      blockID: this.props.blockId, 
      cardID: this.props.info.id,
      cards:  this.props.cards
    }));
  }

  removeSelected() {
    console.log('doin this')
    this.props.dispatch(removeSelectOnBlock({blockId: this.props.blockId}))
      .then(() => {
        this.props.dispatch(removeCardOnBlock({
          blockID: this.props.blockId, 
          cardID: this.props.info.id,
          cards:  this.props.cards
        }))
      })
  }

  createSelect() {
    let options = new Array(5);
    for (let i = 0; i < 5; i++) {
      options[i] = <option value={i + 1} key={i + 1}>{i + 1}</option>
    }
    const selector = (
      <form
        onSubmit={e => {
        e.preventDefault();
        console.log('Value', this.selectVal, 'Card ID', this.props.info.id); 
        const values = { 
          rating: this.selectVal, 
          cardId: this.props.info.id,
          blockId: this.props.blockId 
        }
        this.props.dispatch(rateCard(values)); 
      }}>
        <label>Rating</label>
        <select onChange={(input) => this.selectVal = input.target.value}>
          {options}
        </select>
        <button type="submit">Rate Me</button>
      </form>
    )
    return selector;
  }

  render() {
    const selector = this.createSelect()
    let select;
    if (this.props.ambassador && this.props.selected) {
      select = (
        <button onClick={() => this.removeSelected()} className='confirm-location'>Remove</button>
      )
    } else if (this.props.selected) {
      select = (
        <button onClick={() => this.deselect()} className='confirm-location'>Choices</button>
      )
    } else if (this.props.ambassador) {
      select = (
        <button onClick={() => this.removeCard()}>Remove</button>
      )
    } else {
      select = (
        <button onClick={() => this.lockIn()} className='confirm-location'>Lock Location</button>
      )
    }

    return (
      <div className="location-info">
        <div className="location-name">
          <h3>{this.props.info.name}</h3>
          <p className="location-address">{this.props.info.address}</p>
          <p className="location-phone">123-456-7890</p>
          <hr />
          <ul className='place-tags'>
            {this.props.placeTags}
          </ul>
        </div>
        <div>
          <p>Details</p>
          <p className="location-description">{this.props.info.description}</p>
        </div>
        <div className="location-controls">
          {selector}
          {select}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ambassador: state.auth.currentUser.ambassador
});

export default connect(mapStateToProps)(LocationInfo);