import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

interface HeaderProps {
  menuOpen: boolean;
  toggleMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({ menuOpen, toggleMenu }) => (
  <header className="sticky top-0 z-30 bg-white shadow-md dark:bg-gray-800">
    <div className="container mx-auto flex items-center justify-between px-1 py-2">
      <button
        className="flex flex-col items-center justify-center space-y-1 p-2 focus:outline-none"
        onClick={toggleMenu}
        aria-label="メニュー"
      >
        <span
          className={`block h-0.5 w-6 bg-gray-800 transition-transform dark:bg-white ${menuOpen ? "translate-y-1.5 rotate-45" : ""}`}
        ></span>
        <span
          className={`block h-0.5 w-6 bg-gray-800 transition-opacity dark:bg-white ${menuOpen ? "opacity-0" : "opacity-100"}`}
        ></span>
        <span
          className={`block h-0.5 w-6 bg-gray-800 transition-transform dark:bg-white ${menuOpen ? "-translate-y-1.5 -rotate-45" : ""}`}
        ></span>
      </button>
      <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white">
        数学部
      </Link>
      <div className="w-10"></div>
    </div>
  </header>
);

// --- Navigation Menu Component ---
interface NavMenuProps {
  menuOpen: boolean;
  toggleMenu: () => void;
}

const NavMenu: React.FC<NavMenuProps> = ({ menuOpen, toggleMenu }) => {
  const location = useLocation();
  const navLinks = [
    { to: "/", label: "ホーム" },
    { to: "/contents", label: "コンテンツ" },
    { to: "/map", label: "地図" },
  ];
  return (
    <nav
      className={`fixed top-0 bottom-0 left-0 z-50 w-64 transform bg-white shadow-lg transition-transform dark:bg-gray-800 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="flex h-full flex-col p-4">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            数学部
          </h2>
        </div>
        <ul className="flex-grow space-y-2">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                className={`block rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${location.pathname === to ? "bg-amber-200/20 dark:bg-amber-200/20" : ""}`}
                onClick={toggleMenu}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

// --- MainLayout ---
const MainLayout: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = (): void => setMenuOpen((open) => !open);

  return (
    <div className="min-h-screen">
      {/* Overlay */}
      <div
        className={`${menuOpen ? "fixed inset-0 z-30 bg-black/50" : "hidden"}`}
        onClick={toggleMenu}
      ></div>

      <Header menuOpen={menuOpen} toggleMenu={toggleMenu} />
      <NavMenu menuOpen={menuOpen} toggleMenu={toggleMenu} />

      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
