import { instance as axios } from "./axiosInstance";
const BASE_URL = "https://api.coingecko.com/api/v3";

export const getMarketData = async (currency: string) => {
  const response = await axios.get(`${BASE_URL}/coins/markets`, {
    params: {
      vs_currency: currency,
      order: "market_cap_desc",
      per_page: 50,
      page: 1,
      sparkline: false,
    },
  });
  return response.data;
};
