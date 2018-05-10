'use strict'
<Slide className="ambassador-itinerary-slide ambassador-cards-slide" key={index} index={index}>
<div className="itinerary-destination">
<h4>{itinerary.destination.locationName}</h4>
</div>
<div className="itinerary-date-start">
<h4>{moment(itinerary.dateStart).format("ll")}</h4>
<h4>to</h4>
<h4 className="itinerary-date-end">{moment(itinerary.dateEnd).format("ll")}</h4>
</div>
<h4 className="itinerary-partners">{itinerary.partners}</h4>

<Slide className="ambassador-cards-slide" index={index} key={index}>
 <Link to={{pathname: `/itineraries/${itinerary.id}`}} key={index}>
            <div className='card-container-expanded' key={index}>
              <div
                className='card-header'
                style={{
                'backgroundImage': `url(${Background})`
              }}>
                <span className='place-name'>{itinerary.destination.locationName}</span>
              </div>
             
                <div className='card-body'>
                  <span className='blurb-header'>{moment(itinerary.dateStart).format("ll")}</span>
                  <span className='blurb-header'>{moment(itinerary.dateEnd).format("ll")}</span>
                  
                  <span className='card-blurb'>
                  {itinerary.partners}
                  </span>
                </div>
            </div>
          </Link>
          </Slide>