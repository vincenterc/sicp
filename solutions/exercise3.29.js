// De Morgan's law:
// - not (A or B) = (not A) and (not B)
// - not (A and B) = (not A) or (not B)

function or_gate(a1, a2, output) {
  const not_a1 = make_wire();
  const not_a2 = make_wire();
  const not_a1_and_not_a2 = make_wire();

  inverter(a1, not_a1);
  inverter(a2, not_a2);
  and_gate(not_a1, not_a2, not_a1_and_not_a2);
  inverter(not_a1_and_not_a2, output);

  return "ok";
}

const or_gate_delay = and_gate_delay + 2 * inverter_delay;
