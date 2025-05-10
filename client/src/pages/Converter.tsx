import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { useEffect, useState } from "react";
import { getSimplePrice } from "../services/coingecko";

const coins = ["bitcoin", "ethereum", "tether", "bnb", "solana"];

export default function Converter() {
  const currency = useSelector((state: RootState) =>
    state.currency.currency.toLowerCase()
  );
  const symbol = useSelector((state: RootState) =>
    state.currency.symbol.toLowerCase()
  );

  const [fromCoin, setFromCoin] = useState("bitcoin");
  const [toCurrency, setToCurrency] = useState(currency);
  const [amount, setAmount] = useState(1);
  const [converted, setConverted] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSimplePrice([fromCoin], [toCurrency]);
      const rate = data[fromCoin][toCurrency];
      setConverted(rate * amount);
    };
    fetchData();
  }, [fromCoin, toCurrency, amount]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Crypto Converter</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md">
        <div>
          <label className="block mb-1">From Coin</label>
          <select
            value={fromCoin}
            onChange={(e) => setFromCoin(e.target.value)}
            className="p-2 w-full rounded bg-gray-800 text-white"
          >
            {coins.map((coin) => (
              <option key={coin} value={coin}>
                {coin.charAt(0).toUpperCase() + coin.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">To Currency</label>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="p-2 w-full rounded bg-gray-800 text-white"
          >
            {[currency, ...coins].map((c) => (
              <option key={c} value={c}>
                {c.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            className="p-2 w-full rounded bg-gray-800 text-white"
          />
        </div>
      </div>

      <p className="mt-6 text-lg">
        {amount} {fromCoin.toUpperCase()} ={" "}
        {converted !== null ? (
          <strong>
            {toCurrency === "usd" || toCurrency === "eur" ? symbol : ""}
            {converted.toLocaleString()} {toCurrency.toUpperCase()}
          </strong>
        ) : (
          "Loading..."
        )}
      </p>
    </div>
  );
}
