import axios from "axios";

export const fetchCoinList = async () => {
  const { data } = await axios.get(
    "https://pro-api.coingecko.com/api/v3/coins/list"
  );
  return data;
};
