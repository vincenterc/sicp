// function serialized_exchange(account1, account2) {
//   const serializer1 = account1("serializer");
//   const serializer2 = account2("serializer");
//   serializer1(serializer2(exchange))(account1, account2);
// }
//
// function exchange(account1, account2) {
//     const difference = account1("balance") - account2("balance");
//     account1("withdraw")(difference);
//     account2("deposit")(difference);
// }
//
// Let's consider the Louis's serialized_exchange function.
// In this function, the exchange function is serialized with
// the serializers for both account1 and account2.
// However, within the exchange function, the account1("withdraw") function
// is also serialized with serializer for account1.
// Therefore, calling serialized_exchange will lead to a deadlock.
