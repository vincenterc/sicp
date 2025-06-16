function f(x, y, z) {
  return x > y && y > z
    ? x * x + y * y
    : x > y && y <= z
    ? x * x + z * z
    : x > z
    ? x * x + y * y
    : y * y + z * z;
}
