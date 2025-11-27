import { Button, Paper, Stack, IconButton, Grid } from "@mui/material";

import { useState } from "react";
import { backgroundRadialGradient, backgroundLinearGradient } from "./utils";
import type { SubmitPanelProps } from "./types";

export default function SubmitPanel({ checkCode, colors }: SubmitPanelProps) {
  // const colors = ["red", "green", "blue", "yellow", "pink", "brown"];
  const [colorCombination, setColorCombination] = useState<string[]>([]);

  const handleSelectColor = (color: string) => {
    setColorCombination((prevColorsRow) => {
      return [...prevColorsRow, color];
    });
  };

  const handleRemoveColor = (index: number) => {
    setColorCombination((prevColorsRow) => {
      const newColorsRow = [...prevColorsRow];
      newColorsRow.splice(index, 1);

      return newColorsRow;
    });
  };

  const handleSubmitPrediction = () => {
    checkCode(colorCombination);
    reset();
  };

  const reset = () => {
    setColorCombination([]);
  };

  return (
    <Grid container>
      <Grid size={9}>
        <Stack spacing={2} direction="row">
          {colorCombination.map((color, index) => {
            console.log(color)
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
        </Stack>
      </Grid>
      <Grid size={3}>
        <Button
          onClick={handleSubmitPrediction}
          disabled={Boolean(
            !(colorCombination.length && colorCombination.length == 4)
          )}
        >
          check
        </Button>
      </Grid>
      <Grid size={9}>
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
                  borderRadius: 12,
                  backgroundColor: color,
                  width: "24px",
                  height: "24px",

                  background: backgroundRadialGradient(color),
                  fill: "transparent",
                }}
              >

                <span></span>
              </IconButton>
            );
          })}
        </Stack>
      </Grid>
    </Grid>
  );
}
