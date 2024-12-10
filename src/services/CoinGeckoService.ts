import axios from "axios";

export const fetchCoinGecko = async () => {
  const url = "https://api.coingecko.com/api/v3/coins/markets";
  const params = {
    vs_currency: "usd",
    per_page: 10,
  };
  const response = await axios.get(url, { params });
  return response.data;
};
