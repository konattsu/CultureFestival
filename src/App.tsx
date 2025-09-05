import React from "react";
import { Suspense, lazy } from "react";

import { Routes, Route } from "react-router";

import ErrorBoundary from "./components/ErrorBoundary";
import LoadingSpinner from "./components/LoadingSpinner.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { SettingsProvider } from "./context/SettingsContext.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import MainLayout from "./layouts/MainLayout.tsx";

const Home = lazy(() => import("./pages/Home.tsx"));
const Map = lazy(() => import("./pages/Map.tsx"));
const BulletinBoard = lazy(() => import("./pages/BulletinBoard.tsx"));
const Magazine = lazy(() => import("./pages/Magazine.tsx"));
const CMSSelection = lazy(() => import("./pages/CMSSelection.tsx"));
const BulletinCMS = lazy(() => import("./pages/BulletinCMS.tsx"));
const AdminLogin = lazy(() => import("./pages/AdminLogin.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const ContentsRoutes = lazy(() => import("./pages/ContentsRoutes.tsx"));

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <SettingsProvider>
            <ScrollToTop />
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<MainLayout />}>
                  <Route index element={<Home />} />
                  <Route path="contents/*" element={<ContentsRoutes />} />
                  <Route path="magazine" element={<Magazine />} />
                  <Route path="bulletin-board" element={<BulletinBoard />} />
                  <Route path="cms" element={<CMSSelection />} />
                  <Route path="bulletin-cms" element={<BulletinCMS />} />
                  <Route path="admin-login" element={<AdminLogin />} />
                  <Route path="map" element={<Map />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </Suspense>
          </SettingsProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
