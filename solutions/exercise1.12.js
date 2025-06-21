import { display } from "sicp";

// assume col <= row
function pascal_triangle(row, col) {
  return col === 0 || col === row
    ? 1
    : pascal_triangle(row - 1, col) + pascal_triangle(row - 1, col - 1);
}

display(pascal_triangle(0, 0));
// 1

display(pascal_triangle(1, 0));
// 1

display(pascal_triangle(2, 1));
// 2

display(pascal_triangle(3, 1));
// 3
display(pascal_triangle(3, 2));
// 3

display(pascal_triangle(4, 1));
// 4
display(pascal_triangle(4, 2));
// 6
display(pascal_triangle(4, 3));
// 4
