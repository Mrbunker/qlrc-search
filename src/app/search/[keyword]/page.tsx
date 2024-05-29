import { searchMusic } from "@/apis/nc-music";
import { SearchInput } from "./components/SearchInput";
import { Item } from "./components/Item";

const SEARCH_TYEP = 1;

const MusicSearch = async ({ params }: { params: { keyword: string } }) => {
  const keyword = decodeURIComponent(params.keyword);
  // await new Promise((resolve) => setTimeout(resolve, 90000));
  const res = await searchMusic({ keywords: keyword, type: SEARCH_TYEP });

  return (
    <div className={`mt-8 transition-all duration-500`}>
      <SearchInput initKeyword={keyword} />
      <div className="grid gap-4">
        {res.result?.songs.map((item, index) => (
          <Item index={index} key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default MusicSearch;
