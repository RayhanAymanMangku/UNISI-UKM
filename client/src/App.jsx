import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { DashboardPage } from "./pages/Dashboard/DashboardPage";
import { DaftarAnggotaPage } from "./pages/DaftarAnggota/DaftarAnggotaPage";
import { PresensiPage } from "./pages/Presensi/PresensiPage";
import { DataKeuangan } from "./pages/DataKeuangan/DataKeuangan";
import { Navigate } from "react-router-dom";

export default function App() {
  return (
    <>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/Dashboard" element={<DashboardPage />} />
            <Route path="/DaftarAnggota" element={<DaftarAnggotaPage />} />
            <Route path="/Presensi" element={<PresensiPage />} />
            <Route path="/DataKeuangan" element={<DataKeuangan />} />
            <Route path="/" element={<Navigate to="/Dashboard" replace={true} />} />

          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}
