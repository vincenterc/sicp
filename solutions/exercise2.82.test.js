import { describe, expect, it } from "vitest";
import {
  add_3,
  make_complex_from_real_imag,
  make_javascript_number,
} from "./exercise2.82.js";

describe("exercise 2.82", () => {
  it("tests the apply_generic function", () => {
    expect(
      add_3(
        make_javascript_number(1),
        make_javascript_number(2),
        make_javascript_number(3),
      ),
    ).toEqual(make_javascript_number(6));
    expect(
      add_3(
        make_javascript_number(1),
        make_complex_from_real_imag(2, 2),
        make_complex_from_real_imag(3, 3),
      ),
    ).toEqual(make_complex_from_real_imag(6, 5));
    expect(
      add_3(
        make_complex_from_real_imag(1, 1),
        make_javascript_number(2),
        make_complex_from_real_imag(3, 3),
      ),
    ).toEqual(make_complex_from_real_imag(6, 4));
    expect(
      add_3(
        make_javascript_number(1),
        make_javascript_number(2),
        make_complex_from_real_imag(3, 3),
      ),
    ).toEqual(make_complex_from_real_imag(6, 3));
    expect(
      add_3(
        make_complex_from_real_imag(1, 1),
        make_complex_from_real_imag(2, 2),
        make_complex_from_real_imag(3, 3),
      ),
    ).toEqual(make_complex_from_real_imag(6, 6));
  });
});
