import { getLyric } from "@/api/music";
import PageContainer from "../../components/PageContainer";
import LyricView from "./components/LyricView";
import { notFound } from "next/navigation";

const Lyric = async ({ params }: { params: { songmid: string } }) => {
  const { songmid } = params;
  const res = await getLyric({ songmid });

  if (!res.data) {
    notFound();
  }
  const { lyric, tlyric } = res.data;
  return (
    <PageContainer>
      <LyricView lyric={lyric} tlyric={tlyric} />
    </PageContainer>
  );
};
export default Lyric;
