import {
  Slider,
  FormLabel,
  TextField,
  Stack,
  AvatarGroup,
  Avatar,
  Button,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";

import { useState, useRef } from "react";
import { backgroundRadialGradient } from "./utils";
import type { OptionPanelProps } from "./types";

export default function OptionPanel({
  settings,
  changeSettings,
}: OptionPanelProps) {
  const fieldName = useRef<HTMLInputElement>(null);
  const fieldAmount = useRef<HTMLInputElement>(null);

  const [amount, setAmount] = useState(4);

  const handleChangeSliderValue = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const newAmount = parseInt(target.value || "0") || settings.amount;

    setAmount((prevAmount) => {
      if (prevAmount === newAmount) {
        return prevAmount;
      }
      return newAmount;
    });
  };

  const handleSubmitGameSettings = () => {
    changeSettings({
      name: fieldName.current?.value || "",
      amount: parseInt(fieldAmount.current?.value || "0") || settings.amount,
    });
  };

  return (
    <Stack sx={{ margin: "16px" }} rowGap={4}>
      <TextField ref={fieldName} label="Name" variant="outlined" />

      <Stack gap={2} direction={"row"}>
        <FormLabel>Amound Colors:</FormLabel>
        <AvatarGroup max={6} spacing="medium">
          {settings.colorCodes.slice(0, amount).map((color, index) => {
            return (
              <Avatar key={index}>
                <CircleIcon
                  sx={{
                    background: backgroundRadialGradient(color),
                    fill: "transparent",
                    width: 44,
                    height: 44,
                  }}
                />
                <span style={{ position: "absolute" }}>{index + 1}</span>
              </Avatar>
            );
          })}
        </AvatarGroup>
      </Stack>
      <Slider
        ref={fieldAmount}
        defaultValue={4}
        min={4}
        max={6}
        aria-label="Always visible"
        onChange={handleChangeSliderValue}
        value={amount}
      ></Slider>
      <Button onClick={handleSubmitGameSettings}>SUBMIT</Button>
    </Stack>
  );
}
