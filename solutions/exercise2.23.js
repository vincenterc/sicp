// function square_list(items) {
//   function iter(things, answer) {
//     return is_null(things)
//       ? answer
//       : iter(tail(things), pair(square(head(things)), answer));
//   }
//   return iter(items, null);
// }
// square_list(list(1, 2, 3))
// == iter(list(1, 2, 3), null)
// == iter(list(2, 3), [1, null])
// == iter(list(3), [4, [1, null]])
// == iter(null, [9, [4, [1, null]]])
// == [9, [4, [1, null]]]

// function square_list(items) {
//   function iter(things, answer) {
//     return is_null(things)
//       ? answer
//       : iter(tail(things), pair(answer, square(head(things))));
//   }
//   return iter(items, null);
// }
// square_list(list(1, 2, 3))
// == iter(list(1, 2, 3), null)
// == iter(list(2, 3), [null, 1])
// == iter(list(3), [[null, 1], 4])
// == iter(null, [[[null, 1], 4], 9])
// == [[[null, 1], 4], 9]
