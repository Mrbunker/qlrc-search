"use client";
import { LyricResult, getLyric } from "@/api/music";
import PageContainer from "../../components/PageContainer";
import LyricView from "../../components/LyricView";
import { useEffect, useState } from "react";

const Lyric = ({ params }: { params: { songmid: string } }) => {
  const { songmid } = params;
  const [data, setData] = useState<LyricResult>();
  const fetchLyric = async (songmid: string) => {
    const res = await getLyric({ songmid });
    setData(res.data);
  };
  useEffect(() => {
    fetchLyric(songmid);
  }, [songmid]);

  const { lyric, tlyric } = data || {};
  return (
    <PageContainer>
      <LyricView lyric={lyric} tlyric={tlyric} />
    </PageContainer>
  );
};
export default Lyric;
