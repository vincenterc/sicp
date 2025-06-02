import { pair } from "sicp";
import { add_streams } from "./stream.js";

const s = pair(1, () => add_streams(s, s));
// 1, 2, 4, 8, 16, ...
