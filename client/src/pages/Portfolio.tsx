import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { useEffect, useState } from "react";
import { getMarketData } from "../services/coingecko";
import axios from "axios";
import type { Coin } from "../types/Coin";

type Holding = {
  coinId: string;
  amount: number;
};

export default function Portfolio() {
  const currency = useSelector((state: RootState) => state.currency.currency);
  const symbol = useSelector((state: RootState) => state.currency.symbol);

  const [coins, setCoins] = useState<Coin[]>([]);
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const token = localStorage.getItem("access_token");

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/portfolio`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const portfolioData: Holding[] = res.data;
        setHoldings(portfolioData);

        const marketData = await getMarketData(currency);
        const filteredCoins = marketData.filter((coin: Coin) =>
          portfolioData.some((h) => h.coinId === coin.id)
        );

        setCoins(filteredCoins);
      } catch (err) {
        console.error("Gagal memuat portofolio:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [currency]);

  const holdingMap = new Map(holdings.map((h) => [h.coinId, h.amount]));

  const totalValue = coins.reduce((acc, coin) => {
    const amount = holdingMap.get(coin.id) || 0;
    return acc + coin.current_price * amount;
  }, 0);

  if (loading) return <p className="p-4">Loading portfolio...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Portfolio</h1>

      {coins.length === 0 ? (
        <p className="text-gray-400">
          Portofolio kosong. Tambahkan koin dan jumlah dari halaman market.
        </p>
      ) : (
        <>
          <div className="mb-6">
            <h2 className="text-lg font-semibold">Total Value</h2>
            <p className="text-xl font-bold">
              {symbol}
              {totalValue.toLocaleString()}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {coins.map((coin) => {
              const amount = holdingMap.get(coin.id) || 0;
              const value = coin.current_price * amount;

              return (
                <div
                  key={coin.id}
                  className="bg-gray-800 rounded p-4 shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={coin.image}
                        alt={coin.name}
                        className="w-8 h-8"
                      />
                      <div>
                        <p className="font-semibold">{coin.name}</p>
                        <p className="text-sm text-gray-400">
                          {coin.symbol.toUpperCase()}
                        </p>
                      </div>
                    </div>
                    {/* Optional: Remove from server */}
                  </div>
                  <p className="mt-2">Amount: {amount}</p>
                  <p>
                    Value: {symbol}
                    {value.toLocaleString()}
                  </p>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
