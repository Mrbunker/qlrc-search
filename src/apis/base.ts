// type ResponseData<D> = {
//   errmsg: { code: string } | "";
//   errno: number;
//   data: D;
// };

export const baseRequest = async <D>(
  apiUrl: string,
  {
    method = "GET",
    params,
    revalidate,
  }: {
    method?: "GET" | "POST";
    params?: Record<string, any>;
    revalidate?: NextFetchRequestConfig["revalidate"];
  }
) => {
  let fullUrl = apiUrl;

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

    const data: D = await response.json();
    return data;
  } catch (error) {
    console.error("Request error:", error);
    throw error;
  }
};
