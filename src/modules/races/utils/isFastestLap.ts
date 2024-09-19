/**
 * Returns true if lapPosition is fastest lap
 * @param lapPosition
 * @returns
 */
const isFastestLap = (lapPosition: string) => {
  const placeNumber = parseInt(lapPosition);

  return placeNumber === 1;
};

export default isFastestLap;
