import moment from 'moment-timezone';

function getTimeFromLocal(dateTime: string): string {
  // Parse the input datetime
  const inputMoment = moment.utc(dateTime);

  // Convert to time based on current user location
  const userTime = inputMoment.clone().tz(moment.tz.guess());

  // Return formatted time string
  return userTime.format('YYYY-MM-DD, HH:mm');
}

export default getTimeFromLocal;
