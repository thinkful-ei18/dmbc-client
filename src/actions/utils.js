export const normalizeResponseErrors = res => {
  if (!res.ok) {
    if (
      res.headers.has("content-type") &&
      res.headers.get("content-type").startsWith("application/json")
    ) {
      // It's a nice JSON error returned by us, so decode it
      return res.json().then(err => Promise.reject(err));
    }
    // It's a less informative error returned by express
    return Promise.reject({ code: res.status, message: res.statusText });
  }
  return res;
};

export const convertDateStringToDate = itinerary => {
  const dateStartObj = new Date(itinerary.dateStart);
  const dateEndObj = new Date(itinerary.dateEnd);
  const formattedBlocks = convertBlockStringsToDate(itinerary.blocks);
  const formattedItinerary = Object.assign({}, itinerary, {
    dateStart: dateStartObj,
    dateEnd: dateEndObj,
    blocks: formattedBlocks
  });
  return formattedItinerary;
};
export const convertBlockStringsToDate = blocks => {
  const formattedBlocks = blocks.map((block, index) => {
    return Object.assign({}, block, {
      date: new Date(block.date)
    });
  });
  return formattedBlocks;
};
