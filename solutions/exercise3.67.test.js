import { describe, expect, it } from "vitest";
import { list } from "sicp";
import { integers, stream_ref } from "./stream.js";
import { pairs } from "./exercise3.67.js";

describe("exercise 3.67", () => {
  it("tests the function pairs", () => {
    const p = pairs(integers, integers);

    expect(stream_ref(p, 0)).toEqual(list(1, 1));
    expect(stream_ref(p, 1)).toEqual(list(1, 2));
    expect(stream_ref(p, 2)).toEqual(list(2, 2));
    expect(stream_ref(p, 3)).toEqual(list(2, 1));
    expect(stream_ref(p, 4)).toEqual(list(2, 3));
    expect(stream_ref(p, 5)).toEqual(list(1, 3));
    expect(stream_ref(p, 11)).toEqual(list(4, 1));
    expect(stream_ref(p, 12)).toEqual(list(2, 4));
    expect(stream_ref(p, 13)).toEqual(list(1, 5));
    expect(stream_ref(p, 14)).toEqual(list(4, 4));
    expect(stream_ref(p, 15)).toEqual(list(5, 1));
  });
});
