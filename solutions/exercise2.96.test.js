import { describe, expect, it } from "vitest";
import { list } from "sicp";
import {
  greatest_common_divisor,
  make_polynomial,
  make_term,
  mul,
} from "./exercise2.96.js";

describe("exercise 2.96", () => {
  it("tests the gcd of two polynomials", () => {
    const p1 = make_polynomial(
      "x",
      list(make_term(2, 1), make_term(1, -2), make_term(0, 1)),
    );
    const p2 = make_polynomial("x", list(make_term(2, 11), make_term(0, 7)));
    const p3 = make_polynomial("x", list(make_term(1, 13), make_term(0, 5)));
    const q1 = mul(p1, p2);
    const q2 = mul(p1, p3);

    expect(greatest_common_divisor(q1, q2)).toEqual(p1);
  });
});
