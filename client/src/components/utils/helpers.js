export const round = (val, prec) => {
  const multiplier = Math.pow(10, prec || 0);
  return Math.round(val * multiplier) / multiplier;
};

export const fahrToCels = fahr => {
  return ((fahr - 32) * 5) / 9;
};

export const degToDirection = deg => {
  switch (true) {
    case deg > 337.5 || deg <= 22.5:
      return 'N';
    case deg > 22.5 && deg <= 67.5:
      return 'NE';
    case deg > 67.5 && deg <= 112.5:
      return 'E';
    case deg > 112.5 && deg <= 157.5:
      return 'SE';
    case deg > 157.5 && deg <= 202.5:
      return 'S';
    case deg > 202.5 && deg <= 247.5:
      return 'SW';
    case deg > 247.5 && deg <= 292.5:
      return 'W';
    case deg > 292.5 && deg <= 337.5:
      return 'NW';
    default:
      return '';
  }
};

export const getWeekday = dateTime => {
  const dt = new Date(dateTime);
  const dayInt = dt.getDay();
  switch (true) {
    case dayInt === 0:
      return 'Sun';
    case dayInt === 1:
      return 'Mon';
    case dayInt === 2:
      return 'Tue';
    case dayInt === 3:
      return 'Wed';
    case dayInt === 4:
      return 'Thu';
    case dayInt === 5:
      return 'Fri';
    case dayInt === 6:
      return 'Sat';
    default:
      return 'Error';
  }
};

export const getHourTime12 = dateTime => {
  // obtains the time in hours from input in 12 hour clock
  const dt = new Date(dateTime);
  const hour = dt.getHours();
  switch (true) {
    case hour === 0:
      return '12am';
    case hour === 3:
      return '3am';
    case hour === 6:
      return '6am';
    case hour === 9:
      return '9am';
    case hour === 12:
      return '12pm';
    case hour === 15:
      return '3pm';
    case hour === 18:
      return '6pm';
    case hour === 21:
      return '9pm';
    default:
      return 'Error';
  }
};

export const capitalizeFirstLetter = s => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};
