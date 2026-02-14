import { create } from "zustand";
import { persist } from "zustand/middleware";

interface VideoEditState {
  trim: [number, number];
  character: string | undefined;
  position: string | undefined;
  email: string;

  setTrim: (trim: [number, number]) => void;
  setCharacter: (character: string) => void;
  setPosition: (position: string) => void;
  setEmail: (email: string) => void;
  reset: () => void;
}

const useVideoEditStore = create<VideoEditState>()(
  persist(
    (set) => ({
      trim: [0, 0],
      character: undefined,
      position: undefined,
      email: "",

      setTrim: (trim) => set({ trim }),
      setCharacter: (character) => set({ character }),
      setPosition: (position) => set({ position }),
      setEmail: (email) => set({ email }),

      reset: () =>
        set({
          trim: [0, 0],
          character: undefined,
          position: undefined,
          email: "",
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
