export function calculateAverage(grades) {
  if (!grades || grades.length === 0) {
    return 0
  }

  const total = grades.reduce((sum, grade) => sum + Number(grade), 0)
  return total / grades.length
}
