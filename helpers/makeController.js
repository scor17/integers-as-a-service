function handleAction (action) {
  return async (req, res, next) => {
    try {
      await action(req, res);
    } catch (err) {
      next(err);
    }
  };
}

module.exports = (actions) => {
  return Object.keys(actions).reduce((handlers, action) => {
    handlers[action] = handleAction(actions[action]);
    return handlers;
  }, {});
};
