import { describe, expect, it } from "vitest";
import { make_from_mag_ang } from "./exercise2.75.js";
import { math_PI } from "sicp";

describe("exercise 2.75", () => {
  it("tests the function", () => {
    const c = make_from_mag_ang(4, math_PI / 6);

    expect(c("real_part")).toBeCloseTo(3.4641, 4);
    expect(c("imag_part")).toBeCloseTo(2);
    expect(c("magnitude")).toBeCloseTo(4);
    expect(c("angle")).toBeCloseTo(0.5236, 4);
  });
});
