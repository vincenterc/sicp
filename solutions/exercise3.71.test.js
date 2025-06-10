import { describe, expect, it } from "vitest";
import { stream_ref } from "sicp";
import { generate_ramanujan_numbers } from "./exercise3.71.js";

describe("exercise 3.71", () => {
  it("tests the function generate_ramanujan_numbers", () => {
    const ramanujan_numbers = generate_ramanujan_numbers();

    expect(stream_ref(ramanujan_numbers, 0)).toBe(1729);
  });
});
