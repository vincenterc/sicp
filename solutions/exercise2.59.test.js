import { describe, expect, it } from "vitest";
import { length, list } from "sicp";
import { union_set } from "./exercise2.59.js";

describe("exercise 2.59", () => {
  it("tests the union of two sets", () => {
    const set1 = list(1, 2, 3);
    const set2 = list(3, 4, 5);
    const set3 = null;
    const set4 = union_set(set1, set2);
    const set5 = union_set(set1, set3);

    expect(length(set4)).toBe(5);
    expect(set5).toEqual(set1);
  });
});
