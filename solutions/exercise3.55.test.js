import { describe, expect, it } from "vitest";
import { stream_ref } from "sicp";
import { integers } from "./stream.js";
import { partial_sums } from "./exercise3.55.js";

describe("exercise 3.55", () => {
  it("tests the function partial_sums", () => {
    const ps_integers = partial_sums(integers);
    expect(stream_ref(ps_integers, 0)).toBe(1);
    expect(stream_ref(ps_integers, 1)).toBe(3);
    expect(stream_ref(ps_integers, 2)).toBe(6);
    expect(stream_ref(ps_integers, 3)).toBe(10);
    expect(stream_ref(ps_integers, 4)).toBe(15);
  });
});
