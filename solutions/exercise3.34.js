import {
  forget_value,
  make_connector,
  multiplier,
  probe,
  set_value,
} from "./constraint-system.js";

function squarer(a, b) {
  return multiplier(a, a, b);
}

const a = make_connector();
const b = make_connector();

squarer(a, b);
probe("a", a);
probe("b", b);

set_value(a, 10, "user");
forget_value(a, "user");
set_value(b, 400, "user");
// "Probe: a = 10"
// "Probe: b = 100"
// "Probe: a = \"?\""
// "Probe: b = \"?\""
// "Probe: b = 400"

// If we set a value for a, it cam reduce the value of b.
// Conversely, if we set a value for b, the value of a remains
// unknown. This is because this version of squarer uses
// a multiplier. If product has a value, but both m1 and m2
// has no values, then neither m1 nor m2's value can be determined.
