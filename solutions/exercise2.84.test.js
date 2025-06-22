import { describe, expect, it } from "vitest";
import {
  add,
  make_complex_from_real_imag,
  make_integer,
  make_rational,
  make_real,
} from "./exercise2.84";

describe("exercise 2.84", () => {
  it("tests the apply_generic function", () => {
    expect(add(make_integer(1), make_complex_from_real_imag(2, 3))).toEqual(
      make_complex_from_real_imag(3, 3),
    );
    expect(add(make_rational(1, 2), make_complex_from_real_imag(2, 3))).toEqual(
      make_complex_from_real_imag(2.5, 3),
    );
    expect(add(make_real(1.41), make_complex_from_real_imag(2, 3))).toEqual(
      make_complex_from_real_imag(3.41, 3),
    );
    expect(add(make_rational(1, 2), make_integer(3))).toEqual(
      make_rational(7, 2),
    );
    expect(add(make_real(1.5), make_rational(1, 2))).toEqual(make_real(2));
  });
});
