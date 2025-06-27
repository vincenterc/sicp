import { describe, expect, it } from "vitest";
import { list } from "sicp";
import { make_polynomial, negate, sub } from "./exercise2.88.js";

describe("exercise 2.88", () => {
  it("tests the negate function", () => {
    expect(negate(2)).toBe(-2);
    expect(negate(make_polynomial("x", list(list(2, 1))))).toEqual(
      make_polynomial("x", list(list(2, -1))),
    );
  });

  it("tests the sub function", () => {
    expect(
      sub(
        make_polynomial("x", list(list(3, 1), list(1, 2))),
        make_polynomial("x", list(list(2, 2), list(1, 1), list(0, -1))),
      ),
    ).toEqual(
      make_polynomial(
        "x",
        list(list(3, 1), list(2, -2), list(1, 1), list(0, 1)),
      ),
    );
  });
});
