import { describe, expect, it } from "vitest";
import { list } from "sicp";
import {
  add,
  denom,
  make_polynomial,
  make_rational,
  make_term,
  numer,
} from "./exercise2.97.js";

describe("exercise 2.97", () => {
  it("tests the reduce function", () => {
    const r1 = make_rational(4, 7);
    const r2 = make_rational(30, 33);
    const sum_r1_r2 = add(r1, r2);
    expect(numer(sum_r1_r2)).toBe(114);
    expect(denom(sum_r1_r2)).toBe(77);

    const p1 = make_polynomial("x", list(make_term(1, 1), make_term(0, 1)));
    const p2 = make_polynomial("x", list(make_term(3, 1), make_term(0, -1)));
    const p3 = make_polynomial("x", list(make_term(1, 1)));
    const p4 = make_polynomial("x", list(make_term(2, 1), make_term(0, -1)));
    const rf1 = make_rational(p1, p2);
    const rf2 = make_rational(p3, p4);
    const sum_rf1_rf2 = add(rf1, rf2);
    expect(numer(sum_rf1_rf2)).toEqual(
      make_polynomial(
        "x",
        list(
          make_term(3, 1),
          make_term(2, 2),
          make_term(1, 3),
          make_term(0, 1),
        ),
      ),
    );
    expect(denom(sum_rf1_rf2)).toEqual(
      make_polynomial(
        "x",
        list(
          make_term(4, 1),
          make_term(3, 1),
          make_term(1, -1),
          make_term(0, -1),
        ),
      ),
    );
  });
});
