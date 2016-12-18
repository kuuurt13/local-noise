export function chunkDates(date, size) {
  let dates = [];

  for (let i = 0; i < size; i++) {
    let start;

    if (i === 0) {
      start = Date.parse(date);
    } else {
      start = Date.parse(dates[i - 1].end).addDays(1);
    }

    dates.push({
      start: start.toString('M/d/yyyy'),
      end: start.addWeeks(1).toString('M/d/yyyy')
    });
  }

  return dates;
}
