// If we do not run the action function immediately when adding it,
// the initial state will not be correct. For example,
// in the half-adder example, if we define accept_action_function as
// function accept_action_function(fun) {
//   action_functions = pair(fun, action_functions);
// },
// the initial state is:
// - input_1: 0
// - input_2: 0
// - carry: 0
// - sum: 0
// - d: 0
// - e: 0.
// Then, when we set input_1 to 1, the sum remains 0 and the carry is
// also 0. After that, we set input_2 to 0, the sum is still 0, but
// the carry becomes 1. The results are not correct. Since the sum
// is always 0, it will not be printed.
