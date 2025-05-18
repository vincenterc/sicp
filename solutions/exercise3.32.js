// Considering the behavior of and_gate whose inputs change from 0,1
// to 1,0, if we set a1 to 1 first and then set a2 to 0, it will
// call set_signal(output, 1) followed by set_signal(output, 0).
// The final value of output is 0. However, if we call the functions
// for each segment in LIFO order, it will call set_signal(output, 0)
// first and then set_signal(output, 1), resulting a final output
// value of 1. It is incorrect.
