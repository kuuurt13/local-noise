import {
  addDays,
  addWeeks,
  format,
  differenceInSeconds,
  endOfDay,
  lastDayOfWeek
} from 'date-fns';


export function chunkDates(date, size, offset = 1) {
  let dates = [];

  date = getOffsetDate(date, size, offset);

  for (let i = 0; i < size; i++) {
    let start = new Date(date);
    let end;

    if (i > 0) {
      start = addDays(new Date(dates[i - 1].end), 1);
    }

    end = lastDayOfWeek(start, { weekStartsOn: 1 });

    dates.push({
      start: format(start, 'M/D/YYYY'),
      end: format(end, 'M/D/YYYY'),
      title: `${format(start, 'MMM D')} - ${format(end, 'MMM D')}`
    });
  }

  return dates;
}

export function secondsTillEndOfDay() {
  return differenceInSeconds(endOfDay(new Date()), new Date());
}

function getOffsetDate(date, size, offset) {
  let weeks = (size - 1);
  offset--;

  if (offset) {
    date = lastDayOfWeek(date, { weekStartsOn: 1 });
    date = addDays(date, 1);

    if (offset > 1) {
      offset--;
      weeks += (size * offset);
    }

    date = addWeeks(date, weeks);
  }
  return date;
}
