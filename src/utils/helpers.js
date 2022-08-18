export const splitAddress = (addressText) => {
  const addressArray = addressText.split(',')
  let city = ''
  if (addressArray.length === 3) {
    city = addressArray[0]
  } else if (addressArray.length === 4) {
    city = addressArray[1]
  } else if (addressArray.length === 5) {
    city = addressArray[2]
  }
  return city.trim()
}

export const roundNumber = (numberVal) => {
  return (Math.round(numberVal * 100) / 100).toFixed(1)
}
