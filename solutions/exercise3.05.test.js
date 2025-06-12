import { describe, expect, it } from "vitest";
import { estimate_integral, unit_circle_test } from "./exercise3.05";

describe("exercise 3.5", () => {
  it("tests the function estimate_integral", () => {
    const pi = estimate_integral(unit_circle_test, 1, 1, -1, -1, 8000);

    expect(pi).toBeGreaterThan(3);
    expect(pi).toBeLessThan(4);
  });
});
