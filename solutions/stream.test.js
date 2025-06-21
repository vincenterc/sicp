import { describe, expect, it } from "vitest";
import { list, stream, stream_to_list } from "sicp";
import { stream_take } from "./stream.js";

describe("the stream library tests", () => {
  it("tests the function stream_take", () => {
    const s = stream(1, 2, 3, 4, 5);

    expect(stream_to_list(stream_take(s, 3))).toEqual(list(1, 2, 3));
    expect(() => stream_to_list(stream_take(s, -1))).toThrow(
      "stream_take: nonnegative integer expected, given: -1",
    );
    expect(() => stream_to_list(stream_take(s, 6))).toThrow(
      "stream_take: stream ended before index, index: 6",
    );
  });
});
