import axios from "axios";
import {
  Input,
  ChakraProvider,
  theme,
  Stack,
  Box,
  Heading,
  Flex,
  Text,
  Center,
  Square,
} from "@chakra-ui/react";
import React, { useState, useEffect, useRef } from "react";
import { Autocomplete } from "@react-google-maps/api";
import Map from "./map";

export default function Home() {
  const originRef = useRef();
  const destinationRef = useRef();
  const yearsArray = [
    2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012,
    2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000,
    1999, 1998, 1997, 1996, 1995, 1994, 1993, 1992, 1991,
  ];
  const workDays = [1, 2, 3, 4, 5, 6, 7];
  // const [mpgInput, setMpgInput] = useState(null);
  const [selectYear, setSelectYear] = useState(2023);
  const [carMakes, setCarMakes] = useState([]);
  const [carMakeID, setCarMakeID] = useState("1");
  const [workDay, setWorkDay] = useState(1);
  const [startPoint, setStartPoint] = useState("");
  const [endPoint, setEndPoint] = useState("");
  const [carModels, setCarModels] = useState([]);
  const [carTrimID, setCarTrimID] = useState("");
  const [combinedMPGVal, setCombinedMPGVal] = useState("");

  useEffect(() => {
    axios
      .get("https://fathomless-mountain-86819.herokuapp.com/getmakes")
      .then((res) => {
        console.log("res", res);
        setCarMakes(res.data);
      });
  }, []);

  useEffect(() => {
    if (selectYear && carMakeID) {
      axios
        .get(
          `https://fathomless-mountain-86819.herokuapp.com/getvehiclemodels?year=${selectYear}&makeid=${carMakeID}`
        )
        .then((res) => {
          console.log("models", res);
          setCarModels(res.data);
        });
    }
  }, [selectYear, carMakeID]);

  useEffect(() => {
    if (selectYear && carTrimID) {
      axios
        .get(
          `https://fathomless-mountain-86819.herokuapp.com/getvehiclespec?year=${selectYear}&trimid=${carTrimID}`
        )
        .then((res) => {
          console.log("trims", res.data);
          const roundedMPGVal = (
            Math.round(res.data.CombinedMpg * 100) / 100
          ).toFixed(1);
          setCombinedMPGVal(roundedMPGVal);
        });
    }
  }, [selectYear, carTrimID]);

  const handleAskQuestion = (event) => {
    event.preventDefault();
    // console.log('starting point:', startPoint)
    // console.log('ending point:', endPoint)
    console.log("year:", selectYear);
    console.log("car make id:", carMakeID);
    console.log("car trim id:", carTrimID);
    // console.log('mpg input:', mpgInput)
    console.log("work day:", workDay);
  };

  return (
    <ChakraProvider them={theme}>
      <Flex
        position="relative"
        flexDirection="column"
        alignItems="center"
        // h="100vh"
        // w="100vw"
      >
        <div>
          <form onSubmit={handleAskQuestion}>
            <div>
              <label htmlFor="starting-location-field">
                Starting Location:{" "}
              </label>
              <Autocomplete>
                <Input type="text" placeholder="Origin" ref={originRef} />
              </Autocomplete>
            </div>
            <br />

            <div>
              <label htmlFor="ending-location-field">Ending Location: </label>
              <Autocomplete>
                <Input
                  type="text"
                  placeholder="Destination"
                  ref={destinationRef}
                />
              </Autocomplete>
            </div>
            <br />

            <div>
              <label htmlFor="year-field">Year: </label>
              <select
                id="year-field"
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
              <label htmlFor="car-make-field">Car Make: </label>
              <select
                id="car-make-field"
                onChange={(e) => setCarMakeID(e.target.value)}
              >
                {carMakes.map((makez, index) => (
                  <option key={index} value={makez.Id}>
                    {makez.Name}
                  </option>
                ))}
              </select>
            </div>
            <br />

            <div>
              <label htmlFor="car-model-field">Car Model: </label>
              <select
                id="car-model-field"
                onChange={(e) => setCarTrimID(e.target.value)}
              >
                {carModels.map((modelz, index) => (
                  <option key={index} value={modelz.TrimId}>
                    {modelz.ModelName} {modelz.TrimName}
                  </option>
                ))}
              </select>
            </div>
            <br />

            <div>
              <label htmlFor="mpg-input-field">Input MPG: </label>
              <input
                id="mpg-input-field"
                type="text"
                value={combinedMPGVal}
                onChange={(e) => setCombinedMPGVal(e.target.value)}
                required
              />
            </div>
            <br />

            <div>
              <label htmlFor="work-days-field">Working Days: </label>
              <select
                id="work-days-field"
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
              <input type="submit" value="Commutilate Route" />
            </div>
          </form>
        </div>
      </Flex>
      <div className="map-container">
        <Flex flexDirection="row" alignItems="justify-content">
          <Center w="600px">
            <Heading fontSize="xl">Live Map</Heading>
            <Map originRef={originRef} destinationRef={destinationRef} />
          </Center>
          <Square bg="blue.500" size="150px">
            <Text>empty space</Text>
          </Square>
          <Box flex="1" bg="tomato">
            <Text>Result Box</Text>
          </Box>
        </Flex>
      </div>
    </ChakraProvider>
  );
}
