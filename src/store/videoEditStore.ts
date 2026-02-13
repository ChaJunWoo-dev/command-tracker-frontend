import { create } from "zustand";
import { persist } from "zustand/middleware";

interface VideoEditState {
  trim: [number, number] | null;
  character: string | null;
  position: string | null;
  email: string | null;

  setTrim: (trim: [number, number]) => void;
  setCharacter: (character: string) => void;
  setPosition: (position: string) => void;
  setEmail: (email: string) => void;
  reset: () => void;
}

const useVideoEditStore = create<VideoEditState>()(
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
