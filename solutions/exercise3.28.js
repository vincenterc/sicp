function or_gate(a1, a2, output) {
  function or_action_function() {
    const new_value = logical_or(get_signal(a1), get_signal(a2));

    after_delay(or_gate_delay, () => set_signal(output, new_value));
  }

  add_action(a1, or_action_function);
  add_action(a2, or_action_function);

  return "ok";
}
