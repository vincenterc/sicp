import { describe, expect, it } from "vitest";
import { make_table } from "./exercise3.26.js";

describe("exercise 3.26", () => {
  it("tests records organized by using a binary tree", () => {
    const table = make_table();
    const put = table("insert");
    const get = table("lookup");

    put("a", 1);
    put("b", 2);
    expect(get("a")).toBe(1);
    expect(get("b")).toBe(2);
    expect(get("c")).toBe(undefined);
	put("a", 3);
	expect(get("a")).toBe(3);
  });
});
