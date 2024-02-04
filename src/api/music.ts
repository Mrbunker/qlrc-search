import { request } from "./base";

export interface SearchResult {
  list: MusicItem[];
  /** 总数 */
  total: number;
}

export interface MusicItem {
  /** 专辑图片 */
  albumcover: string;
  /** 专辑描述 */
  albumdesc: string;
  /** 专辑名称 */
  albumname: string;
  /** 是否免费 */
  free: boolean;
  /** 歌曲时长 */
  interval: number;
  /** 歌手 */
  singer: {
    id: number;
    /** 歌手名称 */
    name: string;
  }[];
  /** 歌曲mid */
  songmid: string;
  /** 歌曲名称 */
  songname: string;
}

export const searchMusic = (params: {
  keyword: string;
  page?: number;
  pageSize?: number;
}) => {
  return request<SearchResult>({
    apiPath: "/search",
    method: "GET",
    params: params,
    revalidate: 10,
  });
};

export interface LyricResult {
  lyric: string;
  tlyric?: string;
}

export const getLyric = (params: { songmid: string }) => {
  return request<LyricResult>({
    apiPath: "/lyric",
    method: "GET",
    params: params,
    revalidate: 10,
  });
};
