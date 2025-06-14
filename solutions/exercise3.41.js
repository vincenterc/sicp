// Access to the bank balance is a single operation,
// so it cannot be interleaved.
// Furthermore, this operation does not modify the balance,
// thus it has no impact on other threads.
// As a result, access to the bank balance does not need to be serialized.
