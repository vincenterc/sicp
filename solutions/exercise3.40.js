// T1 => x = x * x
// T2 => x = x * x * x
// 1000000: T1 sets x to 100 and then T2 sets to 1000000.
// 1000000: T2 sets x to 1000 and then T1 sets to 1000000.
// 10000  : T2 changes x from 10 to 1000 between the two times that T1
//          accesses the value of x during the evaluation of x * x.
// 100000 : T1 changes x from 10 to 100 between the first time and second
//          time that T2 accesses the value of x during the evaluation of
//          x * x * x.
// 10000  : T1 changes x from 10 to 100 between the second time and third
//          time that T2 accesses the value of x during the evaluation of
//          x * x * x.
// 1000   : T2 accesses x, then T1 sets x to 100, then T2 sets x to 1000.
// 100    : T1 accesses x, then T2 sets x to 1000, then T1 sets x to 100.
// The possible values of x are 100, 1000, 10000, 100000 and 1000000.
// If we use serialized functions, only 1000000 remains.
