import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./pages/MainLayout";
import CoinMarket from "./pages/CoinMarket";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/coin-market",
        element: <CoinMarket />,
      },
    ],
  },
]);

export default router;
