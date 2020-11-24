const BaseStore = require('./baseStore');

class AccountsStore extends BaseStore {
  async findById (id) {
    const accounts = await super.read();
    const account = accounts.find(x => x.id === id);
    return account;
  }

  async findByEmail (email) {
    const accounts = await super.read();
    const account = accounts.find(x => x.email === email);
    return account;
  }

  async create (account) {
    const accounts = await super.read();
    accounts.push(account);
    super.write(accounts);
    return account;
  }
}

module.exports = new AccountsStore('accounts', { storePath: './accounts.json', initialPath: './initialAccounts.json' });
