import { instance as axios } from "./axiosInstance";
const BASE_URL = "https://api.coingecko.com/api/v3";

export const getMarketData = async (currency: string) => {
  try {
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
  } catch (error) {
    console.error("Error fetching market data:", error);
    throw error;
  }
};

export const getCoinDetail = async (id: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/coins/${id}`, {
      params: { localization: false },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching coin details:", error);
    throw error;
  }
};

export const getCoinMarketChart = async (id: string, currency: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/coins/${id}/market_chart`, {
      params: {
        vs_currency: currency,
        days: 7,
        interval: "daily",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching coin market chart:", error);
    throw error;
  }
};
