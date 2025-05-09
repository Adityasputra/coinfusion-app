import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./pages/MainLayout";
import CoinMarket from "./pages/Market";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/market",
        element: <CoinMarket />,
      },
    ],
  },
]);

export default router;
