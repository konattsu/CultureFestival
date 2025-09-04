import React, { useState, useEffect, useRef } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import {
  X,
  Home,
  Grid3X3,
  Map,
  Sparkles,
  ChevronRight,
  Terminal as TerminalIcon,
} from "lucide-react";

import Terminal from "../components/Terminal";

interface HeaderProps {
  menuOpen: boolean;
  toggleMenu: () => void;
  terminalOpen: boolean;
  toggleTerminal: () => void;
}

const Header: React.FC<HeaderProps> = ({
  menuOpen,
  toggleMenu,
  terminalOpen,
  toggleTerminal,
}) => {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (header === null) return;

    gsap.fromTo(
      header,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "back.out(1.7)" },
    );
  }, []);

  return (
    <motion.header
      ref={headerRef}
      className="border-neon-blue/20 shadow-neon-blue/10 sticky top-0 z-30 border-b bg-black/80 shadow-lg backdrop-blur-lg"
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <button
          className="flex flex-col items-center justify-center space-y-1 p-2 focus:outline-none"
          onClick={toggleMenu}
          aria-label="メニュー"
        >
          <span
            className={`block h-0.5 w-6 bg-white transition-transform ${menuOpen ? "translate-y-1.5 rotate-45" : ""}`}
          ></span>
          <span
            className={`block h-0.5 w-6 bg-white transition-opacity ${menuOpen ? "opacity-0" : "opacity-100"}`}
          ></span>
          <span
            className={`block h-0.5 w-6 bg-white transition-transform ${menuOpen ? "-translate-y-1.5 -rotate-45" : ""}`}
          ></span>
        </button>

        <Link
          to="/"
          className="group from-neon-blue via-neon-purple to-neon-pink relative flex items-center space-x-2 bg-gradient-to-r bg-clip-text text-2xl font-bold transition-transform duration-300 hover:scale-105"
        >
          <Sparkles className="text-neon-yellow h-6 w-6 animate-pulse" />
          <span>数学部</span>
          <div className="from-neon-blue/20 to-neon-purple/20 absolute inset-0 -z-10 rounded-lg bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </Link>

        <div className="flex items-center space-x-2">
          <motion.button
            className={`relative rounded-lg p-3 transition-all duration-300 ${
              terminalOpen
                ? "from-neon-blue/30 to-neon-green/30 text-neon-blue shadow-neon-blue/20 ring-neon-blue/50 bg-gradient-to-r shadow-lg ring-2"
                : "hover:from-neon-blue/20 hover:to-neon-green/20 hover:text-neon-blue hover:shadow-neon-blue/10 bg-gray-800/50 text-gray-300 hover:bg-gradient-to-r hover:shadow-md"
            }`}
            onClick={toggleTerminal}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="ターミナル"
            title="Toggle Terminal"
          >
            <TerminalIcon className="h-6 w-6" />
            {terminalOpen && (
              <motion.div
                className="from-neon-blue/20 to-neon-green/20 absolute -inset-1 rounded-lg bg-gradient-to-r blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            )}
            <div
              className={`absolute top-1 right-1 h-2 w-2 rounded-full transition-all duration-300 ${
                terminalOpen ? "bg-neon-green animate-pulse" : "bg-gray-600"
              }`}
            />
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

// --- Navigation Menu Component ---
interface NavMenuProps {
  menuOpen: boolean;
  toggleMenu: () => void;
}

const NavMenu: React.FC<NavMenuProps> = ({ menuOpen, toggleMenu }) => {
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { to: "/", label: "ホーム", icon: <Home className="h-5 w-5" /> },
    {
      to: "/contents",
      label: "コンテンツ",
      icon: <Grid3X3 className="h-5 w-5" />,
    },
    { to: "/map", label: "地図", icon: <Map className="h-5 w-5" /> },
  ];

  useEffect(() => {
    const menu = menuRef.current;
    if (menu === null) return;

    if (menuOpen) {
      gsap.fromTo(
        menu,
        { x: -300, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
      );

      // Animate nav items
      const items = menu.querySelectorAll(".nav-item");
      gsap.fromTo(
        items,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.3, stagger: 0.1, delay: 0.2 },
      );
    }
  }, [menuOpen]);

  return (
    <AnimatePresence>
      {menuOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 z-60 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleMenu}
          />

          {/* Menu */}
          <motion.nav
            ref={menuRef}
            className="border-neon-blue/30 fixed top-0 bottom-0 left-0 z-80 w-80 border-r bg-gradient-to-br from-gray-900 via-black to-gray-900 shadow-2xl"
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex h-full flex-col p-6">
              {/* Header */}
              <div className="mb-12 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Sparkles className="text-neon-yellow h-8 w-8 animate-pulse" />
                  <h2 className="from-neon-blue to-neon-purple bg-gradient-to-r bg-clip-text text-2xl font-bold text-transparent">
                    数学部
                  </h2>
                </div>
                <motion.button
                  onClick={toggleMenu}
                  className="rounded-lg p-2 transition-colors hover:bg-white/10"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="h-6 w-6 text-gray-400" />
                </motion.button>
              </div>

              {/* Navigation Links */}
              <ul className="flex-grow space-y-3">
                {navLinks.map(({ to, label, icon }) => (
                  <motion.li
                    key={to}
                    className="nav-item"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to={to}
                      className={`group hover:from-neon-blue/20 hover:to-neon-purple/20 relative flex items-center space-x-4 rounded-xl p-4 transition-all duration-300 hover:bg-gradient-to-r ${
                        location.pathname === to
                          ? "from-neon-blue/30 to-neon-purple/30 shadow-neon-blue/20 bg-gradient-to-r text-white shadow-lg"
                          : "text-gray-300 hover:text-white"
                      }`}
                      onClick={toggleMenu}
                    >
                      <div
                        className={`rounded-lg p-2 ${
                          location.pathname === to
                            ? "bg-neon-blue/30 text-neon-blue"
                            : "group-hover:bg-neon-blue/20 group-hover:text-neon-blue bg-gray-800 text-gray-400"
                        }`}
                      >
                        {icon}
                      </div>
                      <span className="font-medium">{label}</span>
                      <ChevronRight
                        className={`ml-auto h-4 w-4 transition-transform ${
                          location.pathname === to
                            ? "text-neon-blue"
                            : "group-hover:text-neon-blue text-gray-500 group-hover:translate-x-1"
                        }`}
                      />

                      {location.pathname === to && (
                        <motion.div
                          className="from-neon-blue/10 to-neon-purple/10 border-neon-blue/20 absolute inset-0 rounded-xl border bg-gradient-to-r"
                          layoutId="activeTab"
                          transition={{
                            type: "spring",
                            bounce: 0.2,
                            duration: 0.6,
                          }}
                        />
                      )}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              {/* Footer */}
              <div className="mt-auto border-t border-gray-700 pt-6">
                <div className="text-center">
                  <p className="mb-2 text-sm text-gray-400">
                    Culture Festival 2025
                  </p>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="bg-neon-green h-2 w-2 animate-pulse rounded-full" />
                    <span className="text-xs text-gray-500">LIVE</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="from-neon-blue/10 to-neon-purple/10 absolute top-20 right-4 h-24 w-24 rounded-full bg-gradient-to-br blur-xl" />
            <div className="from-neon-pink/10 to-neon-yellow/10 absolute bottom-20 left-4 h-16 w-16 rounded-full bg-gradient-to-br blur-xl" />
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
};

// --- MainLayout ---
const MainLayout: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const toggleMenu = (): void => setMenuOpen((open) => !open);
  const toggleTerminal = (): void => setTerminalOpen((open) => !open);
  const closeTerminal = (): void => setTerminalOpen(false);

  // Close menu when route changes
  const location = useLocation();
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-black">
      <Header
        menuOpen={menuOpen}
        toggleMenu={toggleMenu}
        terminalOpen={terminalOpen}
        toggleTerminal={toggleTerminal}
      />
      <NavMenu menuOpen={menuOpen} toggleMenu={toggleMenu} />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <Outlet />
      </motion.main>

      {/* Footer */}
      {/* Footer */}
      <footer className="border-neon-blue/20 border-t bg-black/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Left Section - About */}
            <div className="text-center md:text-left">
              <div className="mb-4 flex items-center justify-center space-x-2 md:justify-start">
                <Sparkles className="text-neon-yellow h-6 w-6" />
                <span className="from-neon-blue to-neon-purple bg-gradient-to-r bg-clip-text text-xl font-bold text-transparent">
                  数学部
                </span>
              </div>
              <p className="mb-2 text-sm text-gray-400">
                高校数学部による文化祭展示
              </p>
              <p className="text-xs text-gray-500">
                Mathematics Department Exhibition
              </p>
            </div>

            {/* Center Section - Event Info */}
            <div className="text-center">
              <h3 className="mb-4 text-lg font-semibold text-white">
                Culture Festival 2025
              </h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-400">
                  開催日: 2025年9月6日-7日
                </p>
                <p className="text-sm text-gray-400">場所: 高校校舎</p>
                <div className="mt-3 flex items-center justify-center space-x-2">
                  <div className="bg-neon-green h-2 w-2 rounded-full" />
                  <span className="text-xs text-gray-500">LIVE EVENT</span>
                </div>
              </div>
            </div>

            {/* Right Section - Activities */}
            <div className="text-center md:text-right">
              <h3 className="mb-4 text-lg font-semibold text-white">
                展示内容
              </h3>
              <div className="space-y-1">
                <p className="text-sm text-gray-400">数学パズル</p>
                <p className="text-sm text-gray-400">暗号解読体験</p>
                <p className="text-sm text-gray-400">数学ゲーム</p>
                <p className="text-sm text-gray-400">プログラミング展示</p>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-8 border-t border-gray-700 pt-6">
            <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
              <div className="text-center md:text-left">
                <p className="text-xs text-gray-500">
                  © 2025 Math Department. All rights reserved.
                </p>
                <p className="mt-1 text-xs text-gray-600">
                  Built with React + TypeScript + Vite
                </p>
              </div>
              <div className="text-center md:text-right">
                <p className="text-xs text-gray-500">
                  Visit us at the school festival!
                </p>
                <p className="mt-1 text-xs text-gray-600">
                  Location: Room 3-A Math Classroom
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Background decorative elements */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="bg-neon-blue/5 absolute top-1/4 left-1/4 h-96 w-96 animate-pulse rounded-full blur-3xl" />
        <div className="bg-neon-purple/5 absolute right-1/4 bottom-1/4 h-96 w-96 animate-pulse rounded-full blur-3xl" />
      </div>

      {/* Terminal */}
      <Terminal
        isOpen={terminalOpen}
        onClose={closeTerminal}
        onToggle={toggleTerminal}
      />
    </div>
  );
};

export default MainLayout;
