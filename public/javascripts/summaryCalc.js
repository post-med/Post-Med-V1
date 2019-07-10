// const moment = require("moment");

var dates = [
  "2019-06-11 09:07:21",
  "2019-06-13 10:03:51",
  "2019-06-26 02:07:02",
  "2019-06-01 08:02:45",
  "2019-06-06 01:02:32",
  "2019-06-28 22:13:21",
  "2019-06-05 09:07:21",
  "2019-06-16 04:02:29",
  "2019-06-12 14:01:42",
  "2019-06-09 01:16:29"
];

var groups = dates.reduce(function(acc, date) {
  var yearWeek = moment(date).year() + "-" + moment(date).week();

  // check if the week number exists
  if (typeof acc[yearWeek] === "undefined") {
    acc[yearWeek] = [];
  }

  acc[yearWeek].push(date);

  return acc;
}, {});

// console.log(groups);
// let today = new Date();
// let test = moment(today);
// let calc = test.week();
// console.log(calc);
// console.log(5);

var a = moment(today);
var b = a.add(4, "week");
a.format();
console.log(a);
