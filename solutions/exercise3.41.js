// Access to the bank balance doest not need to be serialized,
// because each access is a single step and cannot be
// interleaved.
