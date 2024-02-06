"use client";
import { useCallback, useEffect } from "react";
import { getLyric } from "@/api/music";
import { useLyricStore } from "@/store/lyric";
import LyricView from "@/app/components/LyricView";

const Lyric = ({ params }: { params: { songmid: string } }) => {
  const { songmid } = params;
  const setTlyric = useLyricStore(({ setTlyric }) => setTlyric);
  const setLyric = useLyricStore(({ setLyric }) => setLyric);

  const fetchLyric = useCallback(async () => {
    const res = await getLyric({ songmid });
    setTlyric(res.data?.tlyric || "");
    setLyric(res.data?.lyric || "");
  }, [setTlyric, setLyric, songmid]);

  useEffect(() => {
    fetchLyric();
  }, [fetchLyric]);

  return <LyricView />;
};
export default Lyric;
