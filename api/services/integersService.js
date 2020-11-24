const IntegersStore = require('../store/integersStore');

const DEFAULT_INT_VALUE = 1000;

module.exports = {
  setInteger: async (accountId, intValue = DEFAULT_INT_VALUE) => {
    const integer = await IntegersStore.findByAccountId(accountId);
    if (integer) {
      const updatedInteger = await IntegersStore.updateByAccountId(accountId, intValue);
      return updatedInteger.current;
    }
    const newInteger = await IntegersStore.create({ accountId, current: intValue });
    return newInteger.current;
  },

  getInteger: async (accountId) => {
    const integer = await IntegersStore.findByAccountId(accountId);
    return integer.current;
  },

  nextInteger: async (accountId) => {
    const integer = await IntegersStore.findByAccountId(accountId);
    const nextInteger = await IntegersStore.updateByAccountId(accountId, integer.current + 1);
    return nextInteger.current;
  }
};
