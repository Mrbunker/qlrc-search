import Link from "next/link";
import { MusicItem } from "@/apis/nc-music";

const Item = ({ item, index }: { item: MusicItem; index: number }) => {
  const singers = item.artists.map((s) => s.name).join(", ");
  return (
    <Link
      className="flex items-center gap-4"
      tabIndex={3 + index}
      href={`/lyric/${item.id}#${item.name}`}
    >
      <div className="w-12 h-12 object-cover rounded-lg overflow-hidden">
        <div className="w-full h-full bg-gray-200"></div>
      </div>
      <div className="flex-1">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-sm text-gray-500">
          {singers} - {item.album.name}
        </p>
      </div>
    </Link>
  );
};

export { Item };
