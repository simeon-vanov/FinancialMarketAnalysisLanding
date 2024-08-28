export const toPascalCase = (str: string) => {
  // Split the string into an array of words
  const words = str.split(' ')

  // Capitalize the first letter of each word and convert the rest to lowercase
  const pascalCaseWords = words.map((word) => {
    const firstLetter = word.charAt(0).toUpperCase()
    const restOfWord = word.slice(1).toLowerCase()
    return firstLetter + restOfWord
  })

  // Join the words back together
  const pascalCaseStr = pascalCaseWords.join('')

  return pascalCaseStr
}
