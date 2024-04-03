import { create } from "zustand";

export const useDateStore = create((set) => ({
  selectedDate: new Date(),
  setSelectedDate: (date) => set({ selectedDate: date }),
  days: 1,
  setDays: (days) => set({ days }),
}));
