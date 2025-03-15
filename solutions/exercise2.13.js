// Consider the interval with the center i and the width di
// and the interval with j and dj,
// The upper bound of the product of these two intervals is
// k + dk = (i + di) * (j + dj)
//        = i * j + i * dj + j * di + di * dj.
// since k = i * j and the assumption of small percentage tolerance,
// dk = i * dj + j * di + di * dj
//    ~= i * dj + j * di.
// so
// dk / k = (i * dj + j * di) / (i * j)
//        = dj / j + di / i.
// The tolerance of the product of two intervals is the sum of the tolerances
// of these two intervals.
