import { Container, Divider, Stack, Dialog, DialogContent, DialogTitle, Button } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./mastermind/utils";
import SettingsIcon from "@mui/icons-material/Settings";


import { useState } from "react";
import type {
  Settings,
  CheckCodeType,
  UserCombinations,
  ChangeSettingsType,
} from "./mastermind/types";

import GameBoard from "./mastermind/GameBoard";
import SubmitPanel from "./mastermind/SubmitPanel";
import OptionPanel from "./mastermind/OptionPanel";

import "./mastermind/mastermind.css";

export default function Mastermind() {
  const COLORCODES = [
    "#E53935",
    "#1E88E5",
    "#FDD835",
    "#43A047",
    "#8E24AA",
    "#FB8C00",
  ];

  const generateMasterCode = (
    amount: number = 4,
    colors: string[]
  ): string[] => {
    const combination = [];
    for (let i = 0; i < amount; i++) {
      combination.push(colors[Math.floor(Math.random() * amount)]);
    }
    return combination;
  };

  const [userCombinations, setUserCombinations] = useState<UserCombinations>(
    []
  );
  const [settings, setSettings] = useState<Settings>(() => ({
    masterCode: generateMasterCode(4, COLORCODES),
    amount: 4,
    colorCodes: COLORCODES,
    name: '',
  }));
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleCheckCode: CheckCodeType = (colorCombination) => {
    const result: string[] = [];

    if (colorCombination.length === 4) {
      const copyMasterCode = [...settings.masterCode];
      const copyCombination = [...colorCombination];

      settings.masterCode.map((isColor: string, index: number) => {
        if (colorCombination[index] === isColor) {
          copyCombination[index] = "clear";
          copyMasterCode[index] = "black";

          result.push("black");
        }
      });

      copyCombination
        .filter((color) => color !== "clear")
        .map((color: string) => {
          copyMasterCode.some((isColor: string, index: number) => {
            if (color === isColor) {
              copyMasterCode[index] = "white";

              result.push("white");
            }
          });
        });

      setUserCombinations((prevUserCombo) => {
        const combos: UserCombinations = [...prevUserCombo];

        combos.push({
          prediction: [...colorCombination],
          result: [...result],
        });

        return combos;
      });
    }
  };

  const handleChangeSettings: ChangeSettingsType = (inputs) => {
    setSettings((prevSettings) => {
      if (prevSettings.amount === inputs.amount && prevSettings.name === inputs.name) {
        return prevSettings;
      }

      return {
        ...prevSettings,
        masterCode: generateMasterCode(inputs.amount, COLORCODES),
        amount: inputs.amount,
      };
    });
  };




  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xs" className="mastermind-container">
        <Stack gap={2}>
          <Stack direction="row" justifyContent="flex-end">
            <Button onClick={() => setIsSettingsOpen(true)}>
              <SettingsIcon />
            </Button>
          </Stack>
          {/* <Button variant="contained" color="salmon">sss</Button> */}
          <GameBoard userCombinations={userCombinations} />
          <Divider />
          <SubmitPanel
            colors={settings.colorCodes}
            checkCode={handleCheckCode}
          />

          <Dialog open={isSettingsOpen} onClose={() => setIsSettingsOpen(false)}>
            <DialogTitle>Settings</DialogTitle>
            <DialogContent>
              <OptionPanel
                settings={settings}
                changeSettings={handleChangeSettings}
                onClose={() => setIsSettingsOpen(false)}
              />
            </DialogContent>
          </Dialog>
          {/* <ColorPanel /> */}
        </Stack>
      </Container>
    </ThemeProvider>
  );
}
