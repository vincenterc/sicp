function make_account(balance, password) {
  function withdraw(amount) {
    if (balance >= amount) {
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

  function dispatch(pw, m) {
    if (pw === password) {
      return m === "withdraw"
        ? withdraw
        : m === "deposit"
          ? deposit
          : error(m, "unknown request -- make_account");
    } else {
      return (amount) => "Incorrect password";
    }
  }

  return dispatch;
}

export { make_account };
