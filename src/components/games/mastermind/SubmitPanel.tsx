import { Button, Paper, Stack, IconButton } from "@mui/material";
import { useState } from "react";
import type { SubmitPanelProps } from "./types";

export default function SubmitPanel({ checkCode }: SubmitPanelProps) {
  const colors = ["red", "green", "blue", "yellow", "pink", "brown"];
  const [colorCombination, setColorCombination] = useState<string[]>([]);

  const handleSelectColor = (color: string) => {
    console.log(1, color);
    setColorCombination((prevColorsRow) => {
      return [...prevColorsRow, color];
    });
  };

  const handleRemoveColor = (index: number) => {
    console.log(1, index);
    setColorCombination((prevColorsRow) => {
      const newColorsRow = [...prevColorsRow];
      newColorsRow.splice(index, 1);

      return newColorsRow;
    });
  };

  return (
    <div>
      <Stack gap={2} direction={"row"}>
        {colorCombination.map((color, index) => {
          return (
            <Paper
              key={index}
              onClick={() => handleRemoveColor(index)}
              elevation={6}
              sx={{
                border: "1px solid gray",
                borderRadius: 2,
                backgroundColor: color,
                width: "24px",
                height: "24px",
              }}
            ></Paper>
          );
        })}

        <Button
          variant="contained"
          onClick={() => checkCode(colorCombination)}
          disabled={Boolean(
            colorCombination.length && colorCombination.length < 4
          )}
        >
          check
        </Button>
      </Stack>
      <hr />
      <Stack gap={2} direction={"row"}>
        {colors.map((color, index) => {
          return (
            <IconButton
              key={index}
              disabled={Boolean(
                colorCombination.length && colorCombination.length > 3
              )}
              onClick={() => handleSelectColor(color)}
              sx={{
                border: "1px solid gray",
                borderRadius: 12,
                backgroundColor: color,
                width: "24px",
                height: "24px",
              }}
            ></IconButton>
          );
        })}
      </Stack>
    </div>
  );
}
