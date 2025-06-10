import { describe, expect, it } from "vitest";
import { list, stream_to_list } from "sicp";
import { stream_take } from "./stream.js";
import { zero_crossings } from "./exercise3.75.js";

describe("exercise 3.75", () => {
  it("tests the constant sense_data", () => {
    expect(stream_to_list(stream_take(zero_crossings, 13))).toEqual(
      list(0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1, 0)
    );
  });
});
