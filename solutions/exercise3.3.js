import { display } from "sicp";

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

const acc = make_account(100, "secret password");

display(acc("secret password", "withdraw")(40));
// 60

display(acc("some other password", "deposit")(40));
// "Incorrect password"
