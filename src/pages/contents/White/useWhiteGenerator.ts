import type React from "react";
import { useState, useCallback } from "react";

import { RGB_RANGE } from "./constants";
import { generateRandom } from "./utils";

export const useWhiteGenerator = (): {
  whiteName: string;
  whiteColor: string;
  handleWhiteNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleGenerateWhite: () => void;
} => {
  // White canvas state
  const [whiteName, setWhiteName] = useState<string>("");
  const [whiteColor, setWhiteColor] = useState<string>("#ffffff");

  // Generate a random white color
  const generateWhiteColor = useCallback((): string => {
    const [base, min, max] = RGB_RANGE[generateRandom(0, RGB_RANGE.length)];
    const a = base;
    const b1 = generateRandom(min, max + 1);
    const c1 = generateRandom(min, max + 1);

    // Randomly arrange RGB values
    const arrangeRGB = (): [number, number, number] => {
      switch (generateRandom(0, 3)) {
        case 0:
          return [a, b1, c1];
        case 1:
          return [b1, a, c1];
        case 2:
          return [b1, c1, a];
        default:
          return [a, b1, c1];
      }
    };

    const [r, g, b] = arrangeRGB();
    return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
  }, []);

  // Generate new white color
  const handleGenerateWhite = (): void => {
    const newColor = generateWhiteColor();
    setWhiteColor(newColor);
  };

  // Handle white name change
  const handleWhiteNameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const newName = e.target.value.slice(0, 10);
    setWhiteName(newName);
  };

  return {
    whiteName,
    whiteColor,
    handleWhiteNameChange,
    handleGenerateWhite,
  };
};
