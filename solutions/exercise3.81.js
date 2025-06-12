import { head, is_pair, pair, tail } from "sicp";
import { stream_tail } from "./stream.js";

const rand_init = 11;

function make_rand(request_stream) {
  function helper(reqs, rand) {
    if (reqs === null) {
      return null;
    } else {
      const first = head(reqs);

      if (first === "generate") {
        return pair(rand, () => helper(stream_tail(reqs), rand_update(rand)));
      } else if (is_pair(first) && head(first) === "reset") {
        return helper(stream_tail(reqs), rand_update(tail(first)));
      } else {
        return error(first, "unknown argument -- make_rand");
      }
    }
  }

  return helper(request_stream, rand_update(rand_init));
}

function rand_update(x) {
  // minimal standard random number generator
  const a = 16807; // 7^5
  const b = 0;
  const m = 2147483647; // 2^31 - 1

  return (a * x + b) % m;
}

export { make_rand };
