import { describe, expect, it } from "vitest";
import { head, list, tail } from "sicp";
import { square } from "./math.js";
import { integers, stream_ref } from "./stream.js";
import { pythagorean, triples } from "./exercise3.69.js";

describe("exercise 3.69", () => {
  it("test the function triples", () => {
    const t = triples(integers, integers, integers);

    expect(stream_ref(t, 0)).toEqual(list(1, 1, 1));
    expect(stream_ref(t, 1)).toEqual(list(1, 1, 2));
    expect(stream_ref(t, 2)).toEqual(list(2, 2, 2));
    expect(stream_ref(t, 3)).toEqual(list(1, 2, 2));
    expect(stream_ref(t, 4)).toEqual(list(2, 2, 3));
    expect(stream_ref(t, 5)).toEqual(list(1, 1, 3));
    expect(stream_ref(t, 6)).toEqual(list(3, 3, 3));
    expect(stream_ref(t, 7)).toEqual(list(1, 2, 3));
    expect(stream_ref(t, 8)).toEqual(list(2, 3, 3));
    expect(stream_ref(t, 9)).toEqual(list(1, 1, 4));
    expect(stream_ref(t, 10)).toEqual(list(3, 3, 4));
    expect(stream_ref(t, 11)).toEqual(list(1, 3, 3));
    expect(stream_ref(t, 12)).toEqual(list(2, 2, 4));
    expect(stream_ref(t, 13)).toEqual(list(1, 1, 5));
    expect(stream_ref(t, 14)).toEqual(list(4, 4, 4));
    expect(stream_ref(t, 15)).toEqual(list(1, 2, 4));
  });

  it("tests the constant pythagorean", () => {
    const p0 = stream_ref(pythagorean, 0);
    expect(square(head(p0)) + square(head(tail(p0)))).toBe(
      square(head(tail(tail(p0)))),
    );

    const p1 = stream_ref(pythagorean, 1);
    expect(square(head(p1)) + square(head(tail(p1)))).toBe(
      square(head(tail(tail(p1)))),
    );
  });
});
