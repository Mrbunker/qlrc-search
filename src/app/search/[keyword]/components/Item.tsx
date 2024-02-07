import Link from "next/link";
import { MusicItem } from "@/api/music";

const Item = ({ item, index }: { item: MusicItem; index: number }) => {
  const singers = item.singer.map((s) => s.name).join(", ");
  return (
    <Link
      className="flex items-center gap-4"
      tabIndex={3 + index}
      href={`/lyric/${item.songmid}`}
    >
      <div className="w-12 h-12 object-cover rounded-lg overflow-hidden">
        {item.albumcover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.albumcover}
            alt={item.albumname}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200"></div>
        )}
      </div>
      <div className="flex-1">
        <h3 className="font-semibold">{item.songname}</h3>
        <p className="text-sm text-gray-500">
          {singers} - {item.albumname}
        </p>
      </div>
    </Link>
  );
};

export { Item };
