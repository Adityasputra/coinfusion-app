import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./pages/MainLayout";
import CoinMarket from "./pages/Market";
import CoinDetail from "./pages/CoinDetail";
import Converter from "./pages/Converter";
import Watchlist from "./pages/Watchlist";
import Portfolio from "./pages/Portfolio";
import Education from "./pages/Education";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
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
