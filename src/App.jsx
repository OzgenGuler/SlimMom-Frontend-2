import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// import Diary from "./Diary/Diary";
// import GramCalc from "./Diary/GramCalc";
// import Register from "./Register/Registration";

import Page from "./pages/Page";
import ProtectedRoute from "./components/ProtectedRoute";
const PublicCalculator = lazy(() =>
  import("./pages/PublicCalculator/PublicCalculator")
);
const Diary = lazy(() => import("./pages/Diary/Diary"));
const Calculator = lazy(() => import("./pages/Calculator/Calculator"));
const Login = lazy(() => import("./pages/Login/Login"));
const Logout = lazy(() => import("./pages/Logout"));
const Register = lazy(() => import("./pages/Register/Register"));
const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route
          path="/"
          element={
            <Page>
              <PublicCalculator />
            </Page>
          }
        />
        {/* Login & Register */}
        <Route
          path="/login"
          element={
            <Page>
              <Login />
            </Page>
          }
        />
        <Route path="/logout" element={<Logout />} />
        <Route
          path="/register"
          element={
            <Page>
              <Register />
            </Page>
          }
        />
        {/*
         */}

        {/* Diary korumalı */}
        <Route
          path="/diary"
          element={
            <ProtectedRoute>
              <Page>
                <Diary />
              </Page>
            </ProtectedRoute>
          }
        />
        <Route
          path="/calculator"
          element={
            <ProtectedRoute>
              <Page>
                <Calculator />
              </Page>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default App;
