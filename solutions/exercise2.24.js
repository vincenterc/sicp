// list(1, list(2, list(3, 4)))
// == [1, [[2, [[3, [4, null]], null]], null]]

// / \
// 1 / \
//  / \ null
//  2 / \
//   / \ null
//   3 / \
//     4  null

// list(1, list(2, list(3, 4)))
// / \
// 1  list(2, list(3, 4))
//    / \
//    2  list(3, 4)
//       / \
//       3  4
