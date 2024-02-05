"use client";
import { useState } from "react";
import { formatLrc } from "@/lib/music";
import { useLyricStore } from "@/store/lyric";
import { LabelSwitch } from "@/components/ui/labelSwtich";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const LyricView = () => {
  const [tranlationMode, setTranslationMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const { setTlyric, setLyric, lyric, tlyric } = useLyricStore(
    (state) => state
  );
  if (!lyric) {
    return "暂无歌词";
  }
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
          <form>
            <Textarea
              className="h-96"
              name={tranlationMode ? "tlyric" : "lyric"}
              value={tranlationMode ? tlyric : lyric}
              onChange={(e) => {
                tranlationMode
                  ? setTlyric(e.target.value)
                  : setLyric(e.target.value);
              }}
            />
            {/* <Button className="mt-4" type="submit" onClick={() => {}}>
              提交编辑
            </Button> */}
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
