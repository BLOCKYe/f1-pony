/**
 * This function will redirect user to google maps
 * with given coordinates
 * @param lat
 * @param long
 */
const redirectToGoogleMaps = (lat: string, long: string) => {
  window.open(`https://www.google.com/maps/@${lat},${long},16z`, '_blank');
};

export default redirectToGoogleMaps;
