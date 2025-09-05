import React from "react";

const HSVTopViewSVG: React.FC = () => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    className="h-full w-full"
  >
    <defs>
      <radialGradient id="top-hsv-white" cx="50%" cy="50%" r="30%">
        <stop offset="0%" stopColor="#fff" stopOpacity="1" />
        <stop offset="100%" stopColor="#fff" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="top-hsv-red" cx="100%" cy="50%" r="70%">
        <stop offset="0%" stopColor="#f00" stopOpacity="1" />
        <stop offset="100%" stopColor="#f55" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="top-hsv-yellow" cx="75%" cy="13%" r="70%">
        <stop offset="0%" stopColor="#ff0" stopOpacity="1" />
        <stop offset="100%" stopColor="#ff5" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="top-hsv-green" cx="25%" cy="13%" r="70%">
        <stop offset="0%" stopColor="#0f0" stopOpacity="1" />
        <stop offset="100%" stopColor="#5f5" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="top-hsv-light-blue" cx="0%" cy="50%" r="70%">
        <stop offset="0%" stopColor="#0ff" stopOpacity="1" />
        <stop offset="100%" stopColor="#5ff" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="top-hsv-blue" cx="25%" cy="87%" r="70%">
        <stop offset="0%" stopColor="#00f" stopOpacity="1" />
        <stop offset="100%" stopColor="#55f" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="top-hsv-violet" cx="75%" cy="87%" r="70%">
        <stop offset="0%" stopColor="#f0f" stopOpacity="1" />
        <stop offset="100%" stopColor="#f5f" stopOpacity="0" />
      </radialGradient>
    </defs>

    <style>{`
      .hsv-top-text {
        fill: #000;
        font-family: sans-serif;
      }
      .hsv-top-line {
        stroke: #000;
      }
      .hsv-top-arrow {
        stroke: #000;
        fill: #000;
      }

      @media (prefers-color-scheme: dark) {
        .hsv-top-text { fill: #fff; }
        .hsv-top-line { stroke: #fff; }
        .hsv-top-arrow {
          stroke: #fff;
          fill: #fff;
        }
      }
    `}</style>

    <rect x="0" y="0" width="100" height="100" fill="none" />
    <circle cx="50%" cy="50%" r="50%" fill="url(#top-hsv-red)" opacity="1" />
    <circle cx="50%" cy="50%" r="50%" fill="url(#top-hsv-yellow)" opacity="1" />
    <circle cx="50%" cy="50%" r="50%" fill="url(#top-hsv-green)" opacity="1" />
    <circle
      cx="50%"
      cy="50%"
      r="50%"
      fill="url(#top-hsv-light-blue)"
      opacity="1"
    />
    <circle cx="50%" cy="50%" r="50%" fill="url(#top-hsv-blue)" opacity="1" />
    <circle cx="50%" cy="50%" r="50%" fill="url(#top-hsv-violet)" opacity="1" />
    <circle
      cx="50%"
      cy="50%"
      r="50%"
      fill="url(#top-hsv-white)"
      opacity="0.5"
    />
    <circle cx="50%" cy="50%" r="3" className="hsv-top-arrow" />
    <line
      x1="50"
      y1="50"
      x2="100"
      y2="50"
      className="hsv-top-line"
      strokeWidth="1"
    />
    <text x="40" y="60" className="hsv-top-text" fontSize="10">
      V
    </text>
    <line x1="50" y1="50" x2="75.5" y2="7" className="hsv-top-line" />
    <text x="60" y="45" className="hsv-top-text" fontSize="10">
      H
    </text>
    <line x1="60" y1="50" x2="59" y2="47" className="hsv-top-line" />
    <line x1="58" y1="45" x2="55" y2="42" className="hsv-top-line" />
    <text x="60" y="15" className="hsv-top-text" fontSize="10">
      S
    </text>
    <polygon points="75.5,7 73.5,7.6 76,9" className="hsv-top-arrow" />
  </svg>
);

export default HSVTopViewSVG;
