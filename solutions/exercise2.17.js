import { display_list, is_null, list, tail } from 'sicp';

function last_pair(items) {
  return is_null(tail(items)) ? items : last_pair(tail(items));
}

display_list(last_pair(list(23, 72, 149, 34)));
// list(34)
