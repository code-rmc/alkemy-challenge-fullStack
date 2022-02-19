import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../views/Login";
import Home from "../views/Home";
import Details from "../views/Details";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="home" element={<Home />} />
        <Route path="details" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}
