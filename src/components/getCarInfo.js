import axios from 'axios'
import { Input, ChakraProvider, theme, Box } from '@chakra-ui/react'
import React, { useState, useEffect, useRef } from 'react'
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
  LoadScript,
} from '@react-google-maps/api'
import Map from './map'

const libraries = ['places']

export default function CarMake() {
  // const { isLoaded } = useJsApiLoader({
  //   googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  //   libraries: ['places'],
  // })
  const originRef = useRef()
  const destinationRef = useRef()
  const yearsArray = [
    1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002,
    2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014,
    2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023,
  ]
  const workDays = [1, 2, 3, 4, 5, 6, 7]
  const [startPoint, setStartPoint] = useState('')
  const [endPoint, setEndPoint] = useState('')
  const [mpgInput, setMpgInput] = useState(null)
  const [selectYear, setSelectYear] = useState(1991)
  const [carMakes, setCarMakes] = useState([])
  const [dropItem, setDropItem] = useState('1')
  const [workDay, setWorkDay] = useState(1)

  // console.log('year ', selectYear)
  // console.log('make', dropItem)

  useEffect(() => {
    // const directionsService = new google.maps.DirectionsService()
    axios
      .get('https://fathomless-mountain-86819.herokuapp.com/getmakes')
      .then((res) => {
        console.log('res', res)
        setCarMakes(res.data)
      })
  }, [])

  useEffect(() => {
    // before making req to /getvehiclesmodels do if statement
    if (selectYear && dropItem) {
      // do request
      // axios
      //   .get('https://fathomless-mountain-86819.herokuapp.com/getmakes')
      //   .then((res) => {
      //     console.log('res', res)
      //     setCarMakes(res.data)
      //   })
    }
  }, [selectYear, dropItem])

  const handleAskQuestion = (event) => {
    event.preventDefault()
    console.log('starting point:', startPoint)
    console.log('ending point:', endPoint)
    console.log('mpg input:', mpgInput)
    console.log('year:', selectYear)
    console.log('car make id:', dropItem)
    console.log('work day:', workDay)
  }

  return (
    <LoadScript
      libraries={libraries}
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
    >
      <ChakraProvider them={theme}>
        <div>
          <h1>Car Info</h1>
        </div>
        <div>
          <form onSubmit={handleAskQuestion}>
            <div>
              <label htmlFor='starting-location-field'>
                Starting Location:{' '}
              </label>
              {/* <input
              id='starting-location-field'
              type='text'
              value={startPoint}
              onChange={(e) => setStartPoint(e.target.value)}
              required
            /> */}
              <Autocomplete>
                <Input type='text' placeholder='Origin' ref={originRef} />
              </Autocomplete>
            </div>
            <br />

            <div>
              <label htmlFor='ending-location-field'>Ending Location: </label>
              {/* <Input
              id='ending-location-field'
              type='text'
              value={endPoint}
              onChange={(e) => setEndPoint(e.target.value)}
              required
            /> */}
              {/* <Box flexGrow={1}> */}
              <Autocomplete>
                <Input
                  type='text'
                  placeholder='Destination'
                  ref={destinationRef}
                />
              </Autocomplete>
              {/* </Box> */}
            </div>
            <br />

            <div>
              <label htmlFor='mpg-input-field'>Input MPG: </label>
              <input
                id='mpg-input-field'
                type='text'
                value={mpgInput}
                onChange={(e) => setMpgInput(e.target.value)}
                required
              />
            </div>
            <br />

            <div>
              <label htmlFor='year-field'>Year: </label>
              <select
                id='year-field'
                // value={dropItem}
                onChange={(e) => setSelectYear(e.target.value)}
              >
                {yearsArray.map((yearz, index) => (
                  <option key={index} value={yearz}>
                    {yearz}
                  </option>
                ))}
              </select>
            </div>
            <br />

            <div>
              <label htmlFor='car-make-field'>Car Make: </label>
              <select
                id='car-make-field'
                // value={dropItem}
                onChange={(e) => setDropItem(e.target.value)}
              >
                {carMakes.map((carz, index) => (
                  <option key={index} value={carz.Id}>
                    {carz.Name}
                  </option>
                ))}
              </select>
            </div>
            <br />

            <div>
              <label htmlFor='work-days-field'>Working Days: </label>
              <select
                id='work-days-field'
                // value={dropItem}
                onChange={(e) => setWorkDay(e.target.value)}
              >
                {workDays.map((dayz, index) => (
                  <option key={index} value={dayz}>
                    {dayz}
                  </option>
                ))}
              </select>
            </div>
            <br />

            <div>
              <input type='submit' value='Get Car Make Id' />
            </div>
          </form>
        </div>
        <Map originRef={originRef} destinationRef={destinationRef} />
      </ChakraProvider>
    </LoadScript>
  )
}
