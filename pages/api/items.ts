import type { NextApiRequest, NextApiResponse } from "next";

const DEFAULT_VALUE = 1;

const byDay = ["t_shirts", "socks", "boxers"];

const getByDays = (days: number) => {
  return Math.min(DEFAULT_VALUE * days, 8);
};

const getBy3Days = (days: number) => {
  return Math.min(Math.floor(days / 3) + 1, 3);
};

const all: { [key: string]: any } = {
  t_shirts: {
    name: "T-Shirts",
    defaultValue: DEFAULT_VALUE,
  },
  socks: {
    name: "Socken",
    defaultValue: DEFAULT_VALUE,
  },
  boxers: {
    name: "Boxer-Shorts",
    defaultValue: DEFAULT_VALUE,
  },
  sleep_shirts: {
    name: "Schlaf-Shirts",
    defaultValue: DEFAULT_VALUE,
    calculateFct: getBy3Days,
  },
  short_pants: {
    name: "kurze Hosen",
    defaultValue: DEFAULT_VALUE,
    calculateFct: getBy3Days,
  },
  long_pants: {
    name: "lange Hosen",
    defaultValue: DEFAULT_VALUE,
    calculateFct: getBy3Days,
  },
  jogger_pants: {
    name: "Jogginghosen",
    defaultValue: DEFAULT_VALUE,
    calculateFct: () => 1,
  },
  sports_pants: {
    name: "Sporthosen",
    defaultValue: DEFAULT_VALUE,
    calculateFct: getBy3Days,
  },
  sport_shirts: {
    name: "Sport-Shirts",
    defaultValue: DEFAULT_VALUE,
  },
  sweaters: {
    name: "Pullis",
    defaultValue: DEFAULT_VALUE,
  },
  sweater_jackets: {
    name: "Strickjacken",
    defaultValue: DEFAULT_VALUE,
  },
  towels: {
    name: "Handtücher",
    defaultValue: DEFAULT_VALUE,
  },
  beach_towels: {
    name: "Strandtücher",
    defaultValue: DEFAULT_VALUE,
  },
  shoes: {
    name: "Schuhe",
    defaultValue: DEFAULT_VALUE,
  },
  flipflops: {
    name: "Flip-Flops",
    defaultValue: DEFAULT_VALUE,
  },
  jackets: {
    name: "Jacken",
    defaultValue: DEFAULT_VALUE,
  },
};

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
      items: Object.keys(all).map((key) => {
        return {
          id: key,
          ...all[key],
          defaultValue: all[key].calculateFct
            ? all[key].calculateFct(body.days)
            : getByDays(body.days),
        };
      }),
    });
  } else {
    throw Error("Unimplemented");
  }
}
