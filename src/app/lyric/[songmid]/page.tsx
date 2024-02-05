"use client";
import { getLyric } from "@/api/music";
import PageContainer from "../../components/PageContainer";
import LyricView from "../../components/LyricView";
import { useCallback, useEffect } from "react";
import { useLyricStore } from "@/store/lyric";

const Lyric = ({ params }: { params: { songmid: string } }) => {
  const { songmid } = params;
  const setTlyric = useLyricStore(({ setTlyric }) => setTlyric);
  const setLyric = useLyricStore(({ setLyric }) => setLyric);

  const fetchLyric = useCallback(
    async (songmid: string) => {
      const res = await getLyric({ songmid });
      setTlyric(res.data?.tlyric || "");
      setLyric(res.data?.lyric || "");
    },
    [setTlyric, setLyric]
  );
  useEffect(() => {
    fetchLyric(songmid);
  }, [songmid, fetchLyric]);

  return (
    <PageContainer>
      <LyricView />
    </PageContainer>
  );
};
export default Lyric;
