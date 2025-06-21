import { describe, expect, it } from "vitest";
import { add } from "./exercise2.78.js";

describe("exercise 2.78", () => {
  it("tests arithmetic with ordinary numbers", () => {
    expect(add(4, 5)).toBe(9);
  });
});
