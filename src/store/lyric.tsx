import { create } from "zustand";

interface LyricState {
  lyric: string;
  tlyric: string;
  setLyric: (lyric: string) => void;
  setTlyric: (tlyric: string) => void;
}

const useLyricStore = create<LyricState>()((set) => ({
  lyric: "",
  tlyric: "",
  setLyric: (lyric) => set(() => ({ lyric })),
  setTlyric: (tlyric) => set(() => ({ tlyric })),
}));

export { useLyricStore };
