import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./pages/MainLayout";
import CoinMarket from "./pages/Market";
import CoinDetail from "./pages/CoinDetail";
import Converter from "./pages/Converter";
import Watchlist from "./pages/Watchlist";
import Portfolio from "./pages/Portfolio";
import Education from "./pages/Education";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "market", element: <CoinMarket /> },
      { path: "coin/:id", element: <CoinDetail /> },
      { path: "converter", element: <Converter /> },
      { path: "watchlist", element: <Watchlist /> },
      { path: "portfolio", element: <Portfolio /> },
      { path: "education", element: <Education /> },
    ],
  },
]);

export default router;
