import { expect, test } from "vitest";
import { math_sqrt } from "sicp";
import { make_monitored } from "./exercise3.02.js";

test("exercise 3.2", () => {
  const s = make_monitored(math_sqrt);

  expect(s(100)).toBe(10);
  expect(s("how many calls")).toBe(1);
});
