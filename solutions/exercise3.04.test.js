import { expect, test } from "vitest";
import { make_account } from "./exercise3.04";

test("exercise 3.4", () => {
  const acc = make_account(100, "correct password");

  expect(acc("incorrect password", "withdraw")(100)).toBe("Incorrect password");
  expect(acc("incorrect password", "withdraw")(100)).toBe("Incorrect password");
  expect(acc("incorrect password", "withdraw")(100)).toBe("Incorrect password");
  expect(acc("incorrect password", "withdraw")(100)).toBe("Incorrect password");
  expect(acc("incorrect password", "withdraw")(100)).toBe("Incorrect password");
  expect(acc("incorrect password", "withdraw")(100)).toBe("Incorrect password");
  expect(acc("incorrect password", "withdraw")(100)).toBe("Incorrect password");
  expect(acc("incorrect password", "withdraw")(100)).toBe("Call the cops!");
});
