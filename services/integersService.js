const IntegersStore = require('../store/integersStore');
const { v4: uuid } = require('uuid');

const DEFAULT_INT_VALUE = 1000;

module.exports = {
  setInteger: async (accountId, intValue = DEFAULT_INT_VALUE) => {
    const integer = await IntegersStore.findByAccountId(accountId);
    if (integer) {
      const updatedInteger = await IntegersStore.updateByAccountId(integer.id, accountId, intValue);
      return updatedInteger;
    }
    const newInteger = await IntegersStore.create({ id: uuid(), accountId, current: intValue });
    return newInteger;
  },

  getInteger: async (accountId) => {
    const integer = await IntegersStore.findByAccountId(accountId);
    return integer;
  },

  nextInteger: async (accountId) => {
    const integer = await IntegersStore.findByAccountId(accountId);
    const nextInteger = await IntegersStore.updateByAccountId(integer.id, accountId, integer.current + 1);
    return nextInteger;
  }
};
