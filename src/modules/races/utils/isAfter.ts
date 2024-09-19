import moment from 'moment';

/**
 * Returns true if date is after today
 * @param date
 * @returns
 */
const isAfter = (date: string) => {
  const today = moment(new Date());

  return today.isAfter(moment(date));
};

export default isAfter;
