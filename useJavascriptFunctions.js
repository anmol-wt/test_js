const {
  greetUser,
  calculateArea,
  fetchUser,
  Account,
  createAccount,
  getStatus,
} = require('./test');

async function main() {
  const user = await fetchUser(1);
  console.log(greetUser(user));

  const area = calculateArea(5, 4);
  console.log(`Area: ${area}`);

  const account = createAccount(user, 100);
  account.deposit(50);
  const success = account.withdraw(30);
  console.log(`Withdraw success: ${success}`);
  console.log(`Balance: ${account.getBalance()}`);

  const syncMsg = await account.syncWithBank();
  console.log(syncMsg);

  const status = await getStatus();
  console.log(`Status: ${status}`);

  console.log('Is Valid User:', Account.isValidUser(user));
}

main().catch(console.error);
