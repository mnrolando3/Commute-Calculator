import axios from 'axios'

export const getGasPrice = async (city) => {
    const gasPrice = await axios
    .get(`https://fathomless-mountain-86819.herokuapp.com/getgasprice?search=${city}`)
    return gasPrice

}

export const getVehicleSpecs = async (selectYear, carTrimID) => {
 const result = await axios
 .get(
   `https://fathomless-mountain-86819.herokuapp.com/getvehiclespec?year=${selectYear}&trimid=${carTrimID}`
 )
 const mpgVal = result.data.CombinedMpg
 return mpgVal
}