function pairs(s, t) {
  return interleave(
    stream_map((x) => list(head(s), x), t),
    pairs(stream_tail(s), stream_tail(t)),
  );
}
// When pairs is called, it invokes interleave, passing the result
// of another call to pairs as an argument.
// This recursive call leads to an infinite loop if the streams
// s and t are infinite.
