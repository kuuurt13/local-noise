import {
  addDays,
  addWeeks,
  format,
  differenceInSeconds,
  endOfDay
} from 'date-fns';


export function chunkDates(date, size) {
  let dates = [];

  for (let i = 0; i < size; i++) {
    let start;

    if (i === 0) {
      start = new Date(date);
    } else {
      start = addDays(new Date(dates[i - 1].end), 1);
    }

    dates.push({
      start: format(start, 'M/D/YYYY'),
      end: format(addWeeks(start, 1), 'M/D/YYYY')
    });
  }

  return dates;
}

export function secondsTillEndOfDay() {
  return differenceInSeconds(endOfDay(new Date()), new Date());
}
