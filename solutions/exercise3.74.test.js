import { describe, expect, it } from "vitest";
import { list, stream_to_list } from "sicp";
import { zero_crossings } from "./exercise3.74.js";

describe("exercise 3.74", () => {
  it("tests the constant zero_crossings", () => {
    expect(stream_to_list(zero_crossings)).toEqual(
      list(0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1, 0, 0)
    );
  });
});
