import { useEffect, useState } from "react";
import type { Coin } from "../types/Coin";
import { instance as axios } from "../services/axiosInstance";
import CurrencySelector from "../components/CurrencySelector";

export default function CoinMarket() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await axios({
          method: "get",
          url: "https://api.coingecko.com/api/v3/coins/markets",
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 10,
            page: 1,
            sparkline: false,
          },
        });

        setCoins(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching coins:", error);
      }
    };

    fetchCoins();
  }, []);

  return (
    <div className="container">
      <CurrencySelector />
      <h1>Coin Market</h1>
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Coin</th>
              <th>Price</th>
              <th>24h %</th>
              <th>Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin, index) => (
              <tr key={coin.id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={coin.image}
                    alt={coin.name}
                    width="20"
                    style={{ verticalAlign: "middle" }}
                  />
                  &nbsp; {coin.name} ({coin.symbol.toUpperCase()})
                </td>
                <td>${coin.current_price.toLocaleString()}</td>
                <td
                  style={{
                    color:
                      coin.price_change_percentage_24h >= 0 ? "green" : "red",
                  }}
                >
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </td>
                <td>${coin.market_cap.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
