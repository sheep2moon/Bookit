import {
  addMonths,
  eachDayOfInterval,
  format,
  getDay,
  getDayOfYear,
  getDaysInMonth,
  getMonth,
  isSameMonth,
  isToday,
  lastDayOfMonth,
  startOfMonth,
  subMonths,
} from "date-fns";
import React, { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";

const monthNames = [
  "Styczeń",
  "Luty",
  "Marzec",
  "Kwiecień",
  "Maj",
  "Czerwiec",
  "Lipiec",
  "Sierpień",
  "Wrzesień",
  "Październik",
  "Listopad",
  "Grudzień",
];

const today = Date.now();
const firstDateOfMonth = startOfMonth(today);

const Calendar = () => {
  const [firstDay, setFirstDay] = useState(firstDateOfMonth);
  const [currentDays, setCurrentDays] = useState(
    eachDayOfInterval({ start: today, end: lastDayOfMonth(today) })
  );

  const handleNextMonth = () => setFirstDay((prev) => addMonths(prev, 1));
  const handlePreviousMonth = () =>
    setFirstDay((prev) => {
      if (isSameMonth(today, prev)) return prev;
      else return subMonths(prev, 1);
    });

  useEffect(() => {
    setCurrentDays(
      eachDayOfInterval({
        start: firstDay,
        end: lastDayOfMonth(firstDay),
      })
    );
  }, [firstDay]);

  return (
    <div className="flex flex-col rounded-lg bg-secondary p-2 shadow-md shadow-black/40">
      <div className="mb-2 grid w-full grid-cols-3 rounded-md bg-secondary text-light">
        <button
          onClick={handlePreviousMonth}
          className="flex  items-center justify-center p-4 text-accent"
        >
          <FiArrowLeft className="" />
        </button>
        <p className="flex  items-center justify-center">
          {monthNames[firstDay.getMonth()]}
        </p>
        <button
          onClick={handleNextMonth}
          className="flex  items-center justify-center p-4 text-accent"
        >
          <FiArrowLeft className="rotate-180" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {currentDays.map((day) => {
          return (
            <div
              className="flex aspect-square w-16 cursor-pointer items-center justify-center rounded-md bg-primary/80 p-4 text-light transition-colors hover:bg-primary"
              key={getDayOfYear(day)}
            >
              {day.getDate()}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
