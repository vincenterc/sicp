const { error } = require("sicp");

function mul_interval(x, y) {
  return lower_bound(x) >= 0 &&
    upper_bound(x) >= 0 &&
    lower_bound(y) >= 0 &&
    upper_bound(y) >= 0
    ? make_interval(
        lower_bound(x) * lower_bound(y),
        upper_bound(x) * upper_bound(y),
      )
    : lower_bound(x) >= 0 &&
        upper_bound(x) >= 0 &&
        lower_bound(y) <= 0 &&
        upper_bound(y) >= 0
      ? make_interval(
          upper_bound(x) * lower_bound(y),
          upper_bound(x) * upper_bound(y),
        )
      : lower_bound(x) >= 0 &&
          upper_bound(x) >= 0 &&
          lower_bound(y) <= 0 &&
          upper_bound(y) <= 0
        ? make_interval(
            upper_bound(x) * lower_bound(y),
            lower_bound(x) * upper_bound(y),
          )
        : lower_bound(x) <= 0 &&
            upper_bound(x) >= 0 &&
            lower_bound(y) >= 0 &&
            upper_bound(y) >= 0
          ? make_interval(
              lower_bound(x) * upper_bound(y),
              upper_bound(x) * upper_bound(y),
            )
          : lower_bound(x) <= 0 &&
              upper_bound(x) >= 0 &&
              lower_bound(y) <= 0 &&
              upper_bound(y) <= 0
            ? make_interval(
                upper_bound(x) * lower_bound(y),
                lower_bound(x) * lower_bound(y),
              )
            : lower_bound(x) <= 0 &&
                upper_bound(x) <= 0 &&
                lower_bound(y) >= 0 &&
                upper_bound(y) >= 0
              ? make_interval(
                  lower_bound(x) * upper_bound(y),
                  upper_bound(x) * lower_bound(y),
                )
              : lower_bound(x) <= 0 &&
                  upper_bound(x) <= 0 &&
                  lower_bound(y) <= 0 &&
                  upper_bound(y) >= 0
                ? make_interval(
                    lower_bound(x) * upper_bound(y),
                    lower_bound(x) * lower_bound(y),
                  )
                : lower_bound(x) <= 0 &&
                    upper_bound(x) <= 0 &&
                    lower_bound(y) <= 0 &&
                    upper_bound(y) <= 0
                  ? make_interval(
                      upper_bound(x) * upper_bound(y),
                      lower_bound(x) * lower_bound(y),
                    )
                  : lower_bound(x) <= 0 &&
                      upper_bound(x) >= 0 &&
                      lower_bound(y) <= 0 &&
                      upper_bound(y) >= 0
                    ? make_interval(
                        min(
                          lower_bound(x) * upper_bound(y),
                          upper_bound(x) * lower_bound(y),
                        ),
                        max(
                          upper_bound(x) * upper_bound(y),
                          lower_bound(y) * lower_bound(y),
                        ),
                      )
                    : error("The Lower bound is larger than the upper bound!");
}
