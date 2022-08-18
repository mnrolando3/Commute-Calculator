import axios from 'axios'
import { BASE_URL } from './constants'

export const getGasPrice = async (city) => {
  const gasPrice = await axios.get(
    `https://fathomless-mountain-86819.herokuapp.com/getgasprice?search=${city}`
  )
  return gasPrice
}

export const getVehicleSpecs = async (selectYear, carTrimID) => {
  const result = await axios.get(
    `https://fathomless-mountain-86819.herokuapp.com/getvehiclespec?year=${selectYear}&trimid=${carTrimID}`
  )
  const mpgVal = result.data.CombinedMpg
  return mpgVal
}

export const getMakes = async () => {
  const makes = await axios.get(
    'https://fathomless-mountain-86819.herokuapp.com/getmakes'
  )
  return makes.data
}

export const getCarModels = async (selectYear, carMakeID) => {
  const result = await axios.get(
    `https://fathomless-mountain-86819.herokuapp.com/getvehiclemodels?year=${selectYear}&makeid=${carMakeID}`
  )
  return result
}

export const createCommute = async (
  cityStart,
  cityEnd,
  workDay,
  distanceValue,
  avgGasLocation
) => {
  const response = await axios.post(`${BASE_URL}/commute/`, {
    start_location: cityStart,
    end_location: cityEnd,
    days_per_week_commuting: workDay,
    distance: parseFloat(distanceValue),
    avg_gas_commute: avgGasLocation,
  })
  return response
}

export const createVehicle = async (mpg) => {
  const response = await axios.post(`${BASE_URL}/vehicle/`, {
    mpg,
  })
  return response.data.id
}

export const createCalcData = async (calcCommuteId, calcVehicleId) => {
  const response = await axios.post(`${BASE_URL}/calc/`, {
    commute: calcCommuteId,
    vehicle: calcVehicleId,
  })
  return response.data
}
