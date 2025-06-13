// a.
// Peter:100 + 10 = 110
// Paul :110 - 20 = 90
// Mary :90 - 90 / 2 = 45
//
// Peter:100 + 10 = 110
// Mary :110 - 110 / 2 = 55
// Paul :55 - 20 = 35
//
// Paul :100 - 20 = 80
// Peter:80 + 10 = 90
// Mary :90 - 90 / 2 = 45
//
// Paul :100 - 20 = 80
// Mary :80 - 80 / 2 = 40
// Peter:40 + 10 = 50
//
// Mary :100 - 100 / 2 = 50
// Peter:50 + 10 = 60
// Paul :60 - 20 = 40
//
// Mary :100 - 100 / 2 = 50
// Paul :50 - 20 = 30
// Pater:30 + 10 = 40
//
// Possible values for balance are 35, 40, 45 and 50.
//
// b.
// 25, 30, 55, 60, 70, 80, 90, and 110 are other values that could be
// produced if the system allows the threads to be interleaved.
// 25:
// Paul access balance: 100
// Peter access balance: 100
// Paul new value: 80
// Pater new value: 110
// Paul update balance: 80
// Mary access balance 1 : 80
// Peter update balance: 110
// Mary access balance 2: 110
// Mary new value: 25
// Mary update balance: 25
// 30:
// Peter access balance: 100
// Mary access balance 1 : 100
// Mary access balance 2: 100
// Pater new value: 110
// Mary new value: 50
// Peter update balance: 110
// Mary update balance: 50
// Paul access balance: 50
// Paul new value: 30
// Paul update balance: 30
// 55:
// Paul access balance: 100
// Peter access balance: 100
// Paul new value: 80
// Pater new value: 110
// Paul update balance: 80
// Peter update balance: 110
// Mary access balance 1 : 110
// Mary access balance 2: 110
// Mary new value: 55
// Mary update balance: 55
// 60:
// Paul access balance: 100
// Mary access balance 1 : 100
// Mary access balance 2: 100
// Paul new value: 80
// Mary new value: 50
// Paul update balance: 80
// Mary update balance: 50
// Peter access balance: 50
// Pater new value: 60
// Peter update balance: 60
// 60:
// Peter access balance: 100
// Paul access balance: 100
// Mary access balance 1 : 100
// Pater new value: 110
// Paul new value: 80
// Peter update balance: 110
// Paul update balance: 80
// Mary access balance 2: 80
// Mary new value: 60
// Mary update balance: 60
// 70:
// Peter access balance: 100
// Paul access balance: 100
// Pater new value: 110
// Paul new value: 80
// Peter update balance: 110
// Mary access balance 1 : 110
// Paul update balance: 80
// Mary access balance 2: 80
// Mary new value: 70
// Mary update balance: 70
// 80:
// Peter access balance: 100
// Mary access balance 1 : 100
// Mary access balance 2: 100
// Paul access balance: 100
// Pater new value: 110
// Mary new value: 50
// Paul new value: 80
// Peter update balance: 110
// Mary update balance: 50
// Paul update balance: 80
// 90:
// Mary access balance 1 : 100
// Mary access balance 2: 100
// Peter access balance: 100
// Mary new value: 50
// Pater new value: 110
// Mary update balance: 50
// Peter update balance: 110
// Paul access balance: 110
// Paul new value: 90
// Paul update balance: 90
// 110:
// Paul access balance: 100
// Mary access balance 1 : 100
// Mary access balance 2: 100
// Peter access balance: 100
// Paul new value: 80
// Mary new value: 50
// Pater new value: 110
// Paul update balance: 80
// Mary update balance: 50
// Peter update balance: 110
