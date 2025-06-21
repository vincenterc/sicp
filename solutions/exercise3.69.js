import { head, list, pair, tail } from "sicp";
import { square } from "./math.js";
import {
  integers,
  interleave,
  pairs,
  stream_filter,
  stream_map,
  stream_tail,
} from "./stream.js";

function triples(s, t, u) {
  return pair(list(head(s), head(t), head(u)), () =>
    interleave(
      stream_map((x) => pair(head(s), x), stream_tail(pairs(t, u))),
      triples(stream_tail(s), stream_tail(t), stream_tail(u)),
    ),
  );
}

const pythagorean = stream_filter(
  (t) =>
    square(head(t)) + square(head(tail(t))) === square(head(tail(tail(t)))),
  triples(integers, integers, integers),
);

export { triples, pythagorean };
