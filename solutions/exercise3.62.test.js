import { describe, expect, it } from "vitest";
import { stream_ref } from "sicp";
import { tangent_series } from "./exercise3.62.js";

describe("exercise 3.62", () => {
  it("tests the constant tangent_series", () => {
    expect(stream_ref(tangent_series, 0)).toBeCloseTo(0);
    expect(stream_ref(tangent_series, 1)).toBeCloseTo(1);
    expect(stream_ref(tangent_series, 2)).toBeCloseTo(0);
    expect(stream_ref(tangent_series, 3)).toBeCloseTo(1 / 3);
    expect(stream_ref(tangent_series, 4)).toBeCloseTo(0);
    expect(stream_ref(tangent_series, 5)).toBeCloseTo(2 / 15);
    expect(stream_ref(tangent_series, 6)).toBeCloseTo(0);
    expect(stream_ref(tangent_series, 7)).toBeCloseTo(17 / 315);
  });
});
