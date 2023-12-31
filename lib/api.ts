import { ItemsRequest, ItemsResponse } from "@/pages/api/items";

export const fetcher = async ({ url, method, body, json = true }: any) => {
  const res = await fetch(url, {
    method,
    body: body && JSON.stringify(body),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("API Error");
  }

  if (json) {
    const data = await res.json();
    return data;
  }
};

export const getItems = async (request: ItemsRequest) => {
  return await fetcher({
    url: "/api/items",
    method: "POST",
    body: request,
  });
};
