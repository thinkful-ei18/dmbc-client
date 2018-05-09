export const SET_DASHBOARD_CURRENT_DAY = 'SET_DASHBOARD_CURRENT_DAY'
export const setDashboardCurrentDay = (date) => ({
  type:SET_DASHBOARD_CURRENT_DAY,
  date
})


export const SET_DASHBOARD_TRIPDAYS = 'SET_DASHBOARD_TRIPDAYS'
export const setDashboardTripdays = (tripDays) => ({
  type:SET_DASHBOARD_TRIPDAYS,
  tripDays
})


export const PUSH_TEMPORARY_NEW_BLOCK = 'PUSH_TEMPORARY_NEW_BLOCK';
export const pushTemporaryNewBlock = (newBlock) => ({
  type:PUSH_TEMPORARY_NEW_BLOCK,
  newBlock
});


export const SET_AMBASSADOR_ITINERARIES = 'SET_AMBASSADOR_ITINERARIES'
export const setAmbassadorItineraries = (tripDays) => ({
  type:SET_AMBASSADOR_ITINERARIES,
  tripDays
})