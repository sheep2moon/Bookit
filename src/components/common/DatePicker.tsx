import React from "react";

type DatePickerProps = {
  selectedDate: Date;
  setSelectedDate: (d: Date) => void;
};

const DatePicker = ({ selectedDate, setSelectedDate }: DatePickerProps) => {
  return <div>DatePicker</div>;
};

export default DatePicker;
