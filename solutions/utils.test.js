import { describe, expect, it } from "vitest";
import { make_2d_table } from "./utils.js";

describe("Tests for the utils library", () => {
  it("tests the make_2d_table function", () => {
    const table = make_2d_table();
    const get = table("lookup");
    const put = table("insert");

    put("math", "+", 43);
    put("math", "-", 45);
    put("math", "*", 42);
    put("letters", "a", 97);
    put("letters", "b", 98);

    expect(get("math", "-")).toBe(45);
    expect(get("letters", "a")).toBe(97);
  });
});
