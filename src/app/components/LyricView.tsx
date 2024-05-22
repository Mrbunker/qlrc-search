"use client";
import { MouseEvent, useState } from "react";
import useSWR from "swr";
import { formatLrc } from "@/lib/music";
import { LabelSwitch } from "@/components/ui/labelSwtich";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useParams } from "next/navigation";
import { setKV } from "@/apis/kv";
import { getDetail, getLyric } from "@/apis/nc-music";

const LyricView = () => {
  const [tranlationMode, setTranslationMode] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const { songmid: id } = useParams<{ songmid: string }>();

  const {
    data: res,
    isLoading,
    error,
    mutate,
  } = useSWR(`/lyric/${id}`, () => getLyric({ id }));
  if (isLoading) {
    return <div>loading...</div>;
  }
  if (error || !res) {
    return <div>暂无歌词</div>;
  }
  const lyric = res.lrc.lyric;
  const tlyric = res?.tlyric?.lyric || "";

  const handleSave = async (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const lyric = formData.get("lyric") as string;
    const tlyric = formData.get("tlyric") as string;
    await setKV({ key: `lyric_${id}`, value: { lyric, tlyric } });
    const mutateRes = { ...res };
    mutateRes.lrc.lyric = lyric;
    if (mutateRes.tlyric) {
      mutateRes.tlyric.lyric = tlyric;
    }
    mutate(mutateRes);
    setEditMode(false);
  };

  const { lyricText } = formatLrc(lyric);
  const tlyricText = tlyric ? formatLrc(tlyric).lyricText : "";

  return (
    <div className="mt-4">
      <MusicDetail id={id} />
      <div className="mt-4 flex items-center space-x-2">
        <LabelSwitch
          id="translation"
          label="翻译"
          disabled={!tlyric}
          checked={tranlationMode}
          onCheckedChange={setTranslationMode}
        />
        <LabelSwitch
          id="edit"
          label="编辑"
          checked={editMode}
          onCheckedChange={setEditMode}
        />
      </div>
      <div className="my-6">
        {editMode ? (
          <form onSubmit={handleSave}>
            <Textarea
              className="h-96"
              name={tranlationMode ? "tlyric" : "lyric"}
              defaultValue={tranlationMode ? tlyric : lyric}
            />
            <Button className="mt-4" type="submit">
              提交编辑
            </Button>
          </form>
        ) : (
          <div className="whitespace-pre-line">
            {tranlationMode ? tlyricText : lyricText || "暂无歌词"}
          </div>
        )}
      </div>
    </div>
  );
};

const MusicDetail = ({ id }: { id: string }) => {
  const { data, isLoading, error } = useSWR(`/song/detail/${id}`, () =>
    getDetail({ ids: id })
  );

  if (isLoading || error || !data) {
    return <div>loading...</div>;
  }
  const title = data.songs[0].name;
  const artist = data.songs[0].ar.map((a) => a.name).join(" / ");
  const albumName = data.songs[0].al.name;
  return (
    <div>
      <p className="text-lg font-bold">
        {title}-{artist}
      </p>
      <p className="text-gray-500">{albumName}</p>
    </div>
  );
};
export default LyricView;
