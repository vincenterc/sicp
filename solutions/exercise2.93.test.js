import { describe, expect, it } from "vitest";
import { list } from "sicp";
import {
  add,
  make_polynomial,
  make_rational,
  make_term,
  mul,
} from "./exercise2.93.js";

describe("exercise 2.93", () => {
  it("tests the rational package", () => {
    const p1 = make_polynomial("x", list(make_term(2, 1), make_term(0, 1)));
    const p2 = make_polynomial("x", list(make_term(3, 1), make_term(0, 1)));
    const rf = make_rational(p2, p1);

    expect(add(rf, rf)).toEqual(
      make_rational(
        make_polynomial(
          "x",
          list(
            make_term(5, 2),
            make_term(3, 2),
            make_term(2, 2),
            make_term(0, 2),
          ),
        ),
        make_polynomial(
          "x",
          list(make_term(4, 1), make_term(2, 2), make_term(0, 1)),
        ),
      ),
    );
    expect(mul(rf, rf)).toEqual(
      make_rational(
        make_polynomial(
          "x",
          list(make_term(6, 1), make_term(3, 2), make_term(0, 1)),
        ),
        make_polynomial(
          "x",
          list(make_term(4, 1), make_term(2, 2), make_term(0, 1)),
        ),
      ),
    );
  });
});
