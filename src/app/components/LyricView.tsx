"use client";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { formatLrc } from "@/lib/music";

const LyricView = ({ lyric, tlyric }: { lyric?: string; tlyric?: string }) => {
  const [checked, setChecked] = useState(false);
  if (!lyric) {
    return "暂无歌词";
  }
  const { title, artist, album, lyricText } = formatLrc(lyric);
  const tLyricText = tlyric ? formatLrc(tlyric).lyricText : "";
  return (
    <div className="mt-4">
      <div>
        <p className="text-lg font-bold">
          {title}-{artist}
        </p>
        <p className="text-gray-500">{album}</p>
      </div>
      <div className="mt-4 flex items-center space-x-2">
        <Switch
          disabled={!tlyric}
          id="translation"
          checked={checked}
          onCheckedChange={setChecked}
        />
        <Label htmlFor="translation">翻译</Label>
      </div>
      <div className="whitespace-pre-line	mt-4">
        {checked ? tLyricText : lyricText}
      </div>
    </div>
  );
};

export default LyricView;