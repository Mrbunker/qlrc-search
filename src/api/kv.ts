import { baseRequest } from "./base";

type KV_Response = {
  code: string;
  error?: string;
};

export const setKV = (params: { key: string; value: any }) => {
  return baseRequest<KV_Response>("/api/set_kv", {
    method: "POST",
    params,
  });
};
