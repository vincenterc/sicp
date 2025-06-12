import { describe, expect, it } from "vitest";
import { pair, stream } from "sicp";
import { stream_ref } from "./stream.js";
import { make_rand } from "./exercise3.81.js";

describe("exercise 3.81", () => {
  it("tests the function make_rand", () => {
    const random_numbers = make_rand(
      stream(
        "generate",
        "generate",
        pair("reset", 13),
        "generate",
        pair("reset", 17),
        "generate",
        "generate"
      )
    );

    expect(stream_ref(random_numbers, 0)).toBe(184877);
    expect(stream_ref(random_numbers, 1)).toBe(959744092);
    expect(stream_ref(random_numbers, 2)).toBe(218491);
    expect(stream_ref(random_numbers, 3)).toBe(285719);
    expect(stream_ref(random_numbers, 4)).toBe(507111939);
  });
});
