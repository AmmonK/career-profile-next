import { create } from 'zustand';
import storeStatus from './storeStatus';

const store = (set) => ({
  jobList: [],
  jobStatus: storeStatus.EMPTY,
  setJobList: (data) => {
    set(() => ({
      jobList: data,
      jobStatus: storeStatus.LOADED,
    }));
  },
  setJobStatus: (status) => {
    set(() => ({
      jobStatus: status,
    }));
  },
});

const jobListStore = create(store);

export default jobListStore;
