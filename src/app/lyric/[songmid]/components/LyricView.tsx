"use client";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const LyricView = ({ lyric, tlyric }: { lyric: string; tlyric?: string }) => {
  const [checked, setChecked] = useState(false);
  return (
    <div>
      <div className="mt-4 flex items-center space-x-2">
        <Switch
          disabled={!tlyric}
          id="translation"
          checked={checked}
          onCheckedChange={setChecked}
        />
        <Label htmlFor="translation">翻译</Label>
      </div>
      <div className="whitespace-pre-line	mt-4">{checked ? tlyric : lyric}</div>
    </div>
  );
};

export default LyricView;
