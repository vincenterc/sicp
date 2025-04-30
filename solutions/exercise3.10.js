//                     ^
//          ___________|___________
// program |make_withdraw:= -+     |
// env  -> |_________________|_____|
//                           |   ^
//                           V   |
//                         [*|*]-+
//                          |
//                          V
//                 parameter: initial_amount
//                 body: return (balance =>
//                         amount => {
//                           if (balance >= amount) {
//                             balance = balance - amount;
//                             return balance;
//                           } else {
//                             return "insufficient funds";
//                           }
//                       })(initial_amount);
//
// const w1 = make_withdraw(100):
//                   ^
//          _________|_________
// program |make_withdraw:=... |
// env  -> |w1:= -+            |
//         |______|____________|
//                |         ^
//                |      ___|_______________
//                | E1->|initial_amount: 100|<---------------+
//                |     |___________________|                |
//                | (balance =>                        ______|______
//                |   amount => {                     |balance: 100 |
//                |     if (balance >= amount) {      |_____________|
//                |       balance = balance - amount;        ^
//                |       return balance;                    |
//                |     } else {                             |
//                |       return "insufficient funds";       |
//                |     }                                    |
//                | })(initial_amount);                      |
//                |                                          |
//              [*|*]----------------------------------------+
//               |
//               V
//      parameter: amount
//      body: if (balance >= amount) {
//              balance = balance - amount;
//              return balance;
//            } else {
//              return "insufficient funds";
//            }
//
// w1(50):
//                     ^
//          ___________|___________
// program |make_withdraw:=...     |
// env  -> |w1:= -+                |
//         |______|________________|
//                |            ^
//                |       _____|______
//                |  E1->|            |
//                |      |____________|
//                |            ^
//                |       _____|______
//                |      |balance: 100|
//                |      |____________|
//                |         ^      ^
//                |         |  ____|_____
//                |         | |amount: 50|
//                |         | |__________|
//                |         |
//              [*|*]-------+
//               |
//               V
//      parameter: amount
//      body: if (balance >= amount) {
//              balance = balance - amount;
//              return balance;
//            } else {
//              return "insufficient funds";
//            }
//
// const W2 = make_withdraw(100);
//                     ^
//          ___________|___________________
// program |make_withdraw:=...             |
// env  -> |w2:= ------------------------+ |<-----------+
//         |w1:= -+                      | |            |
//         |______|______________________|_|            |
//                |            ^         |              |
//                |       _____|_____    |     _________|__________
//                |  E1->|           |   | E2->|initial_amount: 100|
//                |      |___________|   |     |___________________|
//                |            ^         |              ^
//                |       _____|_____    |         _____|______
//                |      |balance: 50|   |        |balance: 100|
//                |      |___________|   |        |____________|
//                |            ^         |              ^
//                |            |         |              |
//              [*|*]----------+       [*|*]------------+
//               |                      |
//               |        +-------------+
//               |        |
//               V        V
//      parameter: amount
//      body: if (balance >= amount) {
//              balance = balance - amount;
//              return balance;
//            } else {
//              return "insufficient funds";
//            }
