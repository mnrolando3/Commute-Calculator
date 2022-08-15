import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  Spinner,
  Text,
  Stack,
  ChakraProvider,
  theme,
} from '@chakra-ui/react'
import { FaLocationArrow, FaTimes } from 'react-icons/fa'
// @react-google-maps/api provides very simple bindings to the google maps api and lets you use it in your app as React components.
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api'
import { useRef, useState } from 'react'

const center = { lat: 35.904613, lng: -79.046761 }

function Map({ originRef, destinationRef }) {
  // const { isLoaded } = useJsApiLoader({
  //   googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  //   libraries: ['places'],
  // })

  const [map, setMap] = useState(/** @type google.maps.Map */ (null))
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')

  /** @type React.MutableRefObject<HTMLInputElement> */
  // const originRef = useRef()
  /** @type React.MutableRefObject<HTMLInputElement> */
  // const destiantionRef = useRef()
  // if app is loading it'll dsiaply the loading spinners from the chakra ui
  // if (!isLoaded) {
  //   return (
  //     <Stack direction='row' spacing={4}>
  //       <Spinner size='xs' />
  //       <Spinner size='sm' />
  //       <Spinner size='md' />
  //       <Spinner size='lg' />
  //       <Spinner size='xl' />
  //       <Spinner size='lg' />
  //       <Spinner size='md' />
  //       <Spinner size='sm' />
  //       <Spinner size='xs' />
  //       <Spinner size='xs' />
  //       <Spinner size='sm' />
  //       <Spinner size='md' />
  //       <Spinner size='lg' />
  //       <Spinner size='xl' />
  //       <Spinner size='lg' />
  //       <Spinner size='md' />
  //       <Spinner size='sm' />
  //       <Spinner size='xs' />
  //     </Stack>
  //   )
  // }

  async function calculateRoute() {
    console.log('orirint', originRef)
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
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
  }

  function clearRoute() {
    setDirectionsResponse(null)
    setDistance('')
    setDuration('')
    originRef.current.value = ''
    destinationRef.current.value = ''
  }

  return (
    // <ChakraProvider theme={theme}>
    <Flex
      position='relative'
      flexDirection='column'
      alignItems='center'
      h='100vh'
      w='100vw'
    >
      <h1> COMMUTILATE ROUTE</h1>
      <br></br>
      {/* <HStack spacing={2} justifyContent='space-between'> */}
      {/* <Box flexGrow={1}> */}
      {/* <Autocomplete>
          <Input type='text' placeholder='Origin' ref={originRef} />
        </Autocomplete> */}
      {/* </Box> */}
      {/* <Box flexGrow={1}>
        <Autocomplete>
          <Input type='text' placeholder='Destination' ref={destinationRef} />
        </Autocomplete>
      </Box> */}

      <ButtonGroup>
        <Button colorScheme='pink' type='submit' onClick={calculateRoute}>
          Calculate Route
        </Button>
        <IconButton
          aria-label='center back'
          icon={<FaTimes />}
          onClick={clearRoute}
        />
      </ButtonGroup>
      {/* </HStack> */}
      <HStack spacing={4} mt={4} justifyContent='space-between'>
        <Text>Distance: {distance} </Text>
        <Text>Duration: {duration} </Text>
        <IconButton
          aria-label='center back'
          icon={<FaLocationArrow />}
          isRound
          onClick={() => {
            map.panTo(center)
            map.setZoom(15)
          }}
        />
      </HStack>
      <Box left={0} top={0} h='100%' w='100%'>
        {/* Google Map Box */}
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => setMap(map)}
        >
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </Box>
      {/* <Box
        p={4}
        borderRadius='lg'
        m={4}
        bgColor='white'
        shadow='base'
        minW='container.md'
        zIndex='1'
      > */}
      {/* </Box> */}
    </Flex>
    // </ChakraProvider>
  )
}

export default Map
