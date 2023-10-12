const isMatchingName = (name, queryName) => {
  if (queryName.startsWith("/") && queryName.endsWith("/")) {
    const regex = queryName.substring(1, queryName.length - 1);
    return name.match(new RegExp(regex));
  }
  return name === queryName;
};

const handleId = (doc) => {
  const newDoc = { ...doc };
  newDoc.id = newDoc._id;
  delete newDoc._id;
  return newDoc;
};

module.exports = { isMatchingName, handleId };
