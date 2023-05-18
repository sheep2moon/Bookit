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

  //   useEffect(() => {
  //     console.log(currentDays);
  //     addMo;
  //   }, [currentDays]);

  return (
    <div className="flex flex-col">
      <div className="flex w-full">
        <button onClick={handlePreviousMonth} className="grow bg-slate-200 p-2">
          {"<"}
        </button>
        <p className="flex grow items-center justify-center">
          {monthNames[firstDay.getMonth()]}
        </p>
        <button onClick={handleNextMonth} className="grow bg-slate-200 p-2">
          {">"}
        </button>
      </div>
      <div className="grid grid-cols-7">
        {currentDays.map((day) => {
          return (
            <div className="bg-lime-200 p-2" key={getDayOfYear(day)}>
              {day.getDate()}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
