// import axios from "axios";

// const NEWS_API_KEY = process.env.NEWS_API_KEY as string;
// const NEWS_API_URL = "https://newsapi.org/v2/everything";

// export const fetchCryptoNews = async (query: string = "cryptocurrency") => {
//   try {
//     const response = await axios.get(NEWS_API_URL, {
//       params: {
//         q: query,
//         apiKey: NEWS_API_KEY,
//         language: "en",
//         sortBy: "publishedAt",
//         pageSize: 10,
//       },
//     });

//     return response.data.articles;
//   } catch (error) {
//     console.error("Error fetching news:", error);
//   }
// };
