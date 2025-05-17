import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

interface Props {
  onSuccess: () => void;
}

interface Coin {
  id: string;
  name: string;
  symbol: string;
}

export default function PortfolioForm({ onSuccess }: Props) {
  const { token } = useAuth();
  const [coins, setCoins] = useState<Coin[]>([]);
  const [coinId, setCoinId] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [buyPrice, setBuyPrice] = useState<number>(0);
  const [note, setNote] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCoins = async () => {
      try {
        const list = await axios.get("http://localhost:3000/coins/list");
        console.log(list);
        setCoins(list.data);
      } catch (err) {
        setError("⚠️ Failed to load coin list.");
      }
    };
    loadCoins();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post(
        `http:localhost:3000/portofolio`,
        { coinId, amount, buyPrice, note },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onSuccess();
      setCoinId("");
      setAmount(0);
      setBuyPrice(0);
      setNote("");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to add portfolio item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-lg space-y-6 text-green-400"
    >
      <h2 className="text-2xl font-semibold text-gray-800">
        ➕ Add Portfolio Item
      </h2>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Coin
        </label>
        <select
          value={coinId}
          onChange={(e) => setCoinId(e.target.value)}
          required
          className="w-full border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">-- Select Coin --</option>
          {coins.map((coin) => (
            <option key={coin.id} value={coin.id}>
              {coin.name} ({coin.symbol})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Amount
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          required
          className="w-full border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Buy Price (USD)
        </label>
        <input
          type="number"
          value={buyPrice}
          onChange={(e) => setBuyPrice(parseFloat(e.target.value))}
          required
          className="w-full border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Note
        </label>
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 px-4 text-white font-medium rounded-lg ${
          loading
            ? "bg-blue-300 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Submitting..." : "Add to Portfolio"}
      </button>
    </form>
  );
}
