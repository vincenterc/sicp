import { describe, expect, it } from "vitest";
import { stream_ref } from "./stream.js";
import { solve } from "./exercise3.77.js";

describe("exercise 3.77", () => {
  it("tests the function integral", () => {
    expect(
      stream_ref(
        solve((y) => y, 1, 0.001),
        1000,
      ),
    ).toBeCloseTo(2.716924, 6);
  });
});
