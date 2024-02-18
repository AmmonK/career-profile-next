import { create } from 'zustand';

const filterStore = create((set) => ({
  remote: false,
  setRemote: (value) => set({ remote: value }),
  skills: false,
  setSkills: (value) => set({ skills: value }),
  jobLevel: 'All levels',
  setJobLevel: (value) => set({ jobLevel: value }),
}));

export default filterStore;
