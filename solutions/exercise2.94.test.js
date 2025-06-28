import { describe, expect, it } from "vitest";
import { list } from "sicp";
import {
  greatest_common_divisor,
  make_polynomial,
  make_term,
} from "./exercise2.94.js";

describe("exercise 2.94", () => {
  it("tests the greatest_common_divisor function", () => {
    expect(greatest_common_divisor(128, 40)).toBe(8);

    const p1 = make_polynomial(
      "x",
      list(
        make_term(4, 1),
        make_term(3, -1),
        make_term(2, -2),
        make_term(1, 2),
      ),
    );
    const p2 = make_polynomial("x", list(make_term(3, 1), make_term(1, -1)));

    expect(greatest_common_divisor(p1, p2)).toEqual(
      make_polynomial("x", list(make_term(2, -1), make_term(1, 1))),
    );
  });
});
