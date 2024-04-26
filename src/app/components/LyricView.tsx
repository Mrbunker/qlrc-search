"use client";
import { MouseEvent, useState } from "react";
import useSWR from "swr";
import { formatLrc } from "@/lib/music";
import { LabelSwitch } from "@/components/ui/labelSwtich";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { usePathname } from "next/navigation";
import { setKV } from "@/apis/kv";
import { getLyric } from "@/apis/music";

const LyricView = () => {
  const [tranlationMode, setTranslationMode] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const songmid = usePathname().replace("/lyric/", "");

  const { data: res, isLoading, error, mutate } = useSWR({ songmid }, getLyric);
  if (isLoading) {
    return <div>loading...</div>;
  }
  if (error || !res) {
    return <div>暂无歌词</div>;
  }
  const { lyric, tlyric } = res.data;

  const handleSave = async (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const lyric = formData.get("lyric") as string;
    const tlyric = formData.get("tlyric") as string;
    await setKV({ key: `lyric_${songmid}`, value: { lyric, tlyric } });
    mutate({ ...res, data: { lyric, tlyric } });
    setEditMode(false);
  };

  const { title, artist, album, lyricText } = formatLrc(lyric);
  const tlyricText = tlyric ? formatLrc(tlyric).lyricText : "";

  return (
    <div className="mt-4">
      <div>
        <p className="text-lg font-bold">
          {title}-{artist}
        </p>
        <p className="text-gray-500">{album}</p>
      </div>
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
            {
              <Button className="mt-4" type="submit">
                提交编辑
              </Button>
            }
          </form>
        ) : (
          <div className="whitespace-pre-line">
            {tranlationMode ? tlyricText : lyricText}
          </div>
        )}
      </div>
    </div>
  );
};

export default LyricView;
