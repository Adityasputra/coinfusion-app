import "dotenv/config";
import { connect } from "./config/mongoose";

(async () => {
  await connect();
})();
