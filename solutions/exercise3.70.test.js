import { describe, expect, it } from "vitest";
import { head, tail } from "sicp";
import { stream_ref } from "./stream.js";
import { stream_a, stream_b } from "./exercise3.70.js";

describe("exercise 3.70", () => {
  it("tests the constant stream_a", () => {
    const stream_a_1 = stream_ref(stream_a, 1);
    const stream_a_2 = stream_ref(stream_a, 1);
    const stream_a_17 = stream_ref(stream_a, 17);
    const stream_a_18 = stream_ref(stream_a, 18);
    const stream_a_23 = stream_ref(stream_a, 23);
    const stream_a_24 = stream_ref(stream_a, 24);

    expect(head(stream_a_1) + head(tail(stream_a_1))).toBeLessThanOrEqual(
      head(stream_a_2) + head(tail(stream_a_2)),
    );
    expect(head(stream_a_17) + head(tail(stream_a_17))).toBeLessThanOrEqual(
      head(stream_a_18) + head(tail(stream_a_18)),
    );
    expect(head(stream_a_23) + head(tail(stream_a_23))).toBeLessThanOrEqual(
      head(stream_a_24) + head(tail(stream_a_24)),
    );
  });

  it("tests the constant stream_b", () => {
    const stream_b_6 = stream_ref(stream_b, 6);
    const stream_b_6_i = head(stream_b_6);
    const stream_b_6_j = head(tail(stream_b_6));
    const stream_b_7 = stream_ref(stream_b, 7);
    const stream_b_7_i = head(stream_b_7);
    const stream_b_7_j = head(tail(stream_b_7));
    const stream_b_33 = stream_ref(stream_b, 33);
    const stream_b_33_i = head(stream_b_33);
    const stream_b_33_j = head(tail(stream_b_33));
    const stream_b_34 = stream_ref(stream_b, 34);
    const stream_b_34_i = head(stream_b_34);
    const stream_b_34_j = head(tail(stream_b_34));

    expect(stream_b_6_i % 2 === 0).toBe(false);
    expect(stream_b_6_i % 3 === 0).toBe(false);
    expect(stream_b_6_i % 5 === 0).toBe(false);
    expect(stream_b_6_j % 2 === 0).toBe(false);
    expect(stream_b_6_j % 3 === 0).toBe(false);
    expect(stream_b_6_j % 5 === 0).toBe(false);
    expect(stream_b_7_i % 2 === 0).toBe(false);
    expect(stream_b_7_i % 3 === 0).toBe(false);
    expect(stream_b_7_i % 5 === 0).toBe(false);
    expect(stream_b_7_j % 2 === 0).toBe(false);
    expect(stream_b_7_j % 3 === 0).toBe(false);
    expect(stream_b_7_j % 5 === 0).toBe(false);
    expect(
      2 * stream_b_6_i + 3 * stream_b_6_j + 5 * stream_b_6_i * stream_b_6_j,
    ).toBeLessThanOrEqual(
      2 * stream_b_7_i + 3 * stream_b_7_j + 5 * stream_b_7_i * stream_b_7_j,
    );

    expect(stream_b_33_i % 2 === 0).toBe(false);
    expect(stream_b_33_i % 3 === 0).toBe(false);
    expect(stream_b_33_i % 5 === 0).toBe(false);
    expect(stream_b_33_j % 2 === 0).toBe(false);
    expect(stream_b_33_j % 3 === 0).toBe(false);
    expect(stream_b_33_j % 5 === 0).toBe(false);
    expect(stream_b_34_i % 2 === 0).toBe(false);
    expect(stream_b_34_i % 3 === 0).toBe(false);
    expect(stream_b_34_i % 5 === 0).toBe(false);
    expect(stream_b_34_j % 2 === 0).toBe(false);
    expect(stream_b_34_j % 3 === 0).toBe(false);
    expect(stream_b_34_j % 5 === 0).toBe(false);
    expect(
      2 * stream_b_33_i + 3 * stream_b_33_j + 5 * stream_b_33_i * stream_b_33_j,
    ).toBeLessThanOrEqual(
      2 * stream_b_34_i + 3 * stream_b_34_j + 5 * stream_b_34_i * stream_b_34_j,
    );
  });
});
