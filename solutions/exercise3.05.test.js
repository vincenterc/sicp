import { expect, test } from "vitest";
import { estimate_integral, unit_circle_test } from "./exercise3.05";

test("exercise 3.5", () => {
  expect(
    estimate_integral(unit_circle_test, 1, 1, -1, -1, 8000)
  ).toBeGreaterThanOrEqual(3);
  expect(
    estimate_integral(unit_circle_test, 1, 1, -1, -1, 8000)
  ).toBeLessThanOrEqual(4);
});
