function make_account(balance, password) {
  let incorrect_password_counter = 0;

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

  function handle_incorrect_password(amount) {
    incorrect_password_counter = incorrect_password_counter + 1;

    if (incorrect_password_counter > 7) {
      return call_the_cops();
    } else {
      return "Incorrect password";
    }
  }

  function call_the_cops() {
    return "Call the cops!";
  }

  function dispatch(pw, m) {
    if (pw === password) {
      incorrect_password_counter = 0;

      return m === "withdraw"
        ? withdraw
        : m === "deposit"
        ? deposit
        : error(m, "unknown request -- make_account");
    } else {
      return handle_incorrect_password;
    }
  }

  return dispatch;
}

export { make_account };
