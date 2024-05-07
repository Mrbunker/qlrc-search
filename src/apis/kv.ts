import { baseRequest } from "./base";
import { LyricResult } from "./nc-music";

type KV_Response = {
  code: string;
  error?: string;
};

export const setKV = (params: { key: string; value: any }) => {
  return baseRequest<KV_Response>("/kv/set", {
    method: "POST",
    params,
  });
};

export const getKV = ({ key }: { key: string }) => {
  return baseRequest<LyricResult>("/kv/get", {
    method: "GET",
    params: { key },
    // revalidate: 10,
  });
};

export const delKV = ({ songmid }: { songmid: string }) => {
  return baseRequest<LyricResult>("/kv/del", {
    method: "GET",
    params: { key: `lyric_${songmid}` },
    // revalidate: 10,
  });
};
