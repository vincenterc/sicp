import { describe, expect, it } from "vitest";
import { head, tail } from "sicp";
import { square } from "./math.js";
import { stream_ref } from "./stream.js";
import { generate_3_ways_sum_of_squares_numbers } from "./exercise3.72.js";

describe("exercise 3.72", () => {
  it("tests the function generate_3_ways_sum_of_squares_numbers", () => {
    const numbers = generate_3_ways_sum_of_squares_numbers();
    const n0 = stream_ref(numbers, 0);
    const n0_first = head(n0);
    const n0_second = head(tail(n0));
    const n0_third = head(tail(tail(n0)));
    const n0_forth = head(tail(tail(tail(n0))));

    expect(square(head(n0_first)) + square(head(tail(n0_first)))).toBe(
      n0_forth
    );
    expect(square(head(n0_second)) + square(head(tail(n0_second)))).toBe(
      n0_forth
    );
    expect(square(head(n0_third)) + square(head(tail(n0_third)))).toBe(
      n0_forth
    );
  });
});
