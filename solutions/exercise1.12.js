// assume col <= row
function pascal_triangle(row, col) {
  return col === 0 || col === row
    ? 1
    : pascal_triangle(row - 1, col) + pascal_triangle(row - 1, col - 1);
}
