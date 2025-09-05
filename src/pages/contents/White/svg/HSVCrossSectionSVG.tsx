import React from "react";

const HSVCrossSectionSVG: React.FC = () => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    className="h-full w-full"
  >
    <defs>
      <linearGradient id="cs-white-lg-black" x1="0" x2="0" y1="0" y2="0.9">
        <stop offset="0%" stopColor="#fff" stopOpacity="0" />
        <stop offset="100%" stopColor="#000" />
      </linearGradient>
      <linearGradient
        id="cs-white-lg-red"
        x1="0.8"
        x2="-0.5"
        y1="0.3"
        y2="-0.3"
      >
        <stop offset="0%" stopColor="#f00" />
        <stop offset="100%" stopColor="#fff" stopOpacity="0.3" />
      </linearGradient>
      <linearGradient id="cs-white-lg-black-2" x1="0" x2="0" y1="0" y2="0.9">
        <stop offset="0%" stopColor="#000" stopOpacity="0" />
        <stop offset="100%" stopColor="#000" />
      </linearGradient>
      <linearGradient id="cs-white-lg-red-2" x1="0.8" x2="0" y1="0.3" y2="-0.5">
        <stop offset="0%" stopColor="#f00" />
        <stop offset="100%" stopColor="#faa" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="cs-white-lg-white" x1="0" x2="0.5" y1="0" y2="0.5">
        <stop offset="0%" stopColor="#fff" stopOpacity="1" />
        <stop offset="100%" stopColor="#000" stopOpacity="0" />
      </linearGradient>
    </defs>

    <style>{`
      .hsv-cs-background { fill: transparent; }
      .hsv-cs-line { stroke: #333; }
      .hsv-cs-arrow {
        fill: #333;
        stroke: #333;
      }
      .hsv-cs-text {
        fill: #333;
        font-family: sans-serif;
      }

      @media (prefers-color-scheme: dark) {
        .hsv-cs-line { stroke: #e5e5e5; }
        .hsv-cs-arrow {
          fill: #e5e5e5;
          stroke: #e5e5e5;
        }
        .hsv-cs-text { fill: #e5e5e5; }
      }
    `}</style>

    <rect className="hsv-cs-background" x="0" y="0" width="100" height="100" />
    <polygon points="30,90 30,15 75,15" fill="#000" opacity="1" />
    <polygon points="30,90 30,15 75,15" fill="url(#cs-white-lg-red)" />
    <polygon points="30,90 30,15 75,15" fill="url(#cs-white-lg-red-2)" />
    <polygon points="30,90 30,15 75,15" fill="url(#cs-white-lg-black)" />
    <polygon points="30,90 30,15 75,15" fill="url(#cs-white-lg-black-2)" />
    <polygon points="30,90 30,15 75,15" fill="url(#cs-white-lg-white)" />
    <polygon
      points="30,90 30,15 75,15"
      fill="none"
      className="hsv-cs-line"
      strokeWidth="0.3"
    />
    <text className="hsv-cs-text" x="30" y="13" fontSize="10">
      S
    </text>
    <line
      className="hsv-cs-line"
      x1="40"
      y1="10"
      x2="70"
      y2="10"
      strokeWidth="1"
    />
    <polygon className="hsv-cs-arrow" points="71,10 68,7 68,13" />
    <text className="hsv-cs-text" x="20" y="85" fontSize="10">
      V
    </text>
    <line
      className="hsv-cs-line"
      x1="23"
      y1="70"
      x2="23"
      y2="20"
      strokeWidth="1"
    />
    <polygon className="hsv-cs-arrow" points="23,19 20,22 26,22" />
  </svg>
);

export default HSVCrossSectionSVG;
