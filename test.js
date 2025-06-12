// utils.js

// --- Simulated Decorators ---
function logClass(constructor) {
  console.log(`Class Created: ${constructor.name}`);
  return constructor;
}

function logMethod(target, name, descriptor) {
  const original = descriptor.value;
  descriptor.value = function (...args) {
    console.log(`Calling ${name} with`, args);
    return original.apply(this, args);
  };
  return descriptor;
}

// --- Arrow Function ---
const greetUser = (user) => {
  return `Hello, ${user.name}!`;
};

// --- Named Function ---
function calculateArea(width, height) {
  return width * height;
}

// --- Async Named Function ---
async function fetchUser(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, name: 'Jane Doe' });
    }, 1000);
  });
}

// --- Class Definition ---
let Account = class {
  constructor(user, initialBalance = 0) {
    this.user = user;
    this.balance = initialBalance;
  }

  deposit(amount) {
    if (amount <= 0) throw new Error("Amount must be positive");
    this.balance += amount;
  }

  withdraw(amount) {
    if (amount > this.balance) return false;
    this.balance -= amount;
    return true;
  }

  getBalance() {
    return this.balance;
  }

  async syncWithBank() {
    await new Promise((r) => setTimeout(r, 500));
    return `Synced for ${this.user.name}`;
  }

  static isValidUser(user) {
    return user && user.id > 0 && !!user.name;
  }
};

// Apply simulated class decorator
Account = logClass(Account);

// Apply simulated method decorators
const descriptorDeposit = Object.getOwnPropertyDescriptor(Account.prototype, 'deposit');
Object.defineProperty(Account.prototype, 'deposit', logMethod(Account.prototype, 'deposit', descriptorDeposit));

const descriptorWithdraw = Object.getOwnPropertyDescriptor(Account.prototype, 'withdraw');
Object.defineProperty(Account.prototype, 'withdraw', logMethod(Account.prototype, 'withdraw', descriptorWithdraw));

// --- Exported Function ---
function createAccount(user, initialBalance = 0) {
  return new Account(user, initialBalance);
}

// --- Async Exported Default Function ---
async function getStatus() {
  await new Promise((r) => setTimeout(r, 200));
  return 'active';
}

// --- Export All (Node.js + ESModule compatible) ---
module.exports = {
  greetUser,
  calculateArea,
  fetchUser,
  Account,
  createAccount,
  getStatus
};

// For ESM (uncomment if needed)
// export { greetUser, calculateArea, fetchUser, Account, createAccount };
// export default getStatus;
