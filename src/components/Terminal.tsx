"use client";

import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FitAddon } from "@xterm/addon-fit";
import { Terminal as XTerm } from "@xterm/xterm";
import { motion, AnimatePresence } from "framer-motion";
import { X, Terminal as TerminalIcon, Minimize2 } from "lucide-react";

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
  }, [isOpen, navigate, onClose, isMinimized]);

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
  }, [isOpen, isMinimized]);

  const toggleMinimize = (): void => {
    setIsMinimized(!isMinimized);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed right-0 bottom-0 left-0 z-50 border-t border-gray-600 bg-black/95 backdrop-blur-sm"
          initial={{ y: "100%" }}
          animate={{ y: isMinimized ? "calc(100% - 40px)" : "0%" }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{ height: isMinimized ? "40px" : "50vh" }}
        >
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
              style={{ height: "calc(100% - 40px)" }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Terminal;
