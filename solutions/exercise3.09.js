//                   ^
//          _________|_________
// program |factorial:= -+     |
// env  -> |_____________|_____|
//                       |   ^
//                       V   |
//                     [*|*]-+
//                      |
//                      V
//             parameter: n
//             body: return n === 1
//                          ? 1
//                          : n * factorial(n - 1);
//
//                 ^
//          _______|_______
// program |               |
// env  -> |_______________|
// factorial(6)    ^
//                 |
//           E1->[n: 6]
//           n * factorial(n - 1)
//           E2->[n: 5]
//           n * factorial(n - 1)
//           E3->[n: 4]
//           n * factorial(n - 1)
//           E4->[n: 3]
//           n * factorial(n - 1)
//           E5->[n: 2]
//           n * factorial(n - 1)
//           E6->[n: 1]
//           1

//                        ^
//          ______________|_______________
// program |fact_iter:=-------------+     |
// env  -> |factorial:= -+          |     |
//         |_____________|__________|_____|
//                       |   ^      |   ^
//                       V   |      V   |
//                     [*|*]-+    [*|*]-+
//                       |          |
//                       |          V
//                       | parameter: product, counter, max_count
//                       | body: return counter > max_count
//                       |              ? product
//                       |              : fact_iter(counter * product,
//                       |                          counter + 1,
//                       V                          max_count);
//              parameter: n
//              body: return fact_iter(1, 1, n);
//
//                 ^
//          _______|_______
// program |               |
// env  -> |_______________|
// factorial(6)    ^
//                 |
//           E1->[n: 6]
//           fact_iter(1, 1, n)
//           E2->[product: 1
//                counter: 1
//                max_count: 6]
//           fact_iter(counter * product, counter + 1, max_count)
//           E3->[product: 1
//                counter: 2
//                max_count: 6]
//           fact_iter(counter * product, counter + 1, max_count)
//           E4->[product: 2
//                counter: 3
//                max_count: 6]
//           fact_iter(counter * product, counter + 1, max_count)
//           E5->[product: 6
//                counter: 4
//                max_count: 6]
//           fact_iter(counter * product, counter + 1, max_count)
//           E6->[product: 24
//                counter: 5
//                max_count: 6]
//           fact_iter(counter * product, counter + 1, max_count)
//           E7->[product: 120
//                counter: 6
//                max_count: 6]
//           fact_iter(counter * product, counter + 1, max_count)
//           E8->[product: 720
//                counter: 7
//                max_count: 6]
//           product
