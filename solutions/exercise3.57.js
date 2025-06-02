// The number of additions are:
// add(0) = 0
// add(1) = 0
// add(2) = add(1) + add(0) + 1 = 0 + 0 + 1 = 1
// add(3) = add(2) + add(1) + 1 = 1 + 0 + 1 = 2
// add(4) = add(3) + add(2) + 1 = 2 + 1 + 1 = 4
// add(5) = add(4) + add(3) + 1 = 4 + 2 + 1 = 7
// So,
// n   fib  add
// 0   0    0
// 1   1    0
// 2   1    1
// 3   2    2
// 4   3    4
// 5   5    7
//
// We assume add(n) = fin(n + 1) - 1 and prove it by mathematical
// induction.
//
// When n = 0 and n = 1, the number of additions are:
// add(0) = fib(1) - 1 = 1 - 1 = 0
// add(1) = fib(2) - 1 = 1 - 1 = 0
// We assume add(m - 1) = fib(m) - 1 and add(m) = fib(m + 1) - 1.
// For n = m + 1,
// add(m + 1) = add(m) + add(m - 1) + 1
//            = fib(m + 1) - 1 + fib(m) - 1 + 1
//            = fib(m + 1) + fib(m) - 1
//            = fib(m + 2) - 1
// Therefore, add(m + 1) = fib(m + 2) - 1 and
// add(n) = fib(n + 1) - 1 holds for n >= 1.
//
// According to the exercise1.13, the fib(n) is the closet integer
// to phi^n / sqrt(5), where phi = (1 + sqrt(5)) / 2.
// Thus, the number of additions grows exponentially with n.
//
// If add_streams had used the function stream_map_2_optimized,
// the number of additions are:
// add(0) = 0
// add(1) = 0
// add(2) = 1
// add(3) = add(2) + 1 = 2
// add(4) = add(3) + 1 = 3
// add(5) = add(4) + 1 = 4
// Hence, add(n) = n - 1
