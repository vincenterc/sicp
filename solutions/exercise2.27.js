const x = list(1, 2, 3);
const y = list(4, 5, 6);

// append(x, y)
// == [1, [2, [3, [4, [5, [6, null]]]]]]
// == list(1, 2, 3, 4, 5, 6)

// pair(x, y)
// == [[1, [2, [3, null]]], [4, [5, [6, null]]]]
// == list(list(1, 2, 3), 4, 5, 6)

// list(x, y)
// == [[1, [2, [3, null]]], [4, [5, [6, null]]], null]
// == list(list(1, 2, 3), list(4, 5, 6))
