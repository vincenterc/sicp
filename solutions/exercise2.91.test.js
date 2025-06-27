import { describe, expect, it } from "vitest";
import { head, list, tail } from "sicp";
import { div, make_polynomial } from "./exercise2.91.js";

describe("exercise 2.91", () => {
  it("tests the div function", () => {
    const r1 = div(
      make_polynomial("x", list(list(5, 1), list(0, -1))),
      make_polynomial("x", list(list(2, 1), list(0, -1))),
    );

    expect(head(r1)).toEqual(
      make_polynomial("x", list(list(3, 1), list(1, 1))),
    );
    expect(head(tail(r1))).toEqual(
      make_polynomial("x", list(list(1, 1), list(0, -1))),
    );
  });
});
