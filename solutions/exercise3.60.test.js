import { describe, expect, it } from "vitest";
import { stream_ref } from "sicp";
import { add_streams } from "./stream.js";
import { cosine_series, sine_series } from "./exercise3.59.js";
import { mul_series } from "./exercise3.60.js";

describe("exercise 3.60", () => {
  it("tests the function mul_series", () => {
    const one = add_streams(
      mul_series(sine_series, sine_series),
      mul_series(cosine_series, cosine_series)
    );

    expect(stream_ref(one, 0)).toBeCloseTo(1);
    expect(stream_ref(one, 1)).toBeCloseTo(0);
    expect(stream_ref(one, 2)).toBeCloseTo(0);
    expect(stream_ref(one, 3)).toBeCloseTo(0);
    expect(stream_ref(one, 4)).toBeCloseTo(0);
    expect(stream_ref(one, 5)).toBeCloseTo(0);
  });
});
