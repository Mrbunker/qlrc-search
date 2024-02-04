type ResponseData<D> = {
  errmsg: { code: string } | "";
  errno: number;
  data?: D;
};

const baseUrl = `https://api.timelessq.com/music/tencent`;
export const request = async <D>({
  apiPath,
  method = "GET",
  params,
  revalidate,
}: {
  apiPath: string;
  method?: "GET" | "POST";
  params?: Record<string, any>;
  revalidate?: NextFetchRequestConfig["revalidate"];
}) => {
  let fullUrl = baseUrl + apiPath;

  const requestOptions: RequestInit = {
    method,
    next: { revalidate: revalidate },
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (method === "GET" && params) {
    fullUrl += "?" + new URLSearchParams(params).toString();
  }

  if (method === "POST" && params) {
    requestOptions.body = JSON.stringify(params);
  }

  try {
    const response = await fetch(fullUrl, requestOptions);

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const data: ResponseData<D> = await response.json();
    return data;
  } catch (error) {
    console.error("Request error:", error);
    throw error;
  }
};
