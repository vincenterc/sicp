import {
  accumulate,
  append,
  display_list,
  filter,
  head,
  list,
  map,
  pair,
  tail,
} from 'sicp';

function adjoin_position(row, col, ps) {
  return pair(pair(row, col), ps);
}

const empty_board = null;

function is_safe(k, positions) {
  const test_row = head(head(positions));
  const test_col = tail(head(positions));

  return accumulate(
    (pos, result) => {
      const row = head(pos);
      const col = tail(pos);

      return (
        result &&
        test_row !== row &&
        test_row + test_col !== row + col &&
        test_row - test_col !== row - col
      );
    },
    true,
    tail(positions),
  );
}

function enumerate_interval(low, high) {
  return low > high ? null : pair(low, enumerate_interval(low + 1, high));
}

function flatmap(f, seq) {
  return accumulate(append, null, map(f, seq));
}

function queens(board_size) {
  function queen_cols(k) {
    return k === 0
      ? list(empty_board)
      : filter(
          (positions) => is_safe(k, positions),
          flatmap(
            (rest_of_queens) =>
              map(
                (new_row) => adjoin_position(new_row, k, rest_of_queens),
                enumerate_interval(1, board_size),
              ),
            queen_cols(k - 1),
          ),
        );
  }

  return queen_cols(board_size);
}

display_list(queens(4));
// list(
//   list([3, 4], [1, 3], [4, 2], [2, 1]),
//   list([2, 4], [4, 3], [1, 2], [3, 1]),
// );
