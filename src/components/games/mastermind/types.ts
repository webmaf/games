export type CheckCodeType = (colorCombination: string[]) => void;

export type ChangeSettingsType = (inputs: InputSettings) => void;

export interface InputSettings {
  name: string,
  amount: number
}

export interface SubmitPanelProps {
  checkCode: CheckCodeType;
  colors: string[];
}

export type UserCombinations = UserCombination[];

export interface UserCombination {
  prediction: string[];
  result: string[];
}

export interface GameBoardProps {
  userCombinations: UserCombinations;
}

export interface OptionPanelProps {
  settings: Settings;
  changeSettings: ChangeSettingsType;
}

export interface Settings {
  masterCode: string[];
  amount: number;
  colorCodes: string[];
  name: string;
}
