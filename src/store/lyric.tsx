import { create } from "zustand";

interface LyricState {
  lyric: string;
  tlyric: string;
  setLyric: (str: string) => void;
  setTlyric: (str: string) => void;
}

const useLyricStore = create<LyricState>()((set) => ({
  lyric: "",
  tlyric: "",
  setLyric: (str) => set(() => ({ lyric: str })),
  setTlyric: (str) => set(() => ({ tlyric: str })),
}));

export { useLyricStore };
