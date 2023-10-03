import type { NextApiRequest, NextApiResponse } from "next";

type Item = {
  id: string;
  name: string;
  defaultValue: number;
};

export enum WeatherType {
  warm,
  normal,
  cold,
}

export type ItemsResponse = {
  items: Item[];
};

export type ItemsRequest = {
  days: number;
  weatherType: WeatherType;
};

export default function handler(
  req: NextApiRequest<ItemsRequest>,
  res: NextApiResponse<ItemsResponse>
) {
  if (req.method === "POST") {
    const body: ItemsRequest = req.body;
    return res.status(200).json({
      items: [
        {
          id: "trousers",
          name: "Hosen",
          defaultValue: 2,
        },
        {
          id: "t_shirts",
          name: "T-Shirts",
          defaultValue: body.days * 1,
        },
      ],
    });
  } else {
    throw Error("Unimplemented");
  }
}
