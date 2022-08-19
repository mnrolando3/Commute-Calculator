import {
  Input,
  ChakraProvider as CharkhaProvider,
  theme,
  Flex,
  Text,
  Center,
  Button,
  HStack,
  GridItem,
  Grid,
} from '@chakra-ui/react'
import React, { useState, useEffect, useRef } from 'react'
import { Autocomplete } from '@react-google-maps/api'

import Map from './Map'
import {
  createCalcData,
  createCommute,
  createVehicle,
  getCarModels,
  getGasPrice,
  getMakes,
  getVehicleSpecs,
} from '../utils/api'
import { roundNumber, splitAddress } from '../utils/helpers'
import { YEARS, WORK_DAYS } from '../utils/constants'

export default function Home() {
  const originRef = useRef()
  const destinationRef = useRef()
  const [selectYear, setSelectYear] = useState(2020)
  const [carMakes, setCarMakes] = useState([])
  const [carMakeID, setCarMakeID] = useState('1')
  const [workDay, setWorkDay] = useState(1)
  const [carModels, setCarModels] = useState([])
  const [carTrimID, setCarTrimID] = useState('')
  const [combinedMPGVal, setCombinedMPGVal] = useState('')
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [resultCalculation, setResultCalculation] = useState({
    result: { weekly: '' },
  })

  useEffect(() => {
    const getMakesAsync = async () => {
      const makes = await getMakes()
      setCarMakes(makes)
    }
    getMakesAsync()
  }, [])

  useEffect(() => {
    if (selectYear && carMakeID) {
      const getCarModelsAsync = async () => {
        const result = await getCarModels(selectYear, carMakeID)
        if (result.data.length === 0) {
          setCombinedMPGVal(0)
        }
        setCarModels(result.data)
      }
      getCarModelsAsync()
    }
  }, [selectYear, carMakeID])

  useEffect(() => {
    if (selectYear && carTrimID) {
      const getMpg = async () => {
        const mpgValueData = await getVehicleSpecs(selectYear, carTrimID)
        if (mpgValueData) {
          const roundedMPGVal = roundNumber(mpgValueData)
          setCombinedMPGVal(roundedMPGVal)
        } else {
          setCombinedMPGVal(0.0)
        }
      }
      getMpg()
    }
  }, [selectYear, carTrimID])

  async function calculateRoute() {
    if (originRef.current.value === '' || destinationRef.current.value === '') {
      return
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    })
    const distanceResult = results.routes[0].legs[0].duration.text
    setDirectionsResponse(results)
    setDuration(results.routes[0].legs[0].duration.text)
    setDistance(distanceResult)
    return distanceResult
  }

  const commutePostData = async (distanceValue) => {
    let cityStart = splitAddress(originRef.current.value)
    let cityEnd = splitAddress(destinationRef.current.value)
    const startAvgGasLocation = await getGasPrice(cityStart)
    const endAvgGasLocation = await getGasPrice(cityEnd)
    const startGas = startAvgGasLocation.data.locationAverage
    const endGas = endAvgGasLocation.data.locationAverage

    const avgGasLocation = roundNumber((startGas + endGas) / 2)
    const response = await createCommute(
      cityStart,
      cityEnd,
      workDay,
      distanceValue,
      avgGasLocation
    )
    return response.data.id
  }

  const calculateData = async (e) => {
    e.preventDefault()
    let [resultDistance] = await Promise.all([calculateRoute()])
    let [commuteId, vehicleId] = await Promise.all([
      commutePostData(resultDistance),
      createVehicle(combinedMPGVal),
    ])
    const resultCalcData = await createCalcData(commuteId, vehicleId)
    setResultCalculation(resultCalcData)
  }

  return (
    <CharkhaProvider theme={theme}>
      <Flex
        position='relative'
        flexDirection='column'
        alignItems='center'
        w='100vw'
      >
        <form onSubmit={calculateData}>
          {/* stat location input  */}
          <div style={{ paddingBottom: '40px' }}>
            <label htmlFor='starting-location-field'>Starting Location: </label>
            <Autocomplete>
              <Input type='text' placeholder='Origin' ref={originRef} />
            </Autocomplete>
          </div>

          {/* end location input  */}
          <div style={{ paddingBottom: '50px' }}>
            <label htmlFor='ending-location-field'>Ending Location: </label>
            <Autocomplete>
              <Input
                type='text'
                placeholder='Destination'
                ref={destinationRef}
              />
            </Autocomplete>
          </div>

          {/* days per week dp  */}
          <div style={{ paddingBottom: '50px' }}>
            <label htmlFor='work-days-field'>Days per Week Commuting: </label>
            <select
              id='work-days-field'
              defaultValue=""
              onChange={(e) => setWorkDay(e.target.value)}
            >
              <option value="" disabled hidden>
                Select Days
              </option>
              {WORK_DAYS.map((day, index) => (
                <option key={index} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>

          <div style={{ paddingBottom: '20px' }}>
            <p><b>Select Vehicle Information</b></p>
          </div>

          {/* year dp  */}
          <div style={{ paddingBottom: '40px' }}>
            <label htmlFor='year-field'>Year: </label>
            <select
              id='year-field'
              defaultValue=""
              onChange={(e) => setSelectYear(e.target.value)}
            >
              <option value="" disabled hidden>
                Select Year
              </option>
              {/* <option value="none" selected disabled hidden>Year</option> */}
              {YEARS.map((year, index) => (
                <option key={index} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* car make dp  */}
          <div style={{ paddingBottom: '40px' }}>
            <label htmlFor='car-make-field'>Car Make: </label>
            <select
              id='car-make-field'
              defaultValue=""
              onChange={(e) => setCarMakeID(e.target.value)}
            >
              <option value="" disabled hidden>
                Select Car Make
              </option>
              {carMakes.map((carMake, index) => (
                <option key={index} value={carMake.Id}>
                  {carMake.Name}
                </option>
              ))}
            </select>
          </div>

          {/* car model dp  */}
          <div style={{ paddingBottom: '40px' }}>
            <label htmlFor='car-model-field'>Car Model: </label>
            <select
              id='car-model-field'
              defaultValue=""
              onChange={(e) => setCarTrimID(e.target.value)}
            >
              <option value="" disabled hidden>
                Select Car Model
              </option>
              {carModels.length > 0 ? (
                carModels.map((carModel, index) => (
                  <option key={index} value={carModel.TrimId}>
                    {carModel.ModelName} {carModel.TrimName}
                  </option>
                ))
              ) : (
                <option>No models found</option>
              )}
            </select>
          </div>

          <div style={{ paddingBottom: '40px' }}>
            <p><b>OR</b></p>
          </div>

          <div style={{ paddingBottom: '20px' }}>
            <p><b>Input MPG Value</b></p>
          </div>

          <div style={{ paddingBottom: '40px' }}>
            {carModels.length === 0 ? (
              <p>No models found, please enter MPG</p>
            ) : combinedMPGVal === 0.0 ? (
              <p>No MPG found, please enter MPG</p>
            ) : (
              ''
            )}
            {combinedMPGVal === 0.0 && <p>No MPG found, please enter MPG</p>}
            <label htmlFor='mpg-input-field'>Combined MPG: </label>
            <input
              id='mpg-input-field'
              type='text'
              value={combinedMPGVal}
              onChange={(e) => setCombinedMPGVal(e.target.value)}
              required
            />
          </div>

          <div>
            <HStack
              style={{ paddingBottom: '40px' }}
              spacing={4}
              mt={4}
              justifyContent='space-between'
            >
              <Button colorScheme='blue' type='submit'>
                Commutilate Route
              </Button>
              <Text>Distance: {distance} </Text>
              <Text>Duration: {duration} </Text>
            </HStack>
          </div>
        </form>
      </Flex>
      {/* end form  */}

      {/* map  */}
      <div className='map-container'>
        <Grid templateColumns='repeat(5, 1fr)' gap={4}>
          <GridItem colSpan={2}>
            <Map
              distance={distance}
              duration={duration}
              directionsResponse={directionsResponse}
              originRef={originRef}
              destinationRef={destinationRef}
            />
          </GridItem>

          {/* result  */}
          <GridItem colStart={4} colEnd={6}>
            {resultCalculation.result.weekly > 0 ? (
              <Center w='300px' h='500px'>
                <Text>Weekly Results: ${resultCalculation.result.weekly}</Text>
              </Center>
            ) : (
              <Center w='300px' h='500px'>
                <Text>
                  Please enter your car information to get the weekly result.
                </Text>
              </Center>
            )}
          </GridItem>
        </Grid>
      </div>
    </CharkhaProvider>
  )
}
