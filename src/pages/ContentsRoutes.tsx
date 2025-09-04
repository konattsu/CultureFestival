import React, { lazy, Suspense } from "react";

import { Route } from "react-router";

import Contents from "./Contents";
import NotFound from "./NotFound";

const Cryptanalysis = lazy(() => import("./contents/Cryptanalysis"));
const DVA = lazy(() => import("./contents/DVA"));
const Gacha = lazy(() => import("./contents/Gacha"));
const HeatExhaustion = lazy(() => import("./contents/HeatExhaustion"));
const Programming = lazy(() => import("./contents/Programming"));
const Melos = lazy(() => import("./contents/Melos"));
const Notebook = lazy(() => import("./contents/Notebook"));
const Tech = lazy(() => import("./contents/Tech"));
const White = lazy(() => import("./contents/White"));

const Loading: React.FC = () => (
  <div className="flex h-screen w-full items-center justify-center">
    <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
  </div>
);

const contentsRoutes = [
  <Route path="" element={<Contents />} key="index" />,
  <Route
    path="cryptanalysis"
    element={
      <Suspense fallback={<Loading />}>
        <Cryptanalysis />
      </Suspense>
    }
    key="cryptanalysis"
  />,
  <Route
    path="dva"
    element={
      <Suspense fallback={<Loading />}>
        <DVA />
      </Suspense>
    }
    key="dva"
  />,
  <Route
    path="gacha"
    element={
      <Suspense fallback={<Loading />}>
        <Gacha />
      </Suspense>
    }
    key="gacha"
  />,
  <Route
    path="heat-exhaustion"
    element={
      <Suspense fallback={<Loading />}>
        <HeatExhaustion />
      </Suspense>
    }
    key="heat-exhaustion"
  />,
  <Route
    path="programming"
    element={
      <Suspense fallback={<Loading />}>
        <Programming />
      </Suspense>
    }
    key="programming"
  />,
  <Route
    path="melos"
    element={
      <Suspense fallback={<Loading />}>
        <Melos />
      </Suspense>
    }
    key="melos"
  />,
  <Route
    path="notebook"
    element={
      <Suspense fallback={<Loading />}>
        <Notebook />
      </Suspense>
    }
    key="notebook"
  />,
  <Route
    path="tech"
    element={
      <Suspense fallback={<Loading />}>
        <Tech />
      </Suspense>
    }
    key="tech"
  />,
  <Route
    path="white"
    element={
      <Suspense fallback={<Loading />}>
        <White />
      </Suspense>
    }
    key="white"
  />,
  <Route path="*" element={<NotFound />} key="notfound" />,
];

export default contentsRoutes;
