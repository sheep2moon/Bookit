import clsx from "clsx";
import React, { useState } from "react";
import { api } from "~/utils/api";

const weekDays = [
  "Poniedziałek",
  "Wtorek",
  "Środa",
  "Czwartek",
  "Piątek",
  "Sobota",
  "Niedziela",
];

const AddSlots = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedWeekDays, setSelectedWeekDays] = useState<Array<number>>([]);
  const { mutate: addSlot } = api.service.addFreeSlot.useMutation();

  const handleAddSlot = () => {
    if (selectedDate) addSlot({ date: selectedDate });
  };

  const handleSelectWeekDay = (dayIndex: number) => {
    setSelectedWeekDays((prev) => {
      const newArr = [...prev];
      const existIndex = newArr.indexOf(dayIndex);

      if (existIndex >= 0) {
        newArr.splice(existIndex, 1);
      } else {
        newArr.push(dayIndex);
      }
      return newArr;
    });
  };

  return (
    <div className="bg-primary">
      <h2>Autouzupełnianie wolnych terminów</h2>
      <p>Wybierz dni tygodnia</p>
      {weekDays.map((day, dayIndex) => (
        <div
          className={clsx("bg-primary", {
            "bg-secondary": selectedWeekDays.includes(dayIndex),
          })}
          key={day}
          onClick={() => handleSelectWeekDay(dayIndex)}
        >
          {day}
        </div>
      ))}
    </div>
  );
};

export default AddSlots;
