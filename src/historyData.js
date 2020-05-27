const moment = require("moment");

export let history = JSON.parse(localStorage.getItem('history') || '[]');
let start = JSON.parse(localStorage.getItem('start') || '0');

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

export function playHistory(sessionValue, time, count) {
  if (time * 1000 === sessionValue * 60000 && count === 0) {
    start = addZero(new Date().getHours()) + ':' + addZero(new Date().getUTCMinutes());
    localStorage.setItem('start', JSON.stringify(start));
  }
}

export function breakHistory(breakValue) {
  history.unshift({
    type: 'Break',
    value: moment(breakValue * 60000).format("mm:ss"),
    length: breakValue,
    start: history[0].end,
    end: addZero(new Date().getHours()) + ':' + addZero(new Date().getUTCMinutes())
  })
  localStorage.setItem('history', JSON.stringify(history))
}

export function sessionHistory(sessionValue, count) {
  history.unshift({
    type: 'Session',
    value: moment(sessionValue * 60000).format("mm:ss"),
    length: sessionValue,
    start: count === 0
      ? start
      : history[0].end,
    end: addZero(new Date().getHours()) + ':' + addZero(new Date().getUTCMinutes())
  })
  localStorage.setItem('history', JSON.stringify(history))
}

export function resetHistory(sessionValue, breakValue, time, mode) {
  if (time * 1000 !== sessionValue * 60000) {
    history.unshift({
      type: mode,
      value: mode === 'Break'
        ? moment(breakValue * 60000 - time * 1000).format("mm:ss")
            : moment( sessionValue * 60000 - time * 1000 ).format( "mm:ss" ),
      length:mode === sessionValue? sessionValue: breakValue,
      start: start,
      end: addZero(new Date().getHours()) + ':' + addZero(new Date().getUTCMinutes())
    })

    localStorage.setItem('history', JSON.stringify(history))
  }
}
