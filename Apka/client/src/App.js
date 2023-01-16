import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";
import Navbar from "./components/Navbar";
import WithoutNavbar from "./components/WithoutNavbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import Search from "./pages/Search";
import Login from "./pages/Login";
import Patient from "./pages/Patient";
import PaperVersion from "./pages/PaperVersion";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<WithoutNavbar />}>
          <Route exact path="/" exact element={<Login />} />
        </Route>
        <Route element={<Navbar />}>
          <Route path="/Add" element={<Add />} />
          <Route path="/Patient" element={<Patient />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/PaperVersion" element={<PaperVersion />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
