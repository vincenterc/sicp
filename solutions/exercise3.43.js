// The balances in three accounts start out as $10, $20, and $30.
// Exchanging the balances in any two accounts preserves the values of
// those balance. For example, if account a1 has a balances of $10
// and account a2 has a balance of $20. Exchanging their balances
// results in account a1 having $20 and account a2 having $10.
// The values $10 and $20 are preserved. Therefore,  if the threads
// are run sequentially, after any number of concurrent exchanges,
// the account balances will still be $10, $20, and $30 but in some order.
//
// The first version of the account-exchange program can be divided into
// 4 steps, as shown below:
// function exchange(account1, account2) {
//   const difference =
//     account1("balance") - // (1)
//     account2("balance"); // (2)
//   account1("withdraw")(difference); // (3)
//   account2("deposit")(difference); // (4)
// }
// If we exchange accounts a1 and a2, and also accounts a3 and a2, the
// process may be as follows:
//          T1         a1 a2 a3          T2
//          +----------10 20 30----------+
//          |             ||             |
//          V             ||             |
//  -----------------     ||             |
// |Access balance:10|    ||             |
//  -----------------     ||             V
//          |             ||     -----------------
//          |             ||    |Access balance:30|
//          V             ||     -----------------
//  -----------------     ||             |
// |Access balance:20|<---+|             |
//  -----------------      |             V
//          |              |     -----------------
//          |              +--->|Access balance:20|
//          V                    -----------------
//    --------------                     |
//   |difference:-10|                    |
//    --------------                     V
//          |                      -------------
//          |                     |difference:10|
//          V                      -------------
//   ---------------                     |
//  |a1 withdraw:-10|->20                |
//   ---------------                     V
//          |                      --------------
//          |                20<--|a3 withdraw:10|
//          V                      --------------
//    --------------                     |
//   |a2 deposit:-10|---->10             |
//    --------------                     V
//                                 -------------
//                        20<-----|a2 deposit:10|
//                                 -------------
// The result is $20, $20, and $20. This violates the original
// account balances of $10, $20, and $30, but the sum of the balances
// is preserved (10 + 20 + 30 = 20 + 20 + 20). That is because we deposit
// and withdraw the same "difference" within a thread.
//
// If we exchange accounts a1 and a2, and also accounts a3 and a2,
// without serializing the transactions on individual accounts, the
// process might look like:
//            T1            a1 a2 a3            T2
//            +-------------10 20 30------------+
//            |             |  || |             |
//            V             |  || |             |
//    -----------------     |  || |             |
//   |Access balance:10|    |  || |             |
//    -----------------     |  || |             V
//            |             |  || |     -----------------
//            |             |  || |    |Access balance:30|
//            V             |  || |     -----------------
//    -----------------     |  || |             |
//   |Access balance:20|<---+--+| |             |
//    -----------------     |  || |             V
//            |             |  || |     -----------------
//            |             |  |+-+--->|Access balance:20|
//            V             |  || |     -----------------
//      --------------      |  || |             |
//     |difference:-10|     |  || |             |
//      --------------      |  || |             V
//            |             |  || |       -------------
//            |             |  || |      |difference:10|
//            V             |  || |       -------------
//    -----------------     |  || |             |
//   |Access balance:10|<---+  || |             |
//    -----------------        || |             V
//            |                || |     -----------------
//            |                || +--->|Access balance:30|
//            V                ||       -----------------
//  ---------------------      ||               |
// |new value:10-(-10)=20|     ||               |
//  ---------------------      ||               V
//            |                ||      --------------------
//            |                ||     |new value:30-(10)=20|
//            V                ||      --------------------
//   --------------------      ||               |
//  |update balance to 20|->20 ||               |
//   --------------------      ||               V
//            |                ||      --------------------
//            |                || 20<-|update balance to 20|
//            V                ||      --------------------
//    -----------------        ||               |
//   |Access balance:20|<------+|               |
//    -----------------         |               V
//            |                 |       -----------------
//            |                 +----->|Access balance:20|
//            V                         -----------------
//  ---------------------                       |
// |new value:20+(-10)=10|                      |
//  ---------------------                       V
//            |                        --------------------
//            |                       |new value:20+(10)=30|
//            V                        --------------------
//   --------------------                       |
//  |update balance to 10|---->10               |
//   --------------------                       V
//                                      --------------------
//                             30<-----|update balance to 30|
//                                      --------------------
// The result is $20, $30, and $20. The sum of the balances is not
// preserved (10 + 20 + 30 != 20 + 30 + 20).
