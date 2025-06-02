import { describe, expect, it } from "vitest";
import { integers, mul_series } from "./stream.js";
import { invert_unit_series } from "./exercise3.61.js";
import { stream_ref } from "sicp";

describe("exercise 3.61", () => {
  it("tests the function invert_unit_series", () => {
    const one = mul_series(integers, invert_unit_series(integers));

    expect(stream_ref(one, 0)).toBe(1);
    expect(stream_ref(one, 1)).toBe(0);
    expect(stream_ref(one, 2)).toBe(0);
    expect(stream_ref(one, 3)).toBe(0);
    expect(stream_ref(one, 4)).toBe(0);
    expect(stream_ref(one, 5)).toBe(0);
  });
});
