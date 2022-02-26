import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../views/Login";
import Register from "../views/Register";
import Home from "../views/Home";
import Details from "../views/Details";
import Categories from "../views/Categories";
import NotFound from "../views/404";
import Header from "../components/Header";
import PrivateRoutes from "./PrivateRoutes";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/home"
          element={
            <PrivateRoutes>
              <Home />
            </PrivateRoutes>
          }
        />
        <Route
          path="/details/:operationId"
          element={
            <PrivateRoutes>
              <Details />
            </PrivateRoutes>
          }
        />
        <Route
          path="/category"
          element={
            <PrivateRoutes>
              <Categories />
            </PrivateRoutes>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

{
  /* <PrivateRoutes path="/home" element={<Home />} />
        <PrivateRoutes path="/details/:operationId" element={<Details />} />
        <PrivateRoutes path="/category" element={<Categories />} /> */
}
