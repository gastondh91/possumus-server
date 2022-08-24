interface CheckPalindrome {
  result: string
  error: string
}

const checkPalindromeService = (inputText: string): CheckPalindrome => {
  if (inputText.length < 4) {
    throw new Error(
      `[checkPalindromeService]: Entered text must have at least a length of four`
    )
  }

  const splitedExample = inputText.split('')
  const reversedSplitedExample = splitedExample.reverse().join('')
  const isPalidrome = reversedSplitedExample === inputText

  if (!isPalidrome) {
    throw new Error(
      `[checkPalindromeService]: Entered text "${inputText}" is not palindrome`
    )
  }

  const removeRepeatedSequencesFromPalindrome = (
    currentIndex: number,
    sliceIndex: number
  ) => {
    const alreadyEvaluatedText = inputText.slice(0, currentIndex)
    const currentLettersInEvaluation = inputText.slice(currentIndex, sliceIndex)
    const remainingTextLetters = inputText.slice(sliceIndex)

    if (!remainingTextLetters.includes(currentLettersInEvaluation)) return
    const textRepeatedLettersRemoved = remainingTextLetters.replace(
      currentLettersInEvaluation,
      ''
    )

    return alreadyEvaluatedText + textRepeatedLettersRemoved
  }

  const findUnrepeatedSequencesFromPalindrome = (index: number): string => {
    // Text can only contain repeated letters by consecutive two or by consecutive three but not both.
    // First we have to check by three has three so if there's two these are not contained in the repeated three

    const remainingLettersCheckingByTwo = removeRepeatedSequencesFromPalindrome(
      index,
      index + 3
    )
    if (remainingLettersCheckingByTwo) return remainingLettersCheckingByTwo

    const remainingLettersCheckingByThree =
      removeRepeatedSequencesFromPalindrome(index, index + 2)
    if (remainingLettersCheckingByThree) return remainingLettersCheckingByThree

    return findUnrepeatedSequencesFromPalindrome(index + 1)
  }

  let initialIndexForLoop = 0
  const result = findUnrepeatedSequencesFromPalindrome(initialIndexForLoop)
  return { result, error: null }
}

export default checkPalindromeService
