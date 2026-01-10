import { create } from "zustand";
import { persist } from "zustand/middleware";

const useVideoEditStore = create(
  persist(
    (set) => ({
      trim: null,
      character: null,
      position: null,
      email: null,

      setTrim: (trim) => set({ trim }),
      setCharacter: (character) => set({ character }),
      setPosition: (position) => set({ position }),
      setEmail: (email) => set({ email }),

      reset: () =>
        set({
          trim: null,
          character: null,
          position: null,
          email: null,
        }),
    }),
    {
      name: "video-edit-storage",
      partialize: (state) => ({
        trim: state.trim,
        character: state.character,
        position: state.position,
      }),
    }
  )
);

export default useVideoEditStore;
