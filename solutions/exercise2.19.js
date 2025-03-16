import { display, head, is_null, list, tail } from 'sicp';

function first_denomination(coins) {
  return head(coins);
}

function except_first_denomination(coins) {
  return tail(coins);
}

function no_more(coins) {
  return is_null(coins);
}

function cc(amount, coin_values) {
  return amount === 0
    ? 1
    : amount < 0 || no_more(coin_values)
    ? 0
    : cc(amount, except_first_denomination(coin_values)) +
      cc(amount - first_denomination(coin_values), coin_values);
}

const us_coins = list(50, 25, 10, 5, 1);
const us_coins_2 = list(25, 1, 50, 5, 10);
const uk_coins = list(100, 50, 20, 10, 5, 2, 1);
const uk_coins_2 = list(50, 20, 5, 2, 10, 100, 1);

display(cc(100, us_coins));
// 292
display(cc(100, us_coins_2));
// 292

display(cc(100, uk_coins));
// 4563
display(cc(100, uk_coins_2));
// 4563

// The order of the list coin_values does not affect the answer
// because the three recursion will traverse the entire list
// regardless of the order.
