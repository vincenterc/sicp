import { describe, expect, it } from "vitest";
import { make_table } from "./exercise3.24.js";

describe("exercise 3.24", () => {
  it("tests keys for equality using ===", () => {
    const table = make_table((key1, key2) => key1 === key2);
    const get = table("lookup");
    const put = table("insert");

    put("a", 1);
    put("b", 2);
    put("c", 3);

    expect(get("a")).toBe(1);
    expect(get("b")).toBe(2);
    expect(get("d")).toBe(undefined);
  });
});
