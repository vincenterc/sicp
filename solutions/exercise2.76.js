// Generic operations with explicit dispatch:
// - New type:
//   * Add a new clause to each generic operation function
// - New operation:
//   * Add a new generic operation function
// Data-directed style:
// - New type:
//   * Implement a new package for the new type and install it
// - New operation:
//   * Add a new operation to each package, or implement a new package
//     that handles every type for the new operation and install it
//   * Add a new generic operation function
// Message-passing style:
// - New type:
//   * Add a new function that handles every operation
// - New operation:
//   * Add a new clause to each type's dispatch
//   * Add a new generic operation function
//
// Message-passing style is appropriate for
// a system in which new types must often be added, while
// generic operations with explicit dispatch is appropriate for
// a system in which new operations must often be added.
// Data-directed style is appropriate for both.
