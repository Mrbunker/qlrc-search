"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const SearchInput = ({ initKeyword = "" }: { initKeyword: string }) => {
  const [searchText, setSearchText] = useState(initKeyword);
  const router = useRouter();
  return (
    <form
      className="flex items-center space-x-4 mb-4"
      onClick={(e) => {
        e.preventDefault();
        router.push(`/search/${searchText}`);
      }}
    >
      <Input
        type="search"
        name="keyword"
        tabIndex={1}
        autoFocus={!initKeyword}
        defaultValue={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <Button type="submit" tabIndex={2}>
        Search
      </Button>
    </form>
  );
};

export { SearchInput };
