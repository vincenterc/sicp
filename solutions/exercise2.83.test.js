import { describe, expect, it } from "vitest";
import {
  make_complex_from_real_imag,
  make_integer,
  make_rational,
  make_real,
  raise,
} from "./exercise2.83.js";

describe("exercise 2.83", () => {
  it("tests the raise function", () => {
    expect(raise(make_integer(2))).toEqual(make_rational(2, 1));
    expect(raise(make_rational(1, 2))).toEqual(make_real(0.5));
    expect(raise(make_real(1.414))).toEqual(
      make_complex_from_real_imag(1.414, 0),
    );
  });
});
