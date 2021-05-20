
export function dateFilter (val) {
  const [month, date, year] = new Date(val).toLocaleDateString('en-US').split('/')
  return `${date}-${month}-${year}`
}

export function thaiCurrencyFormat (price) {
  return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(price)
}
