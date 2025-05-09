import { expect, test } from "vitest";
import { list, pair } from "sicp";
import { count_pairs } from "./exercise3.17.js";

test("exercise 3.17", () => {
  const z1 = list("a", "b", "c");

  expect(count_pairs(z1)).toBe(3);

  const x = pair("a", null);
  const y = pair(x, x);
  const z2 = pair("b", y);

  expect(count_pairs(z2)).toBe(3);

  const z3 = pair(y, y);

  expect(count_pairs(z3)).toBe(3);

  const z4 = pair("b", pair(pair("a", null), pair("a", null)));

  expect(count_pairs(z4)).toBe(4);
});
