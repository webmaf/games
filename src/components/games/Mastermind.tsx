import { Container, Stack } from "@mui/material";
import ColorPanel from "./mastermind/ColorPanel";
import GameBoard from "./mastermind/GameBoard";
import SubmitPanel from "./mastermind/SubmitPanel";

import type { CheckCodeType } from "./mastermind/types";

export default function Mastermind() {
  const masterCode: string[] = ["green", "yellow", "green", "red"];

  const handleCheckCode: CheckCodeType = (colorCombination): void => {
    const results: string[] = [];

    if (colorCombination.length === 4) {
      const copyMasterCode = [...masterCode];
      const copyCombination = [...colorCombination];

      masterCode.map((isColor: string, index: number) => {
        if (colorCombination[index] === isColor) {
          copyCombination[index] = "clear";
          copyMasterCode[index] = "black";

          results.push("black");
        }
      });

      copyCombination
        .filter((color) => color !== "clear")
        .map((color: string) => {
          copyMasterCode.map((isColor: string, index: number) => {
            if (color === isColor) {
              copyMasterCode[index] = "white";

              results.push("white");
            }
          });
        });

      console.log("master", copyMasterCode);
      console.log("combi", copyCombination);
      console.log("result", results);
    }
  };

  return (
    <Container>
      <Stack gap={2}>
        <GameBoard />
        <SubmitPanel checkCode={handleCheckCode} />
        <ColorPanel />
      </Stack>
    </Container>
  );
}
