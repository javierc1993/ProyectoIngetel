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

const totalCleanString = (x => x.trim().replace(/\s+/g, '').normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9 ]/g, '').toLowerCase())

module.exports = {
  deleteDuplicateByLabel,
  totalCleanString
}