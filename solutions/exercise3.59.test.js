import { describe, expect, it } from "vitest";
import { integers, scale_stream, stream_ref } from "./stream.js";
import {
  cosine_series,
  integrate_series,
  sine_series,
} from "./exercise3.59.js";

describe("exercise 3.59", () => {
  it("tests the function integrate_series", () => {
    const s1 = integers;
    const s1_integrated = integrate_series(s1);

    expect(stream_ref(s1_integrated, 0)).toBe(1);
    expect(stream_ref(s1_integrated, 1)).toBe(1);
    expect(stream_ref(s1_integrated, 2)).toBe(1);
    expect(stream_ref(s1_integrated, 3)).toBe(1);
    expect(stream_ref(s1_integrated, 4)).toBe(1);

    const s2 = scale_stream(integers, 2);
    const s2_integrated = integrate_series(s2);

    expect(stream_ref(s2_integrated, 0)).toBe(2);
    expect(stream_ref(s2_integrated, 1)).toBe(2);
    expect(stream_ref(s2_integrated, 2)).toBe(2);
    expect(stream_ref(s2_integrated, 3)).toBe(2);
    expect(stream_ref(s2_integrated, 4)).toBe(2);
  });

  it("tests the constant cosine_series", () => {
    expect(stream_ref(cosine_series, 0)).toBeCloseTo(1);
    expect(stream_ref(cosine_series, 1)).toBeCloseTo(0);
    expect(stream_ref(cosine_series, 2)).toBeCloseTo(-1 / 2);
    expect(stream_ref(cosine_series, 3)).toBeCloseTo(0);
    expect(stream_ref(cosine_series, 4)).toBeCloseTo(1 / 4 / 3 / 2);
    expect(stream_ref(cosine_series, 5)).toBeCloseTo(0);
  });

  it("tests the constant sine_series", () => {
    expect(stream_ref(sine_series, 0)).toBeCloseTo(0);
    expect(stream_ref(sine_series, 1)).toBeCloseTo(1);
    expect(stream_ref(sine_series, 2)).toBeCloseTo(0);
    expect(stream_ref(sine_series, 3)).toBeCloseTo(-1 / 3 / 2);
    expect(stream_ref(sine_series, 4)).toBeCloseTo(0);
    expect(stream_ref(sine_series, 5)).toBeCloseTo(1 / 5 / 4 / 3 / 2);
  });
});
