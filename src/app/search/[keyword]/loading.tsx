import { SearchInput } from "./components/SearchInput";

const Loading = async () => {
  return (
    <div className={`mt-8 transition-all duration-500`}>
      <SearchInput initKeyword="loading" />
      <div className="grid gap-4">loading...</div>
    </div>
  );
};

export default Loading;
