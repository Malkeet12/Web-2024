import "./index.scss"
const timeToMinutes = (str) => {
  const [hour, minutes] = str.split(":").map(Number);
  return hour * 60 + minutes;
}
//conflicting meetings
const data = [
  {
    startTime: "00:00",
    endTime: "01:20",
    color: "#f6be23",
    title: "#TeamDevkode",
  },
  {
    startTime: "3:30",
    endTime: "7:30",
    color: "#f6501e",
    title: "#TeamDevkode",
  },
  {
    startTime: "4:30",
    endTime: "8:30",
    color: "#f6501e",
    title: "#TeamDevkode",
  },
  {
    startTime: "6:30",
    endTime: "9:00",
    color: "#f6501e",
    title: "Demo",
  },
  {
    startTime: "11:00",
    endTime: "13:30",
    color: "#029be5",
    title: "#TeamDevkode",
  },
  {
    startTime: "12:00",
    endTime: "13:30",
    color: "#029be5",
    title: "#TeamDevkode",
  },
  {
    startTime: "9:30",
    endTime: "10:30",
    color: "#029be5",
    title: "#TeamDevkode",
  },
  {
    startTime: "16:00",
    endTime: "17:00",
    color: "#029be5",
    title: "#TeamDevkode",
  },
  {
    startTime: "15:00",
    endTime: "17:00",
    color: "#029be5",
    title: "#TeamDevkode",
  },
  {
    startTime: "18:00",
    endTime: "19:00",
    color: "#f6501e",
    title: "#TeamDevkode",
  },
  {
    startTime: "20:30",
    endTime: "22:30",
    color: "#029be5",
    title: "#TeamDevkode",
  },
  {
    startTime: "20:30",
    endTime: "22:30",
    color: "#029be5",
    title: "#TeamDevkode",
  },
]

data.forEach(item => item.count = 0);
// Sort events by startTime to enable easier overlap checking
data.sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));

// Sweep through the sorted events and check for overlaps
for (let i = 0; i < data.length - 1; i++) {
  const currentEvent = data[i];
  const currentEnd = timeToMinutes(currentEvent.endTime);

  for (let j = i + 1; j < data.length; j++) {
    const nextEvent = data[j];
    const nextStart = timeToMinutes(nextEvent.startTime);

    // If the next event starts after the current event ends, stop checking
    if (nextStart >= currentEnd) break;

    // Otherwise, there is an overlap, increment the count for the next event
    nextEvent.count += 1;
  }
}

// Check for overlaps
// data.forEach(item => item.count = 0);

// // Check for overlaps (only increase count for subsequent items)
// for (let i = 0; i < data.length; i++) {
//   const currentEvent = data[i];
//   const currentStart = timeToMinutes(currentEvent.startTime);
//   const currentEnd = timeToMinutes(currentEvent.endTime);

//   for (let j = i + 1; j < data.length; j++) {
//     const nextEvent = data[j];
//     const nextStart = timeToMinutes(nextEvent.startTime);
//     const nextEnd = timeToMinutes(nextEvent.endTime);

//     // Check if the two events overlap
//     if (
//       (currentStart < nextEnd && currentEnd > nextStart) // Overlap condition
//     ) {
//       nextEvent.count += 1; // Only increment count for the next event
//     }
//   }
// }
// console.log({ data })
//non conflicting
// const data = [
//   {
//     startTime: "00:00",
//     endTime: "02:00",
//     color: "#f6be23",
//     title: "#TeamDevkode",
//   },
//   {
//     startTime: "4:30",
//     endTime: "7:30",
//     color: "#f6501e",
//     title: "#TeamDevkode",
//   },
//   {
//     startTime: "12:00",
//     endTime: "13:30",
//     color: "#029be5",
//     title: "#TeamDevkode",
//   },
//   {
//     startTime: "9:00",
//     endTime: "10:00",
//     color: "#029be5",
//     title: "#TeamDevkode",
//   },
//   {
//     startTime: "16:00",
//     endTime: "19:00",
//     color: "#029be5",
//     title: "#TeamDevkode",
//   },
//   {
//     startTime: "20:30",
//     endTime: "22:30",
//     color: "#029be5",
//     title: "#TeamDevkode",
//   },
// ]



const arr = new Array(24).fill().map((_, index) => {
  let suffix = "AM"
  if (index >= 12) suffix = "PM"
  if (index == 0) return "12:00AM"
  if (index == 12) return "12:00PM"
  return `${index % 12}:00${suffix}`
})

export const Calendar = () => {

  return (
    <div>
      {arr.map((time, index) => {
        return (
          <section key={time + index} className="row">
            <div className="time">{time}</div>
            <div className="block">
            </div>
          </section>)
      })}
      <div className="meetings">
        {data.map(({ startTime, endTime, title, color, count }) => (
          <div key={startTime + endTime}
            style={{ backgroundColor: color, left: `calc(-2px + ${count * 10 + "%"})`, top: 28 + timeToMinutes(startTime) + "px", height: (timeToMinutes(endTime) - timeToMinutes(startTime)) + "px", width: `calc(100% - 98px - ${count * 10 + "%"}` }}
            className={`meeting ${count > 0 ? "overlap" : ""}`}>
            <div className="content">
              <div>{title}</div>
              <div>{startTime}-{endTime}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
