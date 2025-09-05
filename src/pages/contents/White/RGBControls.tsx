import React from "react";

import type { RGBColor } from "./WhiteTypes";

interface RGBControlsProps {
  rgb: RGBColor;
  onRgbChange: (channel: "r" | "g" | "b", value: number) => void;
  rgbToHex: (r: number, g: number, b: number) => string;
}

const RGBControls: React.FC<RGBControlsProps> = ({
  rgb,
  onRgbChange,
  rgbToHex,
}) => {
  // Generate dynamic gradient colors for sliders
  const getRedGradient = (): string => {
    const minColor = rgbToHex(0, rgb.g, rgb.b);
    const maxColor = rgbToHex(255, rgb.g, rgb.b);
    return `linear-gradient(to right, ${minColor}, ${maxColor})`;
  };

  const getGreenGradient = (): string => {
    const minColor = rgbToHex(rgb.r, 0, rgb.b);
    const maxColor = rgbToHex(rgb.r, 255, rgb.b);
    return `linear-gradient(to right, ${minColor}, ${maxColor})`;
  };

  const getBlueGradient = (): string => {
    const minColor = rgbToHex(rgb.r, rgb.g, 0);
    const maxColor = rgbToHex(rgb.r, rgb.g, 255);
    return `linear-gradient(to right, ${minColor}, ${maxColor})`;
  };

  return (
    <div className="my-6 rounded-lg bg-gray-100 p-6 dark:bg-gray-800">
      <div className="mb-4">
        <label
          htmlFor="red"
          className="flex items-center justify-between text-gray-700 dark:text-gray-300"
        >
          <span>赤</span>
          <span className="font-mono">
            0x{rgb.r.toString(16).padStart(2, "0")} , {rgb.r}
          </span>
        </label>
        <input
          type="range"
          id="red"
          className="h-2 w-full cursor-pointer appearance-none rounded-lg"
          style={{
            background: getRedGradient(),
          }}
          min="0"
          max="255"
          value={rgb.r}
          step="1"
          onChange={(e) => onRgbChange("r", parseInt(e.target.value))}
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="green"
          className="flex items-center justify-between text-gray-700 dark:text-gray-300"
        >
          <span>緑</span>
          <span className="font-mono">
            0x{rgb.g.toString(16).padStart(2, "0")} , {rgb.g}
          </span>
        </label>
        <input
          type="range"
          id="green"
          className="h-2 w-full cursor-pointer appearance-none rounded-lg"
          style={{
            background: getGreenGradient(),
          }}
          min="0"
          max="255"
          value={rgb.g}
          step="1"
          onChange={(e) => onRgbChange("g", parseInt(e.target.value))}
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="blue"
          className="flex items-center justify-between text-gray-700 dark:text-gray-300"
        >
          <span>青</span>
          <span className="font-mono">
            0x{rgb.b.toString(16).padStart(2, "0")} , {rgb.b}
          </span>
        </label>
        <input
          type="range"
          id="blue"
          className="h-2 w-full cursor-pointer appearance-none rounded-lg"
          style={{
            background: getBlueGradient(),
          }}
          min="0"
          max="255"
          value={rgb.b}
          step="1"
          onChange={(e) => onRgbChange("b", parseInt(e.target.value))}
        />
      </div>

      <div
        className="mt-4 h-20 w-full rounded border border-gray-300 dark:border-gray-600"
        style={{ backgroundColor: rgbToHex(rgb.r, rgb.g, rgb.b) }}
      ></div>
    </div>
  );
};

export default RGBControls;
