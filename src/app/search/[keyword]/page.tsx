import { searchMusic } from "../../../api/music";
import { SearchInput } from "./components/SearchInput";
import { Item } from "./components/Item";

const MusicSearch = async ({ params }: { params: { keyword: string } }) => {
  const keyword = decodeURIComponent(params.keyword);

  // await new Promise((resolve) => setTimeout(resolve, 90000));
  const res = await searchMusic({ keyword });

  return (
    <div className={`mt-8 transition-all duration-500`}>
      <SearchInput initKeyword={keyword} />
      <div className="grid gap-4">
        {res.data?.list.map((item, index) => (
          <Item index={index} key={item.songmid} item={item} />
        ))}
      </div>
    </div>
  );
};

export default MusicSearch;
