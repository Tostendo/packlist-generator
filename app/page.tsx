"use client";
import { getItems } from "@/lib/api";
import {
  List,
  ListItem,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@/node_modules/@mui/material/index";
import { ItemsResponse, WeatherType } from "@/pages/api/items";
import { useEffect, useState } from "react";

type PacklisteState = {
  [id: string]: number;
};

export default function Packlist() {
  const [values, setValues] = useState<PacklisteState>({});
  const [data, setData] = useState<ItemsResponse>({ items: [] });
  const [days, setDays] = useState<number>(0);
  const [weatherType, setWeatherType] = useState(WeatherType.normal);
  useEffect(() => {
    getItems({ days: days, weatherType: weatherType }).then((data) => {
      let tmp: PacklisteState = {};
      data.items.forEach((item: any) => {
        tmp[item.id] = item.defaultValue;
      });
      setValues(tmp);
      setData(data);
    });
  }, [days, weatherType]);

  const handleWeatherDataChange = (event: any) => {
    setWeatherType(event.target.value);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <Typography className="p-6" variant="h4">
        Packlist
      </Typography>
      <Typography className="p-4" variant="h5">
        {" "}
        Wie viele Tage verreist du?
      </Typography>
      <TextField
        type="number"
        variant="standard"
        onChange={(e: any) => setDays(e.target.value)}
      />
      <Typography className="p-4" variant="h5">
        Wie ist das Wetter?
      </Typography>
      <Select
        id="weather-type-select"
        value={weatherType}
        label="Weather Type"
        onChange={handleWeatherDataChange}
      >
        <MenuItem value={WeatherType.cold}>Kalt</MenuItem>
        <MenuItem value={WeatherType.normal}>Normal</MenuItem>
        <MenuItem value={WeatherType.warm}>Warm</MenuItem>
      </Select>
      <List dense className="w-60">
        {data.items.map((item) => {
          return (
            <ListItem key={item.id} className="p-1 flex justify-between">
              <>
                {item.name}
                <TextField
                  className="w-10 text-center"
                  value={values[item.id] ?? 0}
                  onChange={(e: any) => {
                    setValues({ ...values, [item.id]: e.target.value });
                  }}
                  type="number"
                  variant="standard"
                />
              </>
            </ListItem>
          );
        })}
      </List>
    </main>
  );
}
