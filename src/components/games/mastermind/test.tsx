import { alpha, darken, lighten } from '@mui/material/styles';
import CircleIcon from "@mui/icons-material/Circle";

type GradientIconProps = {
  width?: number | string;
  height?: number | string;
  from?: string;
  to?: string;
};

export const GradientIcon = ({
  width = 24,
  height = 24,
  from = "#7637FA",
  // to = "#21252B",
}: GradientIconProps) => {
  console.log(2, from)

  // const light1 = alpha(from, 0.5);
  const light1 = lighten(from, 0.8);
  const light2 = alpha(from, 0.1);
  // const dark = darken(alpha(to, 0.9));
  const dark = darken(from, 0.2);

  return (
    <>
      <svg width={0} height={0}>
        <linearGradient
          id={from}
          x1={1}
          y1={0}
          x2={1}
          y2={1}
          gradientTransform="rotate(-45)"
        >
          <stop offset="0%" stopColor={light1} />
          <stop offset="20%" stopColor={light2} />
          <stop offset="80%" stopColor={from} />
          <stop offset="100%" stopColor={dark} />
        </linearGradient>
      </svg>
      <CircleIcon sx={{ fill: `url(#${from})`, width, height }} />
    </>
  );
};
