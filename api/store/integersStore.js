const BaseStore = require('./baseStore');

class IntegersStore extends BaseStore {
  async findByAccountId (accountId) {
    const integers = await super.read();
    const integer = integers.find(x => x.accountId === accountId);
    return integer;
  }

  async updateByAccountId (accountId, nextValue) {
    const integers = await super.read();
    const integersUpdated = integers.map((integer) => {
      if (integer.accountId === accountId) {
        return {
          accountId,
          current: nextValue
        };
      }
      return integer;
    });
    super.write(integersUpdated);
    return integersUpdated;
  }

  async create (integer) {
    const integers = await super.read();
    integers.push(integer);
    super.write(integers);
    return integer;
  }
}

module.exports = new IntegersStore('integers', { storePath: './integers.json', initialPath: './initialIntegers.json' });
