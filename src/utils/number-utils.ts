export const countLeadingZeroes = (num: string): number => {
  const decimalPart = parseFloat(num).toString().split('.')[1]
  let count = 0

  if (decimalPart) {
    for (let i = 0; i < decimalPart.length; i++) {
      if (decimalPart[i] === '0') {
        count++
      } else {
        break
      }
    }
  }

  return count
}
