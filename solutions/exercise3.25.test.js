import { describe, expect, it } from "vitest";
import { list } from "sicp";
import { make_table } from "./exercise3.25.js";

describe("exercise 3.25", () => {
  it("tests arbitrary-dimensional tables", () => {
    const t1 = make_table();
    const get = t1("lookup");
    const put = t1("insert");

    put(list("a"), 1);
	put(list("b"), 2);
	expect(get(list("a"))).toBe(1)
	expect(get(list("b"))).toBe(2)
	expect(get(list("c"))).toBe(undefined)

	put(list("a", "b"), 3)
	expect(get(list("a"))).toBe(undefined)
	expect(get(list("a", "b"))).toBe(3)
	expect(get(list("a", "c"))).toBe(undefined)

	put(list("a", "c"), 4)
	expect(get(list("a", "c"))).toBe(4)

	put(list("a"), 5)
	expect(get(list("a", "b"))).toBe(undefined)
	expect(get(list("a", "c"))).toBe(undefined)
	expect(get(list("a"))).toBe(5)
  });
});
