import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { UserInfo } from '../types/auth';

interface AuthState {
  user: UserInfo | null;
  setUser: (user: UserInfo) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null, 

      setUser: (user) => set({ user }),
      
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user', 
      storage: createJSONStorage(() => localStorage), 
    }
  )
);