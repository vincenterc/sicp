// const a = make_connector();
// const b = make_connector();
//                                     ^
//         ____________________________|____________________________
// program|make_connector:=...                                      |
// env  ->|for_each_except:=...                                     |
//        |set_value:=...                                           |
//        |has_value:=...                                           |
//        |b:=----------------------------+                         |
//        |a:=-+                          |                         |
//         ----|--------------------------|-------------------------
//             |          ^               |          ^
//             |     _____|_____          |     _____|_____
//             |E1->|           |         |E3->|           |
//             |     -----------          |     -----------
//             |call          ^           |call          ^
//             |to            |           |to            |
//             |make_connector|           |make_connector|
//             |     _________|__________ |     _________|__________
//             |E2->|value:false         ||E4->|value:false         |
//             |    |informant:false     ||    |informant:false     |
//             |    |constraints:null    ||    |constraints:null    |
//             |    |set_my_value:=...   ||    |set_my_value:=...   |
//             |    |forget_my_value:=...||    |forget_my_value:=...|
//             |    |connect:=...        ||    |connect:=...        |
//             |    |me:=-+.             ||    |me:=-*              |
//             |     -----|-------------- |     -----|--------------
//             +----------+     ^         +----------+     ^
//             |                |         |                |
//             V                |         V                |
//           [*|*]--------------+       [*|*]--------------+
//            |                          |
//            V                          |
//     program: request <----------------+
//     body:...
//
// set_value(a, 10, "user");
//
//                                     ^
//         ____________________________|____________________________
// program|make_connector:=...                                      |
// env  ->|for_each_except:=...                                     |
//        |set_value:=...                                           |
//        |has_value:=...                                           |
//        |b:=...                                                   |
//        |a:=-+                                                    |
//         ----|----------------------------------------------------
//             |      ^                           ^          ^ ^
//             | _____|_____               _______|________  | |
//             ||           |         E1->|connector:a     | | |
//             | -----------              |new_value:10    | | |
//             |          ^               |informant:"user"| | |
//             |          |                ----------------  | |
//             |          |           call to set_value      | |
//             | _________|__________      ____________      | |
//             ||value:false         |E4->|connector:me|-----+ |
//             ||informant:false     |     ------------        |
//             ||constraints:null    |call to has_value        |
//             ||set_my_value:=...   |     ____________________|_
//             ||forget_my_value:=...|E6->|exception:"user"      |
//             ||connect:=...        |    |fun:inform_about_value|
//             ||me:=-+.             |    |list:null             |
//             | -----|--------------      ----------------------
//             +------+     ^  ^^^    call to for_each_except
//             |            |  |||
//             |            |  ||+-----------------+
//             V            |  |+-----------------+|
//           [*|*]----------+ _|_________________ ||
//            |          E2->|request:"set_value"|||
//            V               ------------------- ||
//     program: request  call to me               ||
//     body:...               _____________       ||
//                       E3->|newval:10    |------+|
//                           |setter:"user"|       |
//                            -------------        |
//                       call to set_my_value      |
//                            ___________________  |
//                       E5->|request:"has_value"|-+
//                            -------------------
//                       call to me
