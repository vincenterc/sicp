const { list } = require('sicp');

function segments_to_painter(segment_list) {
  return (frame) =>
    for_each(
      (segment) =>
        draw_line(
          frame_coord_map(frame)(start_segment(segment)),
          frame_coord_map(frame)(end_segment(segment)),
        ),
      segment_list,
    );
}

function make_segment(start, end) {
  return pair(start, end);
}

function make_vect(x, y) {
  return pair(x, y);
}

const outline = segments_to_painter(
  list(
    make_segment(make_vect(0, 0), make_segment(1, 0)),
    make_segment(make_vect(1, 0), make_segment(1, 1)),
    make_segment(make_vect(1, 1), make_segment(0, 1)),
    make_segment(make_vect(0, 1), make_segment(0, 0)),
  ),
);

const x = segments_to_painter(
  list(
    make_segment(make_vect(0, 0), make_vect(1, 1)),
    make_segment(make_vect(1, 0), make_vect(0, 1)),
  ),
);

const diamond = segments_to_painter(
  list(
    make_segment(make_vect(0.5, 0), make_vect(1, 0.5)),
    make_segment(make_vect(1, 0.5), make_vect(0.5, 1)),
    make_segment(make_vect(0.5, 1), make_vect(0, 0.5)),
    make_segment(make_vect(0, 0.5), make_vect(0.5, 0)),
  ),
);
