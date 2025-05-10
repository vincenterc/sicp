import { describe, expect, it, vi } from "vitest";
import {
  front_delete_deque,
  front_deque,
  front_insert_deque,
  is_empty_deque,
  make_deque,
  rear_delete_deque,
  rear_deque,
  rear_insert_deque,
  print_deque,
} from "./exercise3.23.js";
import {} from "vitest";
import { display, list } from "sicp";

describe("exercise 3.23", () => {
  it("tests deque operations", () => {
    const console_spy = vi.spyOn(console, "log").mockImplementation(() => {});
    const q1 = make_deque();

    print_deque(q1);
    expect(is_empty_deque(q1)).toBe(true);
    expect(console_spy).toHaveBeenLastCalledWith("null");

    print_deque(front_insert_deque(q1, "a"));
    expect(front_deque(q1)).toBe("a");
    expect(rear_deque(q1)).toBe("a");
    expect(is_empty_deque(q1)).toBe(false);
    expect(console_spy).toHaveBeenLastCalledWith('["a", null]');

    print_deque(front_insert_deque(q1, "b"));
    expect(front_deque(q1)).toBe("b");
    expect(rear_deque(q1)).toBe("a");
    expect(is_empty_deque(q1)).toBe(false);
    expect(console_spy).toHaveBeenLastCalledWith('["b", ["a", null]]');

    print_deque(rear_delete_deque(q1));
    expect(front_deque(q1)).toBe("b");
    expect(rear_deque(q1)).toBe("b");
    expect(is_empty_deque(q1)).toBe(false);
    expect(console_spy).toHaveBeenLastCalledWith('["b", null]');

    print_deque(front_delete_deque(q1));
    expect(is_empty_deque(q1)).toBe(true);
    expect(console_spy).toHaveBeenLastCalledWith("null");

    print_deque(rear_insert_deque(q1, "a"));
    expect(front_deque(q1)).toBe("a");
    expect(rear_deque(q1)).toBe("a");
    expect(is_empty_deque(q1)).toBe(false);
    expect(console_spy).toHaveBeenLastCalledWith('["a", null]');

    print_deque(rear_insert_deque(q1, "b"));
    expect(front_deque(q1)).toBe("a");
    expect(rear_deque(q1)).toBe("b");
    expect(is_empty_deque(q1)).toBe(false);
    expect(console_spy).toHaveBeenLastCalledWith('["a", ["b", null]]');

    print_deque(front_delete_deque(q1));
    expect(front_deque(q1)).toBe("b");
    expect(rear_deque(q1)).toBe("b");
    expect(is_empty_deque(q1)).toBe(false);
    expect(console_spy).toHaveBeenLastCalledWith('["b", null]');

    print_deque(rear_delete_deque(q1));
    expect(is_empty_deque(q1)).toBe(true);
    expect(console_spy).toHaveBeenLastCalledWith("null");
  });
});
