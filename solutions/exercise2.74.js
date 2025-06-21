import {
  accumulate,
  error,
  head,
  is_null,
  is_undefined,
  list,
  pair,
  tail,
} from "sicp";
import { make_2d_table } from "./table.js";

// a.
// The division's files should be pair(division_name, employee_records).
// Each division should also implement their own get_record and
// install it.
function make_division_file(division, records) {
  return pair(division, records);
}

function division_from_file(file) {
  return head(file);
}

function records_from_file(file) {
  return tail(file);
}

function get_record(file, employee) {
  const division = division_from_file(file);
  const records = records_from_file(file);
  const get_record_division = get("get_record", division);
  if (is_undefined(get_record_division)) {
    return error(division, "No division's get_record -- get_record");
  } else {
    const record = get_record_division(records, employee);

    return !is_undefined(record) ? attach_tag(division, record) : undefined;
  }
}

// b.
// The record should be pair(division_name, record).
// Each division should also implement their own get_salary and
// install it.
function division_from_record(record) {
  return head(record);
}

function content_from_record(record) {
  return tail(record);
}

function get_salary(record) {
  if (is_undefined(record)) {
    return undefined;
  } else {
    const division = division_from_record(record);
    const content = content_from_record(record);
    const get_salary_division = get("get_salary", division);

    if (is_undefined(get_salary_division)) {
      return error(division, "No division's get_salary -- get_salary");
    } else {
      return get_salary_division(content);
    }
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

const table = make_2d_table();
const get = table("lookup");
const put = table("insert");
const marketing = attach_tag(
  "marketing",
  list(
    pair(
      "James",
      list(
        pair("name", "James"),
        pair("salary", 200),
        pair("address", "Shinjuku, Tokyo")
      )
    ),
    pair(
      "Emily",
      list(
        pair("name", "Emily"),
        pair("salary", 250),
        pair("address", "Setagaya, Tokyo")
      )
    )
  )
);
const sales = attach_tag(
  "sales",
  list(
    pair(
      "Sarah",
      list(pair("salary", 220), pair("address", "Suginami, Tokyo"))
    ),
    pair("Emma", list(pair("salary", 260), pair("address", "Shibuya, Tokyo")))
  )
);
const files = list(marketing, sales);

install_marketing_package();
install_sales_package();

function install_marketing_package() {
  function get_record(records, employee) {
    return is_null(records)
      ? undefined
      : head(head(records)) === employee
      ? tail(head(records))
      : get_record(tail(records), employee);
  }

  function get_salary(record) {
    return is_undefined(record)
      ? undefined
      : head(head(record)) === "salary"
      ? tail(head(record))
      : get_salary(tail(record));
  }

  put("get_record", "marketing", get_record);
  put("get_salary", "marketing", get_salary);
}

function install_sales_package() {
  function get_record(records, employee) {
    return is_null(records)
      ? undefined
      : head(head(records)) === employee
      ? head(records)
      : get_record(tail(records), employee);
  }

  function get_salary(record) {
    function iter(content) {
      return is_undefined(content)
        ? undefined
        : head(head(content)) === "salary"
        ? tail(head(content))
        : get_salary(tail(content));
    }

    return is_undefined(record) ? undefined : iter(tail(record));
  }

  put("get_record", "sales", get_record);
  put("get_salary", "sales", get_salary);
}

function attach_tag(type_tag, contents) {
  return pair(type_tag, contents);
}

export {
  marketing,
  sales,
  files,
  get_record,
  get_salary,
  find_employee_record,
};
