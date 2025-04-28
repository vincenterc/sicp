import { display } from "sicp";

function make_joint(account, password, new_password) {
  const account_authenticated = account(password);

  if (account_authenticated === "Incorrect password") {
    return "Incorrect password";
  } else {
    return (pw) => {
      if (pw === new_password) {
        return account_authenticated;
      } else {
        return "Incorrect password";
      }
    };
  }
}

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

  function authenticate(pw) {
    if (pw === password) {
      return (m) =>
        m === "withdraw"
          ? withdraw
          : m === "deposit"
          ? deposit
          : error(m, "unknown request -- make_account");
    } else {
      return "Incorrect password";
    }
  }

  return authenticate;
}

export { make_account, make_joint };
