import { create } from 'zustand';

const filterStore = create((set) => ({
  remote: false,
  setRemote: (value) => set({ remote: value }),
  fulltime: true,
  setFulltime: (value) => set({ fulltime: value }),
}));

export default filterStore;
