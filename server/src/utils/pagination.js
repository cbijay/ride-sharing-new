exports.paginate = (array, page, limit) => {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};
  if (endIndex < array.length) {
    results.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit,
    };
  }

  results.data = array.slice(startIndex, endIndex);

  return results;
};
