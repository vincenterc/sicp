// If serialized_exchange always attempts to enter a function
// protecting the lowest-numbered account first, the following situation
// cannot occur: Thread 1 has entered a serialized function protecting
// account 1 and then tries to enter a serialized function protecting
// account 2, while at the same time, Thread 2 has entered a serialized
// function protecting account 2 and then tries to enter a serialized
// function protecting account 1.
// Therefore, this approach avoids deadlock.

function serialized_exchange(account1, account2) {
  const serializer1 = account1("serializer");
  const serializer2 = account2("serializer");

  if (account1("id") < account2("id")) {
    serializer1(serializer2(exchange))(account1, account2);
  } else {
    serializer2(serializer1(exchange))(account1, account2);
  }
}

function make_account(balance) {
  const id = id_generator();

  function withdraw(amount) {
    if (balance > amount) {
      balance = balance - amount;
      return balance;
    } else {
      return "Insufficient funds";
    }
  }

  function deposit(amount) {
    balance = balance + amount;
    return balance;
  }

  const protect = make_serializer();

  function dispatch(m) {
    return m === "withdraw"
      ? protect(withdraw)
      : m === "deposit"
      ? protect(deposit)
      : m === "balance"
      ? balance
      : m === "id"
      ? id
      : error(m, "unknown request -- make_account");
  }

  return dispatch;
}

const id_generator = (() => {
  let id = 0;
  return () => id++;
})();
