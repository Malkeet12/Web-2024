import { useState } from "react";
import { motion } from "framer-motion";

import "./index.scss";
import CHART_DATA from "./data";

const Chart = () => {
  const maxValue = CHART_DATA.reduce(
    (acc, item) => (acc > item.ticketCount ? acc : item.ticketCount),
    CHART_DATA[0].ticketCount
  );
  return (
    <div className="chart">
      <div className="x-axis">Departments</div>
      <div className="y-axis">Number of tickets</div>
      {CHART_DATA.map(({ id, name, ticketCount, colour }) => (
        <motion.div
          className="cell"
          key={id}
          initial={{ height: 0 }}
          animate={{
            height: `${(ticketCount / maxValue) * 100}%`,
          }}
          style={{ backgroundColor: colour }}
          exit={{ height: 0 }}
        >
          <div className="tooltip">{name}</div>
        </motion.div>
      ))}
    </div>
  );
};
export const JiraVelocity = () => {
  const [open, setOpen] = useState(true);
  return (
    <div className="chart-container">
      <button onClick={() => setOpen(!open)}>Toggle</button>
      {open && <Chart />}
    </div>
  );
};
