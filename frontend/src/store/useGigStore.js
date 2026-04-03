import { create } from 'zustand';

export const useGigStore = create((set) => ({
  savedGigs: [],
  
  saveGig: (gigId) => set((state) => ({
    savedGigs: [...state.savedGigs, gigId]
  })),
  
  unsaveGig: (gigId) => set((state) => ({
    savedGigs: state.savedGigs.filter(id => id !== gigId)
  })),
  
  isSaved: (gigId) => (state) => state.savedGigs.includes(gigId),
}));