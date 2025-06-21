import { head, is_null, length, tail } from "sicp";

const adjoin_term = (term, term_list) =>
  is_equal_to_zero(term) ? term_list : pair(term, term_list);

const the_empty_termlist = null;

const first_term = (term_list) => head(term_list);

const rest_terms = (term_list) => tail(term_list);

const is_empty_termlist = (term_list) => is_null(term_list);

const order = (term_list) => length(term_list) - 1;
