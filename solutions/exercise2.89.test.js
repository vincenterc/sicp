import { describe, expect, it } from "vitest";
import { list } from "sicp";
import { add, make_polynomial } from "./exercise2.89.js";

describe("exercise 2.89", () => {
  it("tests the add function", () => {
    expect(
      add(
        make_polynomial("x", list(1, 2, 0, 0, 0, 0)),
        make_polynomial("x", list(3, -2, -5)),
      ),
    ).toEqual(make_polynomial("x", list(1, 2, 0, 3, -2, -5)));
  });
});
