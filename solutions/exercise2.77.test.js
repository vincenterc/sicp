import { describe, expect, it } from "vitest";
import {
  angle,
  imag_part,
  magnitude,
  make_complex_from_mag_ang,
  make_complex_from_real_imag,
  real_part,
} from "./exercise2.77.js";

describe("exercise 2.77", () => {
  it("tests the functions: real_part, imam_part, magnitude and angle", () => {
    expect(real_part(make_complex_from_real_imag(1, 2))).toBe(1);
    expect(imag_part(make_complex_from_real_imag(1, 2))).toBe(2);
    expect(magnitude(make_complex_from_mag_ang(3, 4))).toBe(3);
    expect(angle(make_complex_from_mag_ang(3, 4))).toBe(4);
  });
});
