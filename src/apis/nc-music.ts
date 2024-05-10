import { baseRequest } from "./base";
import { getKV } from "./kv";

const baseURL = "https://docs-neteasecloudmusicapi.vercel.app";
export interface SearchResult {
  code: number;
  result: {
    hasMore: boolean;
    songCount: number;
    songs: MusicItem[];
  };
}

export interface Artist {
  id: number;
  name: string;
  picUrl?: any;
  alias: any[];
  albumSize: number;
  picId: number;
  fansGroup?: any;
  img1v1Url: string;
  img1v1: number;
  trans?: any;
}

export interface Album {
  id: number;
  name: string;
  artist: Artist;
  publishTime: number;
  size: number;
  copyrightId: number;
  status: number;
  picId: number;
  mark: number;
}

export interface MusicItem {
  id: number;
  name: string;
  artists: Artist[];
  album: Album;
  duration: number;
  copyrightId: number;
  status: number;
  alias: string[];
  rtype: number;
  ftype: number;
  mvid: number;
  fee: number;
  rUrl?: any;
  mark: number;
}

export const searchMusic = (params: {
  keywords: string;
  /**  返回数量 , 默认为 30 */
  limit?: number;
  /**  偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0 */
  offset?: number;
  /**默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合, 2000:声音(搜索声音返回字段格式会不一样) */
  type?: number;
}) => {
  return baseRequest<SearchResult>(`${baseURL}/search`, {
    method: "GET",
    params,
    revalidate: 10,
  });
};

export interface Lrc {
  version: number;
  lyric: string;
}

export interface LyricResult {
  sgc: boolean;
  sfy: boolean;
  qfy: boolean;
  lyricUser: {
    id: number;
    status: number;
    demand: number;
    userid: number;
    nickname: string;
    uptime: number;
  };
  lrc: Lrc;
  klyric?: Lrc;
  tlyric?: Lrc;
  romalrc?: Lrc;
  code: number;
}

export const getLyric = async (params: {
  id: string;
}): Promise<LyricResult> => {
  const fetchLyricFromNC = () =>
    baseRequest<LyricResult>(`${baseURL}/lyric`, {
      method: "GET",
      params,
      revalidate: 10,
    });

  try {
    const cachedLyric = await getKV({ key: `lyric_${params.id}` });
    if (cachedLyric.lrc?.lyric) return cachedLyric;
    return fetchLyricFromNC();
  } catch (error) {
    // console.error("Error fetching lyric:", error);
    return fetchLyricFromNC();
  }
};

interface DetailItem {
  name: string;
  al: { id: string; picUrl: string; name: string };
  ar: { alias: any[]; id: number; name: string; tns: any[] }[];
}
export const getDetail = (params: { ids: string }) => {
  return baseRequest<{
    code: string;
    privileges: any[];
    songs: DetailItem[];
  }>(`${baseURL}/song/detail`, {
    method: "GET",
    params,
  });
};
