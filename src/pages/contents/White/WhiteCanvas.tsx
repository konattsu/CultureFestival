import React, { useRef, useEffect } from "react";

interface WhiteCanvasProps {
  color: string;
  name?: string;
}

const WhiteCanvas: React.FC<WhiteCanvasProps> = ({ color, name }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // 3:1 aspect ratio constants
  const CANVAS_WIDTH = 1500;
  const CANVAS_HEIGHT = 500;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas === null) return;
    const ctx = canvas.getContext("2d");
    if (ctx === null) return;
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillStyle = "#000";
    ctx.font = "90px monospace";
    ctx.textBaseline = "top";
    ctx.fillText(color, CANVAS_WIDTH - 400, CANVAS_HEIGHT - 100);
    if (name !== null && name !== undefined && name.trim() !== "") {
      ctx.font = "120px monospace";
      ctx.fillText(name, 100, 100);
    }
  }, [color, name]);

  return (
    <canvas
      id="white-canvas"
      ref={canvasRef}
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
      className="h-full w-full object-contain"
    />
  );
};

export default WhiteCanvas;
