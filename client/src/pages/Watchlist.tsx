import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { Coin } from "../types/Coin";
import type { RootState } from "../store/store";
import { getMarketData } from "../services/coingecko";
import WatchlistToggleButton from "../components/WatchlistToggleButton";
import { Link } from "react-router-dom";

export default function Watchlist() {
  const coinIds = useSelector((state: RootState) => state.watchlist.coins);
  const currency = useSelector((state: RootState) => state.currency.currency);
  const symbol = useSelector((state: RootState) => state.currency.symbol);
  const [coins, setCoins] = useState<Coin[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (coinIds.length === 0) {
        setCoins([]);
        return;
      }

      const data = await getMarketData(currency);
      const filtered = data.filter((coin: Coin) => coinIds.includes(coin.id));
      setCoins(filtered);
    };

    fetchData();
  }, [coinIds, currency]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Watchlist</h1>
      {coins.length === 0 ? (
        <p className="text-gray-400">
          Watchlist kosong. Tambahkan dari halaman market.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {coins.map((coin) => (
            <div key={coin.id} className="bg-gray-800 rounded-lg p-4 shadow-md">
              <div className="flex items-center justify-between">
                <Link to={`/coin/${coin.id}`}>
                  <div className="flex items-center gap-3">
                    <img src={coin.image} alt={coin.name} className="w-8 h-8" />
                    <div>
                      <p className="font-semibold">{coin.name}</p>
                      <p className="text-sm text-gray-400">
                        {coin.symbol.toUpperCase()}
                      </p>
                    </div>
                  </div>
                </Link>
                <WatchlistToggleButton coinId={coin.id} />
              </div>
              <p className="mt-2">
                Price:{" "}
                <span className="font-medium">
                  {symbol}
                  {coin.current_price.toLocaleString()}
                </span>
              </p>
              <p
                className={`mt-1 ${
                  coin.price_change_percentage_24h >= 0
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                24h: {coin.price_change_percentage_24h.toFixed(2)}%
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
