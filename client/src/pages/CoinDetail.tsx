import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { getCoinDetail, getCoinMarketChart } from "../services/coingecko";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function CoinDetail() {
  const { id } = useParams();
  const currency = useSelector((state: RootState) =>
    state.currency.currency.toLowerCase()
  );
  const symbol = useSelector((state: RootState) => state.currency.symbol);

  const [coin, setCoin] = useState<any>(null);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const detail = await getCoinDetail(id);
        setCoin(detail);

        const chart = await getCoinMarketChart(id, currency);
        const formattedChart = chart.prices.map(
          ([timestamp, price]: [number, number]) => ({
            date: new Date(timestamp).toLocaleDateString(),
            price,
          })
        );
        setChartData(formattedChart);
      } catch (error) {
        console.error("Failed to fetch coin data:", error);
      }
    };

    fetchData();
  }, [id, currency]);

  if (!coin) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4">
      <div className="flex items-center gap-4 mb-6">
        <img src={coin.image.large} alt={coin.name} className="w-10 h-10" />
        <h1 className="text-2xl font-bold">
          {coin.name} ({coin.symbol.toUpperCase()})
        </h1>
      </div>

      <p className="text-lg mb-4">
        Current Price:{" "}
        <strong>
          {symbol}
          {coin.market_data.current_price?.[currency]?.toLocaleString?.() ??
            "N/A"}
        </strong>
      </p>
      <p className="text-sm text-gray-400 mb-6">
        Market Cap: {symbol}
        {coin.market_data.market_cap?.[currency]?.toLocaleString?.() ?? "N/A"}
      </p>

      <h2 className="text-xl font-semibold mb-2">7 Day Price Chart</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#3b82f6"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
