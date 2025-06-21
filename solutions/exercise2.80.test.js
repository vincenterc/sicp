import { describe, expect, it } from "vitest";
import {
  is_equal_to_zero,
  make_complex_from_mag_ang,
  make_complex_from_real_imag,
  make_javascript_number,
  make_rational,
} from "./exercise2.80";
import { math_PI } from "sicp";

describe("exercise 2.80", () => {
  it("tests the is_equal_to_zero function", () => {
    expect(is_equal_to_zero(make_javascript_number(0))).toBeTruthy();
    expect(is_equal_to_zero(make_javascript_number(1))).toBeFalsy();
    expect(is_equal_to_zero(make_rational(0, 2))).toBeTruthy();
    expect(is_equal_to_zero(make_rational(1, 2))).toBeFalsy();
    expect(is_equal_to_zero(make_complex_from_real_imag(0, 0))).toBeTruthy();
    expect(is_equal_to_zero(make_complex_from_real_imag(3, 4))).toBeFalsy();
    expect(
      is_equal_to_zero(make_complex_from_mag_ang(0, math_PI)),
    ).toBeTruthy();
    expect(is_equal_to_zero(make_complex_from_mag_ang(5, math_PI))).toBeFalsy();
  });
});
