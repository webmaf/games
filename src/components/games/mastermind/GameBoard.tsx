import { Paper, Stack, Grid } from "@mui/material";
import { backgroundLinearGradient } from "./utils";
import type { GameBoardProps } from "./types";

export default function GameBoard({ userCombinations }: GameBoardProps) {
  return (
    <>
      {userCombinations.map((combo, index) => {
        return (
          <Grid container key={index}>
            <Grid size={9} direction="row">
              <Stack gap={2} direction={"row"}>
                {[...combo.prediction].map((combo, index1) => (
                  <Paper
                    key={index1}
                    elevation={6}
                    sx={{
                      border: "1px solid gray",
                      borderRadius: 2,
                      background: backgroundLinearGradient(combo),
                      width: "40px",
                      height: "40px",
                    }}
                  ></Paper>
                ))}
              </Stack>
            </Grid>
            <Grid size={3}>
              <Grid
                container
                spacing={0.5}
                columns={2}
                sx={{
                  width: "40px",
                  height: "40px",
                }}
              >
                {[...combo.result].map((color, index1) => (
                  <Grid key={index1} size={1}>
                    <Paper
                      elevation={6}
                      sx={{
                        border: "1px solid gray",
                        borderRadius: 6,
                        backgroundColor: color,
                        width: "6px",
                        height: "6px",
                      }}
                    ></Paper>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        );
      })}
    </>
  );
}
