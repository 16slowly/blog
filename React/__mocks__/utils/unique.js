/**
 * Remove duplicated elements by Id in array
 */
const uniqueById = (array) => {
  const reducedObject = array.reduce(
    (data, current) =>
      Object.assign({}, data, current && { [current.id]: current }),
    {}
  )

  return Object.keys(reducedObject).map(id => reducedObject[id])
}

module.exports = {
  uniqueById,
}
