import { describe, expect, it } from "vitest";
import { list } from "sicp";
import {
  make_wire,
  propagate,
  ripple_carry_adder,
  set_signal,
} from "./exercise3.30.js";

describe("exercise 3.30", () => {
  it("the ripper-carry adder test: 0001 + 0000", () => {
    const a1 = make_wire();
    const a2 = make_wire();
    const a3 = make_wire();
    const a4 = make_wire();
    const b1 = make_wire();
    const b2 = make_wire();
    const b3 = make_wire();
    const b4 = make_wire();
    const s1 = make_wire();
    const s2 = make_wire();
    const s3 = make_wire();
    const s4 = make_wire();
    const c = make_wire();
    const ak = list(a1, a2, a3, a4);
    const bk = list(b1, b2, b3, b4);
    const sk = list(s1, s2, s3, s4);

    set_signal(a4, 1);

    ripple_carry_adder(ak, bk, sk, c);

    propagate();

    expect(s1("get_signal")).toBe(0);
    expect(s2("get_signal")).toBe(0);
    expect(s3("get_signal")).toBe(0);
    expect(s4("get_signal")).toBe(1);
    expect(c("get_signal")).toBe(0);
  });

  it("the ripper-carry adder test: 0001 + 0001", () => {
    const a1 = make_wire();
    const a2 = make_wire();
    const a3 = make_wire();
    const a4 = make_wire();
    const b1 = make_wire();
    const b2 = make_wire();
    const b3 = make_wire();
    const b4 = make_wire();
    const s1 = make_wire();
    const s2 = make_wire();
    const s3 = make_wire();
    const s4 = make_wire();
    const c = make_wire();
    const ak = list(a1, a2, a3, a4);
    const bk = list(b1, b2, b3, b4);
    const sk = list(s1, s2, s3, s4);

    set_signal(a4, 1);
    set_signal(b4, 1);

    ripple_carry_adder(ak, bk, sk, c);

    propagate();

    expect(s1("get_signal")).toBe(0);
    expect(s2("get_signal")).toBe(0);
    expect(s3("get_signal")).toBe(1);
    expect(s4("get_signal")).toBe(0);
    expect(c("get_signal")).toBe(0);
  });

  it("the ripper-carry adder test: 1111 + 0001", () => {
    const a1 = make_wire();
    const a2 = make_wire();
    const a3 = make_wire();
    const a4 = make_wire();
    const b1 = make_wire();
    const b2 = make_wire();
    const b3 = make_wire();
    const b4 = make_wire();
    const s1 = make_wire();
    const s2 = make_wire();
    const s3 = make_wire();
    const s4 = make_wire();
    const c = make_wire();
    const ak = list(a1, a2, a3, a4);
    const bk = list(b1, b2, b3, b4);
    const sk = list(s1, s2, s3, s4);

    set_signal(a1, 1);
    set_signal(a2, 1);
    set_signal(a3, 1);
    set_signal(a4, 1);
    set_signal(b4, 1);

    ripple_carry_adder(ak, bk, sk, c);

    propagate();

    expect(s1("get_signal")).toBe(0);
    expect(s2("get_signal")).toBe(0);
    expect(s3("get_signal")).toBe(0);
    expect(s4("get_signal")).toBe(0);
    expect(c("get_signal")).toBe(1);
  });

  it("the ripper-carry adder test: 011 + 0111", () => {
    const a1 = make_wire();
    const a2 = make_wire();
    const a3 = make_wire();
    const a4 = make_wire();
    const b1 = make_wire();
    const b2 = make_wire();
    const b3 = make_wire();
    const b4 = make_wire();
    const s1 = make_wire();
    const s2 = make_wire();
    const s3 = make_wire();
    const s4 = make_wire();
    const c = make_wire();
    const ak = list(a1, a2, a3, a4);
    const bk = list(b1, b2, b3, b4);
    const sk = list(s1, s2, s3, s4);

    set_signal(a2, 1);
    set_signal(a3, 1);
    set_signal(a4, 1);
    set_signal(b2, 1);
    set_signal(b3, 1);
    set_signal(b4, 1);

    ripple_carry_adder(ak, bk, sk, c);

    propagate();

    expect(s1("get_signal")).toBe(1);
    expect(s2("get_signal")).toBe(1);
    expect(s3("get_signal")).toBe(1);
    expect(s4("get_signal")).toBe(0);
    expect(c("get_signal")).toBe(0);
  });
});
