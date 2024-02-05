import { getLyric } from "@/api/music";
import { notFound } from "next/navigation";
import LyricView from "../../components/LyricView";
import PageContainer from "../../components/PageContainer";

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
