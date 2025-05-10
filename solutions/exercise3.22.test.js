import { describe, it, expect, vi } from "vitest";
import {
  delete_queue,
  front_queue,
  insert_queue,
  is_empty_queue,
  make_queue,
  print_queue,
} from "./exercise3.22.js";

describe("exercise 3.22", () => {
  it("should output expected content", () => {
    const console_spy = vi.spyOn(console, "log").mockImplementation(() => {});
    const q1 = make_queue();

    print_queue(q1);
    expect(console_spy).toHaveBeenLastCalledWith("null");
    expect(is_empty_queue(q1)).toBe(true);

    print_queue(insert_queue(q1, "a"));
    expect(console_spy).toHaveBeenLastCalledWith('["a", null]');
    expect(is_empty_queue(q1)).toBe(false);
    expect(front_queue(q1)).toBe("a");

    print_queue(insert_queue(q1, "b"));
    expect(console_spy).toHaveBeenLastCalledWith('["a", ["b", null]]');
    expect(front_queue(q1)).toBe("a");

    print_queue(delete_queue(q1));
    expect(console_spy).toHaveBeenLastCalledWith('["b", null]');
    expect(front_queue(q1)).toBe("b");

    print_queue(delete_queue(q1));
    expect(console_spy).toHaveBeenLastCalledWith("null");

    console_spy.mockReset();
  });
});
