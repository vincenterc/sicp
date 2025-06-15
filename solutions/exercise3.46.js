// function test_and_set(cell) {
//   if (head(cell)) {
//     return true;
//   } else {
//     set_head(cell, true);
//     return false;
//   }
// }
//
//           T1           cell            T2
//           +------------false-----------+
//           |                            |
//           V                            |
//   ------------------                   |
//  |Access cell: false|                  |
//   ------------------                   V
//           |                    ------------------
//           |                   |Access cell: false|
//           V                    ------------------
//  -------------------                   |
// |update cell to true|->true            |
//  -------------------                   V
//           |                   -------------------
//           |            true<-|update cell to true|
//           V                   -------------------
//      ------------                      |
//     |return false|                     |
//      ------------                      V
//                                   ------------
//                                  |return false|
//                                   ------------
//
// Both threads test the cell and find it to be false,
// so both can acquire the mutex simultaneously.
