const validTransitions = {
  TODO: ["IN_PROGRESS"],
  IN_PROGRESS: ["DONE"],
  DONE: []
};

const isValidTransition = (current, next) => {
  return validTransitions[current].includes(next);
};

module.exports = { isValidTransition };