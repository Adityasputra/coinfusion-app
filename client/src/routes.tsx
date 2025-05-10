import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./pages/MainLayout";
import CoinMarket from "./pages/Market";
import CoinDetail from "./pages/CoinDetail";
import Converter from "./pages/Converter";
import Watchlist from "./pages/Watchlist";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "market", element: <CoinMarket /> },
      { path: "coin/:id", element: <CoinDetail /> },
      { path: "converter", element: <Converter /> },
      { path: "watchlist", element: <Watchlist /> },
    ],
  },
]);

export default router;
