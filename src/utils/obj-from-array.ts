export const objFromArray = (arr: any[], key = 'id'): {} =>
  arr.reduce((accumulator, current) => {
    accumulator[current[key]] = current
    
    return accumulator
  }, {})

export const generateMessageFromObjectValues = (obj: { [key: string]: any }) => {
  const keys = Object.keys(obj)

  return keys.map(key => obj[key]).join(' ')
}
