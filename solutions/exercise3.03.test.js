import { expect, test } from "vitest";
import { make_account } from "./exercise3.03.js";

test("exercise 3.3", () => {
  const acc = make_account(100, "secret password");

  expect(acc("secret password", "withdraw")(40)).toBe(60);
  expect(acc("some other password", "deposit")(40)).toBe("Incorrect password");
});
