export function formatDate(dateValue) {
  if (!dateValue) {
    return '-'
  }

  const [year, month, day] = dateValue.split('-')
  return `${day}/${month}/${year}`
}

export function formatGrades(grades) {
  if (!grades || grades.length === 0) {
    return 'Sem notas'
  }

  return grades.map((grade) => Number(grade).toFixed(1)).join(', ')
}
