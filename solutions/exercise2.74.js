import { accumulate, head, is_undefined, pair, tail } from "sicp";

// a.
// The division's files should be list(division_name, employee_records).
// Each division should also implement their own get_record and
// install it.
function make_division_file(division, records) {
  return pair(division, records);
}

function get_division_from_file(file) {
  return head(file);
}

function get_records_from_file(file) {
  return head(tail(file));
}

function get_record(file, employee) {
  const division = get_division_from_file(file);
  const records = get_records_from_file(file);
  const record = get("get_record", division)(records, employee);

  return !is_undefined(record) ? attach_tag(division, record) : undefined;
}

// b.
// The record should be list(division_name, record).
// Each division should also implement their own get_salary and
// install it.
function get_division_from_record(record) {
  return head(record);
}

function get_content_from_record(record) {
  return head(tail(record));
}

function get_salary(record) {
  if (is_undefined(record)) {
    return undefined;
  } else {
    const division = get_division_from_record(record);
    const content = get_content_from_record(record);

    return get("get_salary", division)(content);
  }
}

// c.
function find_employee_record(employee, files) {
  return accumulate(
    (file, res) => (is_undefined(res) ? get_record(file, employee) : res),
    undefined,
    files
  );
}

// d.
// They should tag the new company's division files, implement
// division-specific functions such as get_record and get_salary,
// and install these functions.
