//           ^
//          _|________________
// program |make_account:= -+ |<-+
// env  -> |________________|_|  |
//                          |    |
//                          V    |
//                        [*|*]--+
//                         |
//                         V
//                parameter: balance
//                body: function withdraw(amount) {...}
//                      function deposit(amount) {...}
//                      function dispatch(m) {...}
//                      return dispatch;
//
// const acc = make_account(50);
//                        ^
//          ______________|_______________
// program |make_account:= ...            |
// env  -> |acc:= -+                      |
//         |_______|______________________|
//                 |             ^
//                 |        _____|_____
//                 |   E1->|balance: 50|
//                 |       |___________|
//                 |             ^
//                 |      _______|________
//                 | E2->|withdraw:= ...  |
//                 |     |deposit:= ...   |
//                 |     |dispatch:= -+   |
//                 |     |____________|___|
//                 |                  | ^
//                 +------------------+ |
//                 |                    |
//               [*|*]------------------+
//                |
//                V
//       parameter: m
//       body: return m === "withdraw"
//                    ? withdraw
//                    : m === "deposit"
//                    ? deposit
//                    : error(m, "Unknown request: make_account");
//
// acc("deposit")(40);
//                    ^
//          __________|__________
// program |make_account:= ...   |
// env  -> |acc:= ...            |
//         |_____________________|
//                       ^
//                  _____|_____
//             E1->|balance: 50|
//                 |___________|
//                       ^
//                _______|_______
//           E2->|withdraw:= ... |
//               |deposit:= ...  |
//               |dispatch:= ... |
//               |_______________|
//                  ^        ^
//             _____|______  |
//        E3->|m: "deposit"| |
//            |____________| |
//        return deposit     |
//                       ____|____
//                  E4->|amount:40|
//                      |_________|
//                  balance = balance + amount
//                  return balance
//
// acc("withdraw")(60);
//                    ^
//          __________|__________
// program |make_account:= ...   |
// env  -> |acc:= ...            |
//         |_____________________|
//                       ^
//                  _____|_____
//             E1->|balance: 90|
//                 |___________|
//                       ^
//                _______|_______
//           E2->|withdraw:= ... |
//               |deposit:= ...  |
//               |dispatch:= ... |
//               |_______________|
//                  ^        ^
//            ______|______  |
//       E3->|m: "withdraw"| |
//           |_____________| |
//       return withdraw     |
//                       ____|____
//                  E4->|amount:60|
//                      |_________|
//                  balance - amount
//                  return balance
//
// const acc2 = make_account(100);
//                                     ^
//          ___________________________|___________________________
// program |make_account:= ...                                     |
// env  -> |acc2:= -------------------------+                      |
//         |acc:= -+                        |                      |
//         |_______|________________________|______________________|
//                 |             ^          |             ^
//                 |        _____|_____     |        _____|______
//                 |   E1->|balance: 30|    |   E3->|balance: 100|
//                 |       |___________|    |       |____________|
//                 |             ^          |             ^
//                 |      _______|________  |      _______|________
//                 | E2->|withdraw:= ...  | | E4->|withdraw:= ...  |
//                 |     |deposit:= ...   | |     |deposit:= ...   |
//                 |     |dispatch:= -+   | |     |dispatch:= -+   |
//                 |     |____________|___| |     |____________|___|
//                 |                  | ^   |                  | ^
//                 +------------------+ |   |                  | |
//                 |                    |   +------------------+ |
//               [*|*]------------------+   |                    |
//                |                       [*|*]------------------+
//                |                         |
//                V                         |
//       parameter: m                       |
//       body: return m === "withdraw"    <-+
//                    ? withdraw
//                    : m === "deposit"
//                    ? deposit
//                    : error(m, "Unknown request: make_account");
