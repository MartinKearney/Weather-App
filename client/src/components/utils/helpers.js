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

export const getIconId = (code) => {
  switch (true) {
    case code === '01d':
      return '1d';
    case code === '01n':
      return '1n';
    case code === '02d':
      return '2d';
    case code === '02n':
      return '2n';
    case code === '03d':
      return '3d';
    case code === '03n':
      return '3d';
    case code === '04d':
      return '4d';
    case code === '04n':
      return '4d';
    case code === '09d':
      return '9d';
    case code === '09n':
      return '9d';
    case code === '10d':
      return '10d';
    case code === '10n':
      return '10n';
    case code === '11d':
      return '11d';
    case code === '11n':
      return '11n';
    case code === '13d':
      return '13d';
    case code === '13n':
      return '13n';
    case code === '50d':
      return '50d';
    case code === '50n':
      return '50d';
    default:
      return 'error';
  }
};

export const icons = [
  { id: '1d', src: './images/01d.png' },
  { id: '1n', src: './images/01n.png' },
  { id: '2d', src: './images/02d.png' },
  { id: '2n', src: './images/02n.png' },
  { id: '3d', src: './images/03d.png' },
  { id: '4d', src: './images/04d.png' },
  { id: '9d', src: './images/09d.png' },
  { id: '10d', src: './images/10d.png' },
  { id: '10n', src: './images/10n.png' },
  { id: '11d', src: './images/11d.png' },
  { id: '11n', src: './images/11n.png' },
  { id: '13d', src: './images/13d.png' },
  { id: '13n', src: './images/13n.png' },
  { id: '50d', src: './images/50d.png' },
];
