import { expect, test } from "vitest";
import { list, pair } from "sicp";
import { make_cycle } from "./exercise3.18.js";
import { does_contain_cycle } from "./exercise3.19.js";

test("exercise3.19", () => {
  const z = list(1, 2, 3);
  const z_cycle = make_cycle(list(1, 2, 3));
  const z_cycle_2 = pair(1, make_cycle(list(2, 3)));

  expect(does_contain_cycle(z)).toBe(false);
  expect(does_contain_cycle(z_cycle)).toBe(true);
  expect(does_contain_cycle(z_cycle_2)).toBe(true);
});
