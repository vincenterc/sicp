import { expect } from "vitest";
import { describe, it } from "vitest";
import { deriv } from "./exercise2.73.js";
import { list } from "sicp";

describe("exercise 2.73", () => {
  it("tests the functions for derivatives of sums and products", () => {
    expect(
      deriv(list("*", list("*", "x", "y"), list("+", "x", 4)), "x"),
    ).toEqual(
      list(
        "+",
        list("*", list("*", "x", "y"), list("+", 1, 0)),
        list(
          "*",
          list("+", list("*", "x", 0), list("*", 1, "y")),
          list("+", "x", 4),
        ),
      ),
    );
  });

  it("tests the function for derivatives of exponents", () => {
    expect(deriv(list("**", "x", 5), "x")).toEqual(
      list("*", list("*", 5, list("**", "x", list("+", 5, -1))), 1),
    );
  });
});
