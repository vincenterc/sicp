import { describe, expect, it } from "vitest";
import {
  add,
  drop,
  make_complex_from_real_imag,
  make_integer,
  make_real,
} from "./exercise2.85.js";
import { make_rational } from "./exercise2.84.js";

describe("exercise 2.85", () => {
  it("tests the drop function", () => {
    expect(drop(make_complex_from_real_imag(1.5, 0))).toEqual(make_real(1.5));
    expect(drop(make_complex_from_real_imag(1, 0))).toEqual(make_integer(1));
    expect(drop(make_complex_from_real_imag(2, 3))).toEqual(
      make_complex_from_real_imag(2, 3),
    );
  });

  it("tests the apply_generic function", () => {
    expect(add(make_real(1.5), make_real(0.5))).toEqual(make_integer(2));
    expect(add(make_rational(1, 3), make_rational(2, 3))).toEqual(
      make_integer(1),
    );
    expect(
      add(
        make_complex_from_real_imag(1, 2),
        make_complex_from_real_imag(3, -2),
      ),
    ).toEqual(make_integer(4));
    expect(
      add(
        make_complex_from_real_imag(1.5, 2),
        make_complex_from_real_imag(3, -2),
      ),
    ).toEqual(make_real(4.5));
  });
});
