import type { NextApiRequest, NextApiResponse } from "next";

type Item = {
  id: string;
  name: string;
};

type ItemsResponse = {
  items: [Item];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ItemsResponse>
) {
  res.status(200).json({
    items: [
      {
        id: "trousers",
        name: "Hosen",
      },
      {
        id: "t_shirts",
        name: "T-Shirts",
      },
    ],
  });
}
