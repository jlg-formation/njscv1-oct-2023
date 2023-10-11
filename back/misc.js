const isMatchingName = (name, queryName) => {
  if (queryName.startsWith("/") && queryName.endsWith("/")) {
    const regex = queryName.substring(1, queryName.length - 1);
    return name.match(new RegExp(regex));
  }
  return name === queryName;
};

module.exports = { isMatchingName };
