import { expect, test } from "vitest";
import { make_account, make_joint } from "./exercise3.07";

test("exercise 3.7", () => {
  const peter_acc = make_account(100, "open sesame");
  const paul_acc = make_joint(peter_acc, "open sesame", "rosebud");

  expect(peter_acc("open sesame")("withdraw")(10)).toBe(90);
  expect(paul_acc("rosebud")("deposit")(20)).toBe(110);
  expect(paul_acc("rosebud")("withdraw")(50)).toBe(60);
  expect(peter_acc("open sesame")("deposit")(30)).toBe(90);
  expect(peter_acc("incorrect password")).toBe("Incorrect password");
  expect(paul_acc("incorrect password")).toBe("Incorrect password");

  const paul_acc_incorrect_password = make_joint(
    peter_acc,
    "incorrect password",
    "rosebud",
  );

  expect(paul_acc_incorrect_password).toBe("Incorrect password");
});
