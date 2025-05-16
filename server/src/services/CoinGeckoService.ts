// import axios from "axios";

// const BASE_URL = "https://api.coingecko.com/api/v3";

// export const fetchCryptocurrencies = async (
//   vs_currency: string = "usd",
//   page: number = 1,
//   per_page: number = 10
// ) => {
//   try {
//     const response = await axios.get(`${BASE_URL}/coins/markets`, {
//       params: {
//         vs_currency,
//         order: "market_cap_desc",
//         per_page,
//         page,
//         sparkline: false,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching cryptocurrencies:", error);
//     throw error;
//   }
// };
