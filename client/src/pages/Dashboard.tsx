import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import PortfolioForm from "../components/PortfolioForm";

export default function Dashboard() {
  const { token } = useAuth();
  const [portfolio, setPortfolio] = useState([]);

  const fetchPortfolio = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/portfolio", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPortfolio(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this item?")) return;
    try {
      await axios.delete(`http://localhost:3000/portfolio/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPortfolio();
    } catch (err: any) {
      alert("Failed to delete: " + err.response?.data?.message);
    }
  };

  useEffect(() => {
    if (token) fetchPortfolio();
  }, [token]);

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">📊 Your Portfolio</h1>

      <div className="mb-10">
        <PortfolioForm onSuccess={fetchPortfolio} />
      </div>

      <div className="grid gap-4">
        {portfolio.length === 0 ? (
          <p className="text-gray-500">No portfolio data found.</p>
        ) : (
          portfolio.map((item: any) => (
            <div
              key={item._id}
              className="bg-white shadow-md rounded-xl p-4 flex justify-between items-center"
            >
              <div>
                <p className="text-lg font-semibold">
                  {item.coinId.toUpperCase()}
                </p>
                <p className="text-sm text-gray-600">
                  Amount: {item.amount}, Buy Price: ${item.buyPrice}
                </p>
              </div>
              <button
                onClick={() => handleDelete(item._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
