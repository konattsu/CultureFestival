import React from "react";

import { Routes, Route } from "react-router";

import { SettingsProvider } from "./context/SettingsContext.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import MainLayout from "./layouts/MainLayout.tsx";
import contentsRoutes from "./pages/ContentsRoutes.tsx";
import Home from "./pages/Home.tsx";
import Map from "./pages/Map.tsx";
import NotFound from "./pages/NotFound.tsx";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <SettingsProvider>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="contents/*">{contentsRoutes}</Route>
            <Route path="map" element={<Map />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </SettingsProvider>
    </ThemeProvider>
  );
};

export default App;
