import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { addToWatchlist, removeFromWatchlist } from "../slices/watchlistSlice";

interface Props {
  coinId: string;
}

export default function WatchlistToggleButton({ coinId }: Props) {
  const dispatch = useDispatch();
  const watchlist = useSelector((state: RootState) => state.watchlist.coins);
  const isInWatchlist = watchlist.includes(coinId);

  const toggleWatchlist = () => {
    if (isInWatchlist) {
      dispatch(removeFromWatchlist(coinId));
    } else {
      dispatch(addToWatchlist(coinId));
    }
  };

  return (
    <button
      onClick={toggleWatchlist}
      className={`p-2 rounded ${
        isInWatchlist ? "bg-red-600" : "bg-green-600"
      } text-white`}
    >
      {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
    </button>
  );
}
