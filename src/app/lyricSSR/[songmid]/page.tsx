import { getLyric } from "@/apis/music";
import { notFound } from "next/navigation";
import LyricView from "../../components/LyricView";

/** @deprecated */
const Lyric = async ({ params }: { params: { songmid: string } }) => {
  const { songmid } = params;
  const res = await getLyric({ songmid });

  if (!res.data) {
    notFound();
  }
  const { lyric, tlyric } = res.data;
  return "deprecated";
  // return <LyricView lyric={lyric} tlyric={tlyric} />;
};
export default Lyric;
