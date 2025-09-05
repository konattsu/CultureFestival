import { useState } from "react";

import type { RGBColor, HSVColor } from "./WhiteTypes";

export const useColorControls = (): {
  rgb: RGBColor;
  hsv: HSVColor;
  handleRgbChange: (channel: "r" | "g" | "b", value: number) => void;
  handleHsvChange: (channel: "h" | "s" | "v", value: number) => void;
} => {
  // RGB slider state
  const [rgb, setRgb] = useState<RGBColor>({ r: 0, g: 0, b: 0 });

  // HSV slider state
  const [hsv, setHsv] = useState<HSVColor>({ h: 0, s: 1, v: 1 });

  // Handle RGB slider changes
  const handleRgbChange = (channel: "r" | "g" | "b", value: number): void => {
    const newRgb = { ...rgb, [channel]: value };
    setRgb(newRgb);
  };

  // Handle HSV slider changes
  const handleHsvChange = (channel: "h" | "s" | "v", value: number): void => {
    let newHsv = { ...hsv, [channel]: value };

    // If v is 0, force s to be 0 as well (following the JS logic)
    if (channel === "v" && value === 0) {
      newHsv.s = 0;
    }
    // If current v is 0, always keep s at 0
    if (newHsv.v === 0) {
      newHsv.s = 0;
    }

    setHsv(newHsv);
  };

  return {
    rgb,
    hsv,
    handleRgbChange,
    handleHsvChange,
  };
};
