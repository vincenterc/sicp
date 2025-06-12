import { describe, expect, it } from "vitest";
import { stream_ref } from "./stream.js";
import { pi_stream } from "./exercise3.82.js";

describe("exercise 3.82", () => {
  it("tests the constant pi_stream", () => {
    const pi = stream_ref(pi_stream, 8000);

    expect(pi).toBeGreaterThan(3);
    expect(pi).toBeLessThan(4);
  });
});
