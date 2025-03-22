function corner_split(painter, n) {
  if (n === 0) {
    return painter;
  } else {
    const up = up_split(painter, n - 1);
    const right = right_split(painter, n - 1);
    const corner = corner_split(painter, n - 1);

    return beside(below(painter, up), below(right, corner));
  }
}

function square_limit(painter, n) {
  const combine4 = square_of_four(identity, flip_horiz, flip_vert, rotate180);

  return combine4(corner_split(painter, n));
}
