export const toCelsius = (tempInF) => {
  return Math.round((5/9) * (tempInF - 32) * 10) / 10
};

export const roundDecimal = (roundMe) => {
  return Math.round((roundMe * 10)) / 10;
};

export const getDayString = (dayInt) => {
  switch (dayInt) {
    case 0:
      return 'Sun';
    case 1:
      return 'Mon';
    case 2:
      return 'Tue';
    case 3:
      return 'Wed';
    case 4:
      return 'Thu';
    case 5:
      return 'Fri';
    case 6:
      return 'Sat';
  }
};

export const getMonthString = (monthInt) => {
  switch (monthInt) {
    case 0:
      return 'Jan';
    case 1:
      return 'Feb';
    case 2:
      return 'Mar';
    case 3:
      return 'Apr';
    case 4:
      return 'May';
    case 5:
      return 'Jun';
    case 6:
      return 'Jul';
    case 7:
      return 'Aug';
    case 8:
      return 'Sep';
    case 9:
      return 'Oct';
    case 10:
      return 'Nov';
    case 11:
      return 'Dec';
  }
};