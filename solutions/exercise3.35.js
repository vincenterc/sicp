import { display, error, math_sqrt } from "sicp";
import {
  connect,
  forget_value,
  get_value,
  has_value,
  set_value,
} from "./constraint-system.js";

function squarer(a, b) {
  function process_new_value() {
    if (has_value(b)) {
      if (get_value(b) < 0) {
        error(get_value(b), "square less than 0 -- squarer");
      } else {
        set_value(a, math_sqrt(get_value(b)), me);
      }
    } else if (has_value(a)) {
      set_value(b, get_value(a) * get_value(a), me);
    } else {
    }
  }

  function process_forget_value() {
    forget_value(a, me);
    forget_value(b, me);
    process_new_value();
  }

  function me(request) {
    if (request === "I have a value.") {
      process_new_value();
    } else if (request === "I lost my value.") {
      process_forget_value();
    } else {
      error(request, "unknown request -- squarer");
    }
  }

  connect(a, me);
  connect(b, me);

  return me;
}

export { squarer };
