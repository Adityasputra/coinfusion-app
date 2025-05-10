import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./pages/MainLayout";
import CoinMarket from "./pages/Market";
import CoinDetail from "./pages/CoinDetail";
import Converter from "./pages/Converter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "market", element: <CoinMarket /> },
      { path: "coin/:id", element: <CoinDetail /> },
      { path: "converter", element: <Converter /> },
    ],
  },
]);

export default router;
