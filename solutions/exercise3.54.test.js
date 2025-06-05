import { describe, expect, it } from "vitest";
import { stream_ref } from "./stream.js";
import { factorials } from "./exercise3.54.js";

describe("exercise 3.54", () => {
  it("tests the function factorials", () => {
    expect(stream_ref(factorials, 0)).toBe(1);
    expect(stream_ref(factorials, 1)).toBe(2);
    expect(stream_ref(factorials, 2)).toBe(6);
    expect(stream_ref(factorials, 3)).toBe(24);
    expect(stream_ref(factorials, 4)).toBe(120);
  });
});
