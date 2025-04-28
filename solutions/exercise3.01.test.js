import { expect, test } from "vitest";
import { make_accumulator } from "./exercise3.01";

test("exercise 3.1", () => {
  const a = make_accumulator(5);

  expect(a(10)).toBe(15);
  expect(a(10)).toBe(25);
});
