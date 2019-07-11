const moment = require("moment");
// var dates = [
//   "2019-06-11 09:07:21",
//   "2019-06-13 10:03:51",
//   "2019-06-26 02:07:02",
//   "2019-06-01 08:02:45",
//   "2019-06-06 01:02:32",
//   "2019-06-28 22:13:21",
//   "2019-06-05 09:07:21",
//   "2019-06-16 04:02:29",
//   "2019-06-12 14:01:42",
//   "2019-06-09 01:16:29"
// ];
// [
// {
//   id: 1,
//   span: ["1995-12-01", "1996-12-03"],
//   list: [{activity1}, {activity2}]
// }
// ]
const sortDatesByCalendarWeeks = data => {
  // sort received data array by start date (from first to last)
  data.sort(function(a, b) {
    return a.startTime - b.startTime;
  });
  // create empty array to return at last
  const masterArray = [];
  // assigns week number
  let counter = 1;
  // iterate every activity
  data.forEach(activity => {
    // is executed if there are no week objects or time does not fit into any existing week
    if (!masterArray.length || checkAgainst(activity, masterArray)) {
      // moment date calculation
      let mon = moment(activity.startTime)
        .startOf("isoWeek")
        .toDate();
      let sun = moment(activity.startTime)
        .endOf("isoWeek")
        .toDate();
      // creating a week object
      masterArray.push({
        id: counter,
        span: [mon, sun],
        summary: [],
        medication: 0,
        doctorVisits: 0,
        courses: 0,
        work: 0,
        rest: 0,
        list: [activity]
      });
      // increasing counter
      counter++;

      // else call sorting function (it is implicit that there is a fitting week already)
    } else sortActivity(activity, masterArray);
  });
  calcSummary(masterArray);
  return masterArray;
};

// sort activity into existing week activity list array
const sortActivity = (activity, array) => {
  array.forEach((el, index) => {
    if (activity.startTime >= el.span[0] && activity.startTime <= el.span[1]) {
      array[index].list.push(activity);
      return;
    }
  });
};

// return true, if no week is created for this yet (initiates week object creation)
const checkAgainst = (activity, array) => {
  let testArr = [];
  array.forEach(el => {
    if (activity.startTime >= el.span[0] && activity.startTime <= el.span[1]) {
      testArr.push(true);
    }
  });
  return !testArr.includes(true);
};

const calcSummary = master => {
  master.forEach(week => {
    week.list.forEach(activity => {
      if (activity.category === "doctor") {
        let duration = moment
          .duration(moment(activity.endTime).diff(moment(activity.startTime)))
          .asHours();
        week.doctorVisits += duration;
      } else if (activity.category === "medication") {
        let duration = moment
          .duration(moment(activity.endTime).diff(moment(activity.startTime)))
          .asHours();
        week.medication += duration;
      } else if (activity.category === "course") {
        let duration = moment
          .duration(moment(activity.endTime).diff(moment(activity.startTime)))
          .asHours();
        week.courses += duration;
      } else {
        let duration = moment
          .duration(moment(activity.endTime).diff(moment(activity.startTime)))
          .asHours();
        week.work += duration;
      }
    });
    week.rest =
      24 * 7 - week.doctorVisits - week.medication - week.courses - week.work;
    week.summary.push(
      week.medication,
      week.doctorVisits,
      week.courses,
      week.work,
      week.rest
    );
  });
};

// const start = moment(new Date("2019-10-15T05:30:00"));
// const end = moment(new Date("2019-10-15T06:45:10"));
// const duration = moment.duration(end.diff(start)).asHours();
// alert(duration.toFixed(2));

// week.medication = 5;
// week.doctorVisits = 5;
// week.courses = 5;
// week.work = 5;
// week.rest = 5;
// ["medication", "doctor", "course", "work", "rest"]

module.exports = sortDatesByCalendarWeeks;
