import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const store = persist(
  (set) => ({
    userData: {},
    setUserData: (data) => {
      set(() => ({ userData: data }));
    },
  }),
  { name: 'user-storage', storage: createJSONStorage(() => sessionStorage) }
);

const userStore = create(store);

export default userStore;
