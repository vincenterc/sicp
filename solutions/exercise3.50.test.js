import { describe, expect, it } from "vitest";
import { plus, times } from "./math.js";
import { stream_enumerate_interval, stream_ref } from "./stream.js";
import { stream_map_2, stream_map_2_optimized } from "./exercise3.50.js";

describe("exercise 3.50", () => {
  it("tests the function stream_map_2", () => {
    const s = stream_map_2(
      plus,
      stream_enumerate_interval(1, 3),
      stream_enumerate_interval(11, 13)
    );

    expect(stream_ref(s, 0)).toBe(12);
    expect(stream_ref(s, 1)).toBe(14);
    expect(stream_ref(s, 2)).toBe(16);
  });

  it("tests the function stream_map_2_optimized"),
    () => {
      const s = stream_map_2_optimized(
        times,
        stream_enumerate_interval(1, 3),
        stream_enumerate_interval(4, 6)
      );

      expect(stream_ref(s, 0)).toBe(4);
      expect(stream_ref(s, 1)).toBe(10);
      expect(stream_ref(s, 2)).toBe(18);
    };
});
