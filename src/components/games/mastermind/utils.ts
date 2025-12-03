import { createTheme, darken, lighten } from "@mui/material/styles";

const baseTheme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
    },
  },
});

export const theme = createTheme(baseTheme, {
  palette: {
    salmon: baseTheme.palette.augmentColor({
      color: {
        main: "#FF5733",
      },
      name: "salmon",
    }),
  },
});

export const backgroundRadialGradient = (color: string) => {
  return `radial-gradient(circle at 5px 10px,
    ${color} 0%,
    ${lighten(color, 0.2)} 20%,
    ${color} 40%,
    ${darken(color, 0.4)} 70%,
    ${darken(color, 0.9)} 90%,
    #21252B 100%
  )`;
};

export const backgroundLinearGradient = (color: string) => {
  return `linear-gradient(135deg,
    ${color} 0%,
    ${lighten(color, 0.2)} 20%,
    ${color} 40%,
    ${darken(color, 0.4)} 70%,
    ${darken(color, 0.8)} 100%
  )`;
};
