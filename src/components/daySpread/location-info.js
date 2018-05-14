import React, {Component} from 'react';
import {connect} from 'react-redux';
import {selectCardOnBlock, removeSelectOnBlock} from '../../actions/block';
import { rateCard } from "../../actions/cards";
import CardButton from '../buttons/cardButton'

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
        <CardButton buttonText={"Rate Me"} />

      </form>
    )
    return selector;
  }

  render() {
    const selector = this.createSelect()
    let select;
    if (this.props.selected) {
      select = (
<<<<<<< HEAD:src/components/daySpread/ExpandedContent.js
        // <button onClick={() => this.deselect()} className='confirm-location'>I want choices</button>
        <CardButton buttonFunction={() => this.deselect()} buttonText={"I want choices"} />
=======
        <button onClick={() => this.deselect()} className='confirm-location'>Choices</button>
>>>>>>> styling changes to one day view:src/components/daySpread/location-info.js
      )
    } else {
      select = (
        // <button onClick={() => this.lockIn()} className='confirm-location'>Lock in</button>
        <CardButton buttonFunction={() => this.lockIn()} buttonText={"Lock in"} />
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

const mapStateToProps = state => ({});

<<<<<<< HEAD:src/components/daySpread/ExpandedContent.js
export default connect(mapStateToProps)(ExpandedContent);
=======
export default connect(mapStateToProps)(LocationInfo);
>>>>>>> styling changes to one day view:src/components/daySpread/location-info.js
