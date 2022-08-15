import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Text,
} from '@chakra-ui/react'
import { FaLocationArrow, FaTimes } from 'react-icons/fa'
// @react-google-maps/api provides very simple bindings to the google maps api and lets you use it in your app as React components.
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from '@react-google-maps/api'
import {  useState } from 'react'

const center = { lat: 35.904613, lng: -79.046761 }

function Map({ originRef, destinationRef }) {

  const [map, setMap] = useState(/** @type google.maps.Map */ (null))
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')

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
    <Flex
      position='relative'
      flexDirection='column'
      alignItems='center'
      h='100vh'
      w='100vw'
    >
      <ButtonGroup>
        <Button colorScheme='pink' type='submit' onClick={calculateRoute}>
          Commutilate Route
        </Button>
        <IconButton
          aria-label='center back'
          icon={<FaTimes />}
          onClick={clearRoute}
        />
      </ButtonGroup>
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
    </Flex>
  )
}
export default Map
