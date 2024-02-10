import { create } from 'zustand';

const jobPostingStore = create((set) => ({
  postings: {},
  setPostings: (value) => {
    // if(typeof value !== 'object' || value === null) throw new Error('Value must be an object');
    if(typeof value == 'string'){
      console.log(value);
      value = JSON.parse(value);
    }
    set({ postings: value })
  }
}));

export default jobPostingStore;
