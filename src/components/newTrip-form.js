import React, { Component } from 'react';
import { connect } from 'react-redux';

//react components
import ViewButton from './buttons/viewButton';
import DatePicker from 'react-date-picker';
import Geosuggest from 'react-geosuggest';

//actions
import {
	setDateStart,
	setDateEnd,
	setTripDestination,
	setTripPartners,
	pushTripDetails
} from '../actions/tripForm';
//styles
import '../styles/newTrip-form.css';

class NewTripForm extends Component {
	sendTripInfo() {
		//temp fix need to either modify back end or my actions.
		const tripDetails = {
			destination: this.props.destination,
			dateStart: this.props.dateStart,
			dateEnd: this.props.dateEnd,
			partners: this.props.partners,
			ambassador: '322222222222222222222200',
			distance: 30
		};
		return this.props.dispatch(pushTripDetails(tripDetails));
	}

	render() {
		const wrongDates =
			this.props.dateStart > this.props.dateEnd ? true : false;
		const noDate = this.props.dateStart ? false : true;
		let error = <div className="trip-form-error">Required</div>;
		let placeError;
		if (!this.props.destination) {
			placeError = <div className="trip-form-error">Required</div>;
		}
		if (wrongDates && this.props.dateEnd) {
			error = (
				<div className="trip-form-error">
					End date must be after start date
				</div>
			);
		} else if (!wrongDates && !noDate) {
			error = '';
		}
		const fixtures = [
			{
				gmaps: {
					address_components: [
						{
							long_name: 'Chicago',
							types: ['locality']
						}
					]
				},
				label: 'Chicago',
				location: { lat: 41.8781, lng: -87.6298 }
			},
			{
				gmaps: {
					address_components: [
						{
							long_name: 'Mexico City',
							types: ['locality']
						}
					]
				},
				label: 'Mexico City',
				location: { lat: 19.4326, lng: -99.1332 }
			},
			{
				gmaps: {
					address_components: [
						{
							long_name: 'Tokyo',
							types: ['locality']
						}
					]
				},
				label: 'Tokyo',
				location: { lat: 35.673343, lng: 139.710388 }
			}
		];
		return (
			<div className="trip-form-background">
				<div className="trip-form-container">
					<h2>Tell us a little about your trip</h2>
					<div className="trip-form-place">
						<p>I'm traveling to...</p>
						{placeError}
						<Geosuggest
							className="trip-geo-input"
							fixtures={fixtures}
							onSuggestSelect={location =>
								this.props.dispatch(
									setTripDestination(location)
								)
							}
						/>
					</div>
					<div className="trip-form-dates">
						<p>From</p>
						<div className="trip-form-input">
							{error}
							<DatePicker
								value={this.props.dateStart}
								onChange={dateStart =>
									this.props.dispatch(setDateStart(dateStart))
								}
								minDate={new Date()}
							/>
						</div>
						<p>up until,</p>
						<div className="trip-form-input">
							{error}
							<DatePicker
								style={{ margin: '0px 5px' }}
								value={this.props.dateEnd}
								onChange={dateEnd =>
									this.props.dispatch(setDateEnd(dateEnd))
								}
								minDate={new Date(this.props.dateStart)}
							/>
						</div>
					</div>
					<div className="trip-travelers">
						<p>Who's traveling with you? </p>
						<input
							type="text"
							placeholder="Not required if travelling solo"
							onBlur={travelers =>
								this.props.dispatch(
									setTripPartners(travelers.target.value)
								)
							}
						/>
					</div>
					<div className="controls">
						{/* <button
              ref='submit'
              onClick={() =>this.sendTripInfo()}
              disabled={wrongDates||noDate}
            >Submit</button> */}

						<ViewButton
							buttonFunction={() => this.sendTripInfo()}
							buttonText={'Submit'}
							disabled={wrongDates || noDate}
							overrideStyle={{
								marginTop: '10px'
							}}
						/>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	dateStart: state.trip.dateStart,
	dateEnd: state.trip.dateEnd,
	partners: state.trip.partners,
	destination: state.trip.destination
});

export default connect(mapStateToProps)(NewTripForm);
