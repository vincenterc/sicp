import { describe, expect, it } from "vitest";
import { sqrt } from "./exercise3.64.js";

describe("exercise 3.64", () => {
  it("tests the function sqrt", () => {
    expect(sqrt(2, 0.000001)).toBeCloseTo(1.414214, 6);
  });
});
