import { describe, expect, it } from "vitest";
import { ones, stream_ref } from "./stream.js";
import { RC } from "./exercise3.73.js";

describe("exercise 3.73", () => {
  it("tests the function RC", () => {
    const RC1 = RC(5, 1, 0.5);
    const s = RC1(ones, 0);

    expect(stream_ref(s, 0)).toBe(5);
    expect(stream_ref(s, 1)).toBe(5.5);
    expect(stream_ref(s, 2)).toBe(6.0);
    expect(stream_ref(s, 3)).toBe(6.5);
    expect(stream_ref(s, 4)).toBe(7.0);
  });
});
