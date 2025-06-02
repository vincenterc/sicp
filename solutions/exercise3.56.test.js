import { describe, expect, it } from "vitest";
import { stream_ref } from "sicp";
import { S } from "./exercise3.56.js";

describe("exercise 3.56", () => {
  it("tests the stream S", () => {
    expect(stream_ref(S, 0)).toBe(1);
    expect(stream_ref(S, 1)).toBe(2);
    expect(stream_ref(S, 2)).toBe(3);
    expect(stream_ref(S, 3)).toBe(4);
    expect(stream_ref(S, 4)).toBe(5);
    expect(stream_ref(S, 5)).toBe(6);
    expect(stream_ref(S, 6)).toBe(8);
    expect(stream_ref(S, 7)).toBe(9);
    expect(stream_ref(S, 8)).toBe(10);
  });
});
