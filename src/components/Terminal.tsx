"use client";

import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FitAddon } from "@xterm/addon-fit";
import { Terminal as XTerm } from "@xterm/xterm";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Terminal as TerminalIcon,
  Minimize2,
  Maximize2,
} from "lucide-react";

import "@xterm/xterm/css/xterm.css";

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
}

const Terminal: React.FC<TerminalProps> = ({ isOpen, onClose }) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerm | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [terminalHeight, setTerminalHeight] = useState(
    window.innerHeight * 0.5,
  ); // 50vh
  const [isResizing, setIsResizing] = useState(false);
  const resizeRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // ターミナルの初期化
  useEffect(() => {
    if (!isOpen || terminalRef.current === null || xtermRef.current !== null)
      return;

    const xterm = new XTerm({
      theme: {
        background: "#1e1e1e",
        foreground: "#d4d4d4",
        cursor: "#d4d4d4",
        selectionBackground: "#264f78",
        black: "#000000",
        red: "#f44747",
        green: "#608b4e",
        yellow: "#ffcc02",
        blue: "#569cd6",
        magenta: "#c586c0",
        cyan: "#4ec9b0",
        white: "#d4d4d4",
        brightBlack: "#666666",
        brightRed: "#f44747",
        brightGreen: "#608b4e",
        brightYellow: "#ffcc02",
        brightBlue: "#569cd6",
        brightMagenta: "#c586c0",
        brightCyan: "#4ec9b0",
        brightWhite: "#d4d4d4",
      },
      fontSize: 14,
      fontFamily: 'Consolas, "Courier New", monospace',
      cursorBlink: true,
      allowTransparency: true,
      scrollback: 1000,
    });

    const fitAddon = new FitAddon();
    xterm.loadAddon(fitAddon);

    xterm.open(terminalRef.current);
    fitAddon.fit();

    xtermRef.current = xterm;
    fitAddonRef.current = fitAddon;

    // 現在のディレクトリとプロンプトの設定
    let currentPath = "/";
    let currentLine = "";

    const prompt = (): string => {
      const pathDisplay = currentPath === "/" ? "~" : currentPath;
      return `\x1b[32mmath-club\x1b[0m:\x1b[34m${pathDisplay}\x1b[0m$ `;
    };

    // 初期プロンプトの表示
    xterm.writeln(
      "\x1b[36m🎉 Culture Festival 2024 - Math Club Terminal\x1b[0m",
    );
    xterm.writeln('\x1b[33mType "help" to see available commands\x1b[0m');
    xterm.writeln("");
    xterm.write(prompt());

    // コマンド処理関数
    const executeCommand = (command: string): void => {
      const cmd = command.trim().toLowerCase();
      const args = cmd.split(" ");
      const baseCmd = args[0];

      xterm.writeln("");

      switch (baseCmd) {
        case "help":
          xterm.writeln("\x1b[33mAvailable commands:\x1b[0m");
          xterm.writeln("  cd <path>    - Navigate to different pages");
          xterm.writeln("  ls           - List available pages");
          xterm.writeln("  pwd          - Show current path");
          xterm.writeln("  clear        - Clear terminal screen");
          xterm.writeln("  help         - Show this help message");
          xterm.writeln("  exit         - Close terminal");
          xterm.writeln("  whoami       - Show current user");
          xterm.writeln("  date         - Show current date and time");
          xterm.writeln("  uptime       - Show system uptime");
          xterm.writeln("  tree         - Show directory structure");
          xterm.writeln("  history      - Show command history");
          xterm.writeln("  echo <text>  - Display text");
          xterm.writeln("  fortune      - Display a random fortune");
          xterm.writeln("  matrix       - Enter the Matrix");
          xterm.writeln("");
          xterm.writeln("\x1b[36mNavigation paths:\x1b[0m");
          xterm.writeln("  /            - Home page");
          xterm.writeln("  /contents    - Contents page");
          xterm.writeln("  /contents/cryptanalysis - Cryptanalysis page");
          xterm.writeln("  /contents/dva           - DVA page");
          xterm.writeln("  /contents/gacha         - Gacha page");
          xterm.writeln("  /contents/heat-exhaustion - Heat Exhaustion page");
          xterm.writeln("  /contents/melos         - Melos page");
          xterm.writeln("  /map         - Map page");
          break;

        case "ls":
          if (currentPath === "/") {
            xterm.writeln("\x1b[34mcontents/\x1b[0m    \x1b[34mmap/\x1b[0m");
          } else if (currentPath === "/contents") {
            xterm.writeln(
              "\x1b[32mcryptanalysis\x1b[0m    \x1b[32mdva\x1b[0m          \x1b[32mgacha\x1b[0m",
            );
            xterm.writeln(
              "\x1b[32mheat-exhaustion\x1b[0m  \x1b[32mmelos\x1b[0m",
            );
          } else {
            xterm.writeln("\x1b[31mNo files found\x1b[0m");
          }
          break;

        case "pwd":
          xterm.writeln(currentPath);
          break;

        case "clear":
          xterm.clear();
          break;

        case "cd":
          if (args.length < 2) {
            currentPath = "/";
            void navigate("/");
          } else {
            const targetPath = args[1];

            // パスの正規化
            let newPath = targetPath;
            if (targetPath === "..") {
              if (currentPath !== "/") {
                const pathParts = currentPath
                  .split("/")
                  .filter((p) => p !== "");
                pathParts.pop();
                newPath =
                  pathParts.length > 0 ? `/${pathParts.join("/")}` : "/";
              } else {
                newPath = "/";
              }
            } else if (targetPath === "~" || targetPath === "/") {
              newPath = "/";
            } else if (targetPath.startsWith("/")) {
              newPath = targetPath;
            } else {
              // 相対パス
              if (currentPath === "/") {
                newPath = `/${targetPath}`;
              } else {
                newPath = `${currentPath}/${targetPath}`;
              }
            }

            // パスの有効性チェックとナビゲーション
            const validPaths = [
              "/",
              "/contents",
              "/contents/cryptanalysis",
              "/contents/dva",
              "/contents/gacha",
              "/contents/heat-exhaustion",
              "/contents/melos",
              "/map",
            ];

            if (validPaths.includes(newPath)) {
              currentPath = newPath;
              void navigate(newPath);
              xterm.writeln(`\x1b[32mNavigated to: ${newPath}\x1b[0m`);
            } else {
              xterm.writeln(
                `\x1b[31mcd: ${newPath}: No such file or directory\x1b[0m`,
              );
            }
          }
          break;

        case "whoami":
          xterm.writeln("\x1b[32mmathclub-visitor\x1b[0m");
          break;

        case "date":
          xterm.writeln(`\x1b[33m${new Date().toString()}\x1b[0m`);
          break;

        case "uptime": {
          const uptime = Math.floor(Date.now() / 1000);
          const hours = Math.floor(uptime / 3600);
          const minutes = Math.floor((uptime % 3600) / 60);
          const seconds = uptime % 60;
          xterm.writeln(`\x1b[32mup ${hours}h ${minutes}m ${seconds}s\x1b[0m`);
          break;
        }

        case "cat":
          if (args.length < 2) {
            xterm.writeln("\x1b[31mcat: missing file operand\x1b[0m");
          } else {
            const fileName = args[1];
            switch (fileName) {
              case "readme.txt":
                xterm.writeln(
                  "\x1b[36m=== Culture Festival 2024 - Math Club ===\x1b[0m",
                );
                xterm.writeln("Welcome to our interactive exhibition!");
                xterm.writeln("Explore various mathematical topics and enjoy!");
                break;
              case "about.txt":
                xterm.writeln("\x1b[36m=== About Math Club ===\x1b[0m");
                xterm.writeln("We are passionate about mathematics and");
                xterm.writeln("love sharing our knowledge with everyone!");
                break;
              case "contact.txt":
                xterm.writeln("\x1b[36m=== Contact Information ===\x1b[0m");
                xterm.writeln("Email: mathclub@example.com");
                xterm.writeln("Twitter: @mathclub2024");
                break;
              default:
                xterm.writeln(
                  `\x1b[31mcat: ${fileName}: No such file or directory\x1b[0m`,
                );
                break;
            }
          }
          break;

        case "tree":
          xterm.writeln("\x1b[34m.\x1b[0m");
          xterm.writeln("├── \x1b[34mcontents/\x1b[0m");
          xterm.writeln("│   ├── \x1b[32mcryptanalysis\x1b[0m");
          xterm.writeln("│   ├── \x1b[32mdva\x1b[0m");
          xterm.writeln("│   ├── \x1b[32mgacha\x1b[0m");
          xterm.writeln("│   ├── \x1b[32mheat-exhaustion\x1b[0m");
          xterm.writeln("│   └── \x1b[32mmelos\x1b[0m");
          xterm.writeln("├── \x1b[34mmap/\x1b[0m");
          xterm.writeln("├── \x1b[37mreadme.txt\x1b[0m");
          xterm.writeln("├── \x1b[37mabout.txt\x1b[0m");
          xterm.writeln("└── \x1b[37mcontact.txt\x1b[0m");
          break;

        case "history":
          xterm.writeln("\x1b[33mCommand history:\x1b[0m");
          xterm.writeln("  1  help");
          xterm.writeln("  2  ls");
          xterm.writeln("  3  cd contents");
          xterm.writeln("  4  pwd");
          break;

        case "echo":
          if (args.length < 2) {
            xterm.writeln("");
          } else {
            const text = cmd.substring(5); // Remove "echo " prefix
            xterm.writeln(`\x1b[37m${text}\x1b[0m`);
          }
          break;

        case "fortune": {
          const fortunes = [
            "The best way to learn mathematics is by doing mathematics. - Paul Halmos",
            "Mathematics is not about numbers, equations, computations, or algorithms: it is about understanding. - William Paul Thurston",
            "Pure mathematics is, in its way, the poetry of logical ideas. - Albert Einstein",
            "Mathematics knows no races or geographic boundaries; for mathematics, the cultural world is one country. - David Hilbert",
            "In mathematics you don't understand things. You just get used to them. - John von Neumann",
            "Mathematics is the music of reason. - James Joseph Sylvester",
            "The study of mathematics, like the Nile, begins in minuteness but ends in magnificence. - Charles Caleb Colton",
            "Mathematics is the art of giving the same name to different things. - Henri Poincaré",
          ];
          const randomFortune =
            fortunes[Math.floor(Math.random() * fortunes.length)];
          xterm.writeln(`\x1b[36m${randomFortune}\x1b[0m`);
          break;
        }

        case "matrix":
          xterm.writeln("\x1b[32m");
          xterm.writeln("Wake up, Math Club...");
          xterm.writeln("The Matrix has you...");
          xterm.writeln("Follow the white rabbit.");
          xterm.writeln("\x1b[0m");
          // Simulate matrix effect briefly
          setTimeout(() => {
            for (let i = 0; i < 5; i++) {
              setTimeout(() => {
                const chars = "01アイウエオカキクケコサシスセソタチツテト";
                let line = "";
                for (let j = 0; j < 40; j++) {
                  line += chars.charAt(
                    Math.floor(Math.random() * chars.length),
                  );
                }
                xterm.writeln(`\x1b[32m${line}\x1b[0m`);
              }, i * 100);
            }
            setTimeout(() => {
              xterm.writeln("\x1b[31mConnection terminated.\x1b[0m");
              xterm.write(prompt());
            }, 600);
          }, 1000);
          return; // Don't write prompt immediately

        case "exit":
          onClose();
          return;

        case "":
          // 空のコマンド
          break;

        default:
          xterm.writeln(`\x1b[31m${baseCmd}: command not found\x1b[0m`);
          break;
      }

      xterm.write(prompt());
    };

    // キー入力の処理
    xterm.onData((data) => {
      if (data === "\r") {
        // Enter key
        executeCommand(currentLine);
        currentLine = "";
      } else if (data === "\u007f") {
        // Backspace
        if (currentLine.length > 0) {
          currentLine = currentLine.slice(0, -1);
          xterm.write("\b \b");
        }
      } else if (data === "\u0003") {
        // Ctrl+C
        xterm.writeln("^C");
        currentLine = "";
        xterm.write(prompt());
      } else if (data >= " ") {
        // Printable characters
        currentLine += data;
        xterm.write(data);
      }
    });

    // ウィンドウリサイズ時のフィット
    const handleResize = (): void => {
      setTimeout(() => {
        if (
          fitAddonRef.current !== null &&
          fitAddonRef.current !== undefined &&
          !isMinimized
        ) {
          fitAddonRef.current.fit();
        }
      }, 100);
    };

    window.addEventListener("resize", handleResize);

    return (): void => {
      window.removeEventListener("resize", handleResize);
      xterm.dispose();
      xtermRef.current = null;
      fitAddonRef.current = null;
    };
  }, [isOpen, navigate, onClose, isMinimized, isFullscreen]);

  // ターミナルのフィット調整
  useEffect(() => {
    if (
      isOpen &&
      !isMinimized &&
      fitAddonRef.current !== null &&
      fitAddonRef.current !== undefined
    ) {
      setTimeout(() => {
        fitAddonRef.current?.fit();
      }, 300);
    }
  }, [isOpen, isMinimized, isFullscreen, terminalHeight]);

  // リサイザーの処理
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent | TouchEvent): void => {
      if (!isResizing) return;

      let clientY: number;
      if (e instanceof TouchEvent) {
        clientY = e.touches[0].clientY;
      } else {
        clientY = e.clientY;
      }

      const newHeight = Math.max(
        200, // 最小高さ
        Math.min(window.innerHeight - 100, window.innerHeight - clientY), // 最大高さ
      );
      setTerminalHeight(newHeight);
    };

    const handleMouseUp = (): void => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove, {
        passive: false,
      });
      document.addEventListener("touchmove", handleMouseMove, {
        passive: false,
      });
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchend", handleMouseUp);
      document.body.style.cursor = "ns-resize";
      document.body.style.userSelect = "none";
    } else {
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    }

    return (): void => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchmove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchend", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isResizing]);

  const handleResizeStart = (e: React.MouseEvent | React.TouchEvent): void => {
    e.preventDefault();
    setIsResizing(true);
  };

  const toggleMinimize = (): void => {
    setIsMinimized(!isMinimized);
  };

  const toggleFullscreen = (): void => {
    setIsFullscreen(!isFullscreen);
    if (!isFullscreen) {
      setIsMinimized(false); // Exit minimize mode when entering fullscreen
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`fixed z-50 border-t border-gray-600 bg-black/95 backdrop-blur-sm ${
            isFullscreen
              ? "top-0 right-0 bottom-0 left-0"
              : "right-0 bottom-0 left-0"
          }`}
          initial={{ y: "100%" }}
          animate={{
            y: isFullscreen ? "0%" : isMinimized ? `calc(100% - 40px)` : "0%",
          }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{
            height: isFullscreen
              ? "100vh"
              : isMinimized
                ? "40px"
                : `${terminalHeight}px`,
          }}
        >
          {/* Resize Handle */}
          {!isMinimized && !isFullscreen && (
            <div
              ref={resizeRef}
              className={`absolute top-0 right-0 left-0 h-1 cursor-ns-resize transition-colors hover:bg-blue-500/50 ${
                isResizing ? "bg-blue-500" : "bg-transparent"
              }`}
              onMouseDown={handleResizeStart}
              onTouchStart={handleResizeStart}
              role="button"
              tabIndex={0}
              title="Drag to resize terminal"
              style={{
                touchAction: "none",
              }}
            />
          )}
          {/* Terminal Header */}
          <div className="flex items-center justify-between border-b border-gray-600 bg-gray-800 px-4 py-2">
            <div className="flex items-center space-x-2">
              <TerminalIcon className="h-4 w-4 text-green-400" />
              <span className="text-sm font-medium text-gray-300">
                Terminal
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <motion.button
                onClick={toggleFullscreen}
                className="rounded p-1 text-gray-400 transition-colors hover:bg-gray-700 hover:text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              >
                <Maximize2 className="h-4 w-4" />
              </motion.button>

              <motion.button
                onClick={toggleMinimize}
                className="rounded p-1 text-gray-400 transition-colors hover:bg-gray-700 hover:text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title={isMinimized ? "Maximize" : "Minimize"}
              >
                <Minimize2 className="h-4 w-4" />
              </motion.button>

              <motion.button
                onClick={onClose}
                className="rounded p-1 text-gray-400 transition-colors hover:bg-red-600 hover:text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title="Close Terminal"
              >
                <X className="h-4 w-4" />
              </motion.button>
            </div>
          </div>

          {/* Terminal Content */}
          {!isMinimized && (
            <div
              ref={terminalRef}
              className="h-full overflow-hidden p-2"
              style={{
                height: isFullscreen
                  ? `calc(100vh - 40px)`
                  : `${terminalHeight - 40}px`,
              }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Terminal;
