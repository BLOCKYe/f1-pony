/**
 * Returns true if place is greater than grid
 * @param grid
 * @param position
 * @returns
 */
const isProgress = (grid: string, position: string) => {
  if (grid === '0') return true;

  const placeNumber = parseInt(position);
  const gridNumber = parseInt(grid);

  return placeNumber - gridNumber <= 0;
};

export default isProgress;
