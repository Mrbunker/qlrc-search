"use client";
import { MusicItem, searchMusic } from "../../api/music";
import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Porps = {};

const MusicSearch = ({}: Porps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [searchRes, setSearchRes] = useState<MusicItem[]>([]);
  const [loading, setLoading] = useState(false);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const submitSearch = async (keyword: string) => {
    if (!keyword) {
      return;
    }
    setLoading(true);
    const res = await searchMusic({ keyword });
    if (res.data && res.data.list.length > 0) {
      setSearchRes(res.data.list);
    }
    setLoading(false);
    return res;
  };

  useEffect(() => {
    const keyword = searchParams.get("search") || "";
    if (keyword) {
      submitSearch(keyword);
    }
  }, [searchParams]);

  const marginTop = searchRes.length > 0 || loading ? `mt-8` : `mt-80`;
  return (
    <form
      className={`${marginTop} transition-all duration-500`}
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const keyword = formData.get("keyword") as string;
        router.push(pathname + "?" + createQueryString("search", keyword));
      }}
    >
      <div className="flex items-center space-x-4 mb-4">
        <Input
          autoFocus={!searchParams.get("search")}
          name="keyword"
          tabIndex={1}
          defaultValue={searchParams.get("search") || undefined}
        />
        <Button type="submit" tabIndex={2}>
          Search
        </Button>
      </div>
      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : (
        searchRes.map((item, index) => (
          <div
            key={item.songmid}
            className="p-2 mb-2 border rounded cursor-pointer hover:bg-accent"
            tabIndex={3 + index}
            onClick={() => {
              router.push(`/lyric/${item.songmid}`);
            }}
          >
            <p className=" text-primary">{item.songname}</p>
            <p className=" text-muted-foreground">
              {item.singer.map((s) => s.name).join(", ")}
            </p>
          </div>
        ))
      )}
    </form>
  );
};

export default MusicSearch;
