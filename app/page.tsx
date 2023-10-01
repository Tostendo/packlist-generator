"use client";
import {
  List,
  ListItem,
  TextField,
  Typography,
} from "@/node_modules/@mui/material/index";
import { useState } from "react";

const data = {
  items: [
    {
      id: "foodbar",
      name: "foobar",
    },
    {
      id: "baaz",
      name: "baz",
    },
  ],
};

export default function Home() {
  const [values, setValues] = useState<{ [id: string]: number }>({});
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <Typography variant="h4">Packlist</Typography>
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
