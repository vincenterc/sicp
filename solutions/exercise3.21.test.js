import { describe, it, expect, vi } from "vitest";
import { make_queue, insert_queue, delete_queue } from "./queue.js";
import { print_queue } from "./exercise3.21.js";

describe("exercise 3.21", () => {
  it("should output expected content", () => {
    const console_spy = vi.spyOn(console, "log").mockImplementation(() => {});
    const q1 = make_queue();

    print_queue(q1);
    expect(console_spy).toHaveBeenCalledWith("null");

    print_queue(insert_queue(q1, "a"));
    expect(console_spy).toBeCalledWith('["a", null]');

    print_queue(insert_queue(q1, "b"));
    expect(console_spy).toBeCalledWith('["a", ["b", null]]');

    print_queue(delete_queue(q1));
    expect(console_spy).toBeCalledWith('["b", null]');

    print_queue(delete_queue(q1));
    expect(console_spy).toHaveBeenCalledWith("null");

    console_spy.mockReset();
  });
});
