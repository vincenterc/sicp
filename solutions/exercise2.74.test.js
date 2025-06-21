import { describe, expect, it } from "vitest";
import { list, pair } from "sicp";
import {
  files,
  find_employee_record,
  get_record,
  get_salary,
  marketing,
  sales,
} from "./exercise2.74.js";

describe("exercise 2.74", () => {
  it("tests the get_record function", () => {
    expect(get_record(marketing, "Emily")).toEqual(
      pair(
        "marketing",
        list(
          pair("name", "Emily"),
          pair("salary", 250),
          pair("address", "Setagaya, Tokyo"),
        ),
      ),
    );
    expect(get_record(marketing, "Emma")).toBe(undefined);
    expect(get_record(sales, "Emma")).toEqual(
      pair(
        "sales",
        pair(
          "Emma",
          list(pair("salary", 260), pair("address", "Shibuya, Tokyo")),
        ),
      ),
    );
  });

  it("tests the get_salary function", () => {
    expect(get_salary(get_record(marketing, "James"))).toBe(200);
    expect(get_salary(get_record(marketing, "Emma"))).toBe(undefined);
    expect(get_salary(get_record(sales, "Sarah"))).toBe(220);
  });

  it("tests the find_employee_record function", () => {
    expect(find_employee_record("James", files)).toEqual(
      pair(
        "marketing",
        list(
          pair("name", "James"),
          pair("salary", 200),
          pair("address", "Shinjuku, Tokyo"),
        ),
      ),
    );
    expect(find_employee_record("David", files)).toBe(undefined);
    expect(find_employee_record("Sarah", files)).toEqual(
      pair(
        "sales",
        pair(
          "Sarah",
          list(pair("salary", 220), pair("address", "Suginami, Tokyo")),
        ),
      ),
    );
  });
});
