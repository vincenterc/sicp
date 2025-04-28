import { describe, expect, it } from "vitest";
import { make_f } from "./exercise3.08";

describe("exercise 3.8", () => {
  it("returns 0 when evaluating from left to right", () => {
    const f = make_f();

    expect(f(0) + f(1)).toBe(0);
  });

  it("returns 1 when evaluating from right to left", () => {
    const f = make_f();

    expect(f(1) + f(0)).toBe(1);
  });
});
