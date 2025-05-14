import { is_null } from "sicp";

function lookup(given_key, set_of_records) {
  if (is_null(set_of_records)) {
    return false;
  } else {
    const record = entry(set_of_records);
    const record_key = key(record);

    return given_key === record_key
      ? record
      : given_key < record_key
      ? lookup(given_key, left_branch(set_of_records))
      : // given_key > record_key
        lookup(given_key, right_branch(set_of_records));
  }
}
