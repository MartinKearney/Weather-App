export const round = (val, prec) => {
  const multiplier = Math.pow(10, prec || 0);
  return Math.round(val * multiplier) / multiplier;
};

export const fahrToCels = (fahr) => {
  return ((fahr - 32) * 5) / 9;
};

export const degToDirection = (deg) => {
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

export const getNextDay = (day) => {
  switch (true) {
    case day === 'Sat':
      return 'Sun';
    case day === 'Sun':
      return 'Mon';
    case day === 'Mon':
      return 'Tue';
    case day === 'Tue':
      return 'Wed';
    case day === 'Wed':
      return 'Thu';
    case day === 'Thu':
      return 'Fri';
    case day === 'Fri':
      return 'Sat';
    default:
      return 'Error';
  }
};

export const capitalizeFirstLetter = (s) => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const getHourTime = (h) => {
  let hourTime;
  if (h > 12) {
    hourTime = h - 12 + 'pm';
  } else if (h === 12) {
    hourTime = '12pm';
  } else if (h === 0) {
    hourTime = '12am';
  } else {
    hourTime = h + 'am';
  }
  return hourTime;
};

export const setFiveDayObject = (ti, ic, te, wi) => {
  return { time: ti, icon: ic, temp: te, wind: wi };
};
