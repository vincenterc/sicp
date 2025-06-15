// Suppose a bank account system allows each account to link to
// another account. If a withdrawal exceeds the balance, the system
// will attempt to withdraw the remaining amount from the linked account.
// Consider the case where account 1 is linked to account 2,
// and account 2 is also linked back to account 1.
// If a withdrawal from account 1 fails due to insufficient balance
// and tries to access account 2, while at the same time
// a withdrawal from account 2 also fails and tries to access account 1,
// a deadlock may occur in this scenario.
