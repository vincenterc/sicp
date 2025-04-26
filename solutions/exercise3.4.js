function make_account(balance, password) {
  let wrong_password_counter = 0;

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

  function call_the_cops() {
    return "Call the cops!";
  }

  function dispatch(pw, m) {
    if (pw === password) {
      wrong_password_counter = 0;

      return m === "withdraw"
        ? withdraw
        : m === "deposit"
        ? deposit
        : error(m, "unknown request -- make_account");
    } else {
      wrong_password_counter = wrong_password_counter + 1;

      if (wrong_password_counter > 7) {
        return call_the_cops();
      } else {
        return (amount) => "Incorrect password";
      }
    }
  }

  return dispatch;
}
