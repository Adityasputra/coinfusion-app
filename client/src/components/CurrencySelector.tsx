import { setCurrency } from "../slices/currencySlice";
import type { RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";

export default function CurrencySelector() {
  const currency = useSelector((state: RootState) => state.currency.currency);
  const dispatch = useDispatch();

  return (
    <select
      value={currency}
      onChange={(e) => dispatch(setCurrency(e.target.value))}
      className="bg-gray-800 text-white p-2 rounded"
    >
      <option value="usd">USD</option>
      <option value="eur">EUR</option>
    </select>
  );
}
