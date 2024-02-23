import { SearchInput } from "./[keyword]/components/SearchInput";

const MusicSearch = async () => {
  return (
    <div className={`mt-80 transition-all duration-500`}>
      <SearchInput initKeyword={""} />
    </div>
  );
};

export default MusicSearch;
