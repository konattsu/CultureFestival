import React from "react";

import { HSVtoRGB, rgbToHex } from "./utils";

import type { HSVColor } from "./WhiteTypes";

interface HSVControlsProps {
  hsv: HSVColor;
  onHsvChange: (channel: "h" | "s" | "v", value: number) => void;
}

const HSVControls: React.FC<HSVControlsProps> = ({ hsv, onHsvChange }) => {
  // Generate dynamic gradient colors for sliders
  const getHueGradient = (): string => {
    // Create a hue gradient with the current saturation and value
    const colors: string[] = [];
    const steps = 12; // More steps for smoother gradient

    for (let i = 0; i < steps; i++) {
      const hue = (i / (steps - 1)) * 360; // 0 to 360 degrees
      const { r, g, b } = HSVtoRGB(hue / 360, hsv.s, hsv.v);
      colors.push(rgbToHex(r, g, b));
    }

    return `linear-gradient(to right, ${colors.join(", ")})`;
  };

  const getSaturationGradient = (): string => {
    const minColor = rgbToHex(
      HSVtoRGB(hsv.h / 360, 0, hsv.v).r,
      HSVtoRGB(hsv.h / 360, 0, hsv.v).g,
      HSVtoRGB(hsv.h / 360, 0, hsv.v).b,
    );
    const maxColor = rgbToHex(
      HSVtoRGB(hsv.h / 360, 1, hsv.v).r,
      HSVtoRGB(hsv.h / 360, 1, hsv.v).g,
      HSVtoRGB(hsv.h / 360, 1, hsv.v).b,
    );
    return `linear-gradient(to right, ${minColor}, ${maxColor})`;
  };

  const getValueGradient = (): string => {
    const minColor = rgbToHex(
      HSVtoRGB(hsv.h / 360, hsv.s, 0).r,
      HSVtoRGB(hsv.h / 360, hsv.s, 0).g,
      HSVtoRGB(hsv.h / 360, hsv.s, 0).b,
    );
    const maxColor = rgbToHex(
      HSVtoRGB(hsv.h / 360, hsv.s, 1).r,
      HSVtoRGB(hsv.h / 360, hsv.s, 1).g,
      HSVtoRGB(hsv.h / 360, hsv.s, 1).b,
    );
    return `linear-gradient(to right, ${minColor}, ${maxColor})`;
  };

  return (
    <div className="my-6 rounded-lg bg-gray-100 p-6 dark:bg-gray-800">
      <div className="mb-4">
        <label
          htmlFor="h-hsv"
          className="flex items-center justify-between text-gray-700 dark:text-gray-300"
        >
          <span>H</span>
          <span className="font-mono">{Math.round(hsv.h)}°</span>
        </label>
        <input
          type="range"
          id="h-hsv"
          className="h-2 w-full cursor-pointer appearance-none rounded-lg"
          style={{
            background: getHueGradient(),
          }}
          min="0"
          max="360"
          value={hsv.h}
          step="1"
          onChange={(e) => onHsvChange("h", parseInt(e.target.value))}
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="s-hsv"
          className="flex items-center justify-between text-gray-700 dark:text-gray-300"
        >
          <span>S</span>
          <span className="font-mono">{Math.round(hsv.s * 100)}%</span>
        </label>
        <input
          type="range"
          id="s-hsv"
          className="h-2 w-full cursor-pointer appearance-none rounded-lg"
          style={{
            background: getSaturationGradient(),
          }}
          min="0"
          max="1"
          value={hsv.s}
          step="0.01"
          onChange={(e) => onHsvChange("s", parseFloat(e.target.value))}
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="v-hsv"
          className="flex items-center justify-between text-gray-700 dark:text-gray-300"
        >
          <span>V</span>
          <span className="font-mono">{Math.round(hsv.v * 100)}%</span>
        </label>
        <input
          type="range"
          id="v-hsv"
          className="h-2 w-full cursor-pointer appearance-none rounded-lg"
          style={{
            background: getValueGradient(),
          }}
          min="0"
          max="1"
          value={hsv.v}
          step="0.01"
          onChange={(e) => onHsvChange("v", parseFloat(e.target.value))}
        />
      </div>

      <div
        className="mt-4 h-20 w-full rounded border border-gray-300 dark:border-gray-600"
        style={{
          backgroundColor: rgbToHex(
            HSVtoRGB(hsv.h / 360, hsv.s, hsv.v).r,
            HSVtoRGB(hsv.h / 360, hsv.s, hsv.v).g,
            HSVtoRGB(hsv.h / 360, hsv.s, hsv.v).b,
          ),
        }}
      ></div>
    </div>
  );
};

export default HSVControls;
