import Link from "next/link";
import { searchMusic } from "../../../api/music";
import { SearchInput } from "./components/SearchInput";

const MusicSearch = async ({ params }: { params: { keyword: string } }) => {
  const keyword = decodeURIComponent(params.keyword);

  // await new Promise((resolve) => setTimeout(resolve, 90000));
  const res = await searchMusic({ keyword });

  return (
    <div className={`mt-8 transition-all duration-500`}>
      <SearchInput initKeyword={keyword} />
      <div className="grid gap-4">
        {res.data?.list.map((item, index) => (
          <Link
            className="flex items-center gap-4"
            key={item.songmid}
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
                {item.singer.map((s) => s.name).join(", ")} - {item.albumname}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MusicSearch;
