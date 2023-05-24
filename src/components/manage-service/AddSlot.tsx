import React, { useState } from "react";
import { api } from "~/utils/api";

const AddSlots = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const { mutate: addSlot } = api.service.addFreeSlot.useMutation();

  const handleAddSlot = () => {
    if (selectedDate) addSlot({ date: selectedDate });
  };

  return <div>AddSlots</div>;
};

export default AddSlots;
