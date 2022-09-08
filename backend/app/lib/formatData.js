'use strict';


const deleteDuplicateByLabel = async (request, label) => {
  const setObj = new Set();
  return request.reduce((acc, element) => {
    if (!setObj.has(element[label])) {
      setObj.add(element[label], element)
      acc.push(element)
    }
    return acc;
  }, []);
}

module.exports = {
  deleteDuplicateByLabel
}