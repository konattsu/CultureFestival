import React from "react";

const HSVWhiteAreaSVG: React.FC = () => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    className="h-full w-full"
  >
    <style>{`
      .hsv-white-background { fill: transparent; }
      .hsv-white-line {
        stroke: #333;
        fill: none;
      }
      .hsv-white-arrow {
        fill: #333;
        stroke: #333;
      }
      .hsv-white-text {
        fill: #333;
        font-family: sans-serif;
      }
      .hsv-white-highlight {
        fill: #f22;
        stroke: #333;
      }

      @media (prefers-color-scheme: dark) {
        .hsv-white-line { stroke: #e5e5e5; }
        .hsv-white-arrow {
          fill: #e5e5e5;
          stroke: #e5e5e5;
        }
        .hsv-white-text { fill: #e5e5e5; }
        .hsv-white-highlight { stroke: #e5e5e5; }
      }
    `}</style>

    <rect
      className="hsv-white-background"
      x="0"
      y="0"
      width="100"
      height="100"
    />
    <polyline
      className="hsv-white-highlight"
      points="30,31 50,60 70,31"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <ellipse
      className="hsv-white-highlight"
      cx="50"
      cy="30"
      rx="20"
      ry="5"
      strokeWidth="2"
    />
    <ellipse
      className="hsv-white-line"
      cx="50"
      cy="30"
      rx="40"
      ry="10"
      strokeWidth="1"
    />
    <polyline
      className="hsv-white-line"
      points="10,31 50,90 90,31"
      strokeWidth="1"
      strokeLinecap="round"
    />
    <line
      className="hsv-white-line"
      x1="50"
      y1="91"
      x2="95"
      y2="91"
      strokeLinecap="round"
    />
    <polygon className="hsv-white-arrow" points="95,91 93,89, 93,93" />
    <text className="hsv-white-text" x="90" y="87" fontSize="10">
      S
    </text>
    <line
      className="hsv-white-line"
      x1="50"
      y1="91"
      x2="85"
      y2="65"
      strokeLinecap="round"
    />
    <text className="hsv-white-text" x="68" y="88" fontSize="10">
      H
    </text>
    <polygon className="hsv-white-arrow" points="63,82 61.5,85 65.5,83" />
    <rect className="hsv-white-text" x="63.7" y="88" width="1" height="3" />
    <line
      className="hsv-white-line"
      x1="63.5"
      y1="84"
      x2="64"
      y2="86.5"
      strokeWidth="1"
    />
    <line
      className="hsv-white-line"
      x1="50"
      y1="91"
      x2="50"
      y2="10"
      strokeWidth="1"
      strokeLinecap="round"
    />
    <polygon className="hsv-white-arrow" points="50,10 52,12 48,12" />
    <text className="hsv-white-text" x="38" y="15" fontSize="10">
      V
    </text>
  </svg>
);

export default HSVWhiteAreaSVG;
