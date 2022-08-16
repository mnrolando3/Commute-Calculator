import axios from 'axios';
// import React from 'react';
import React, { useState, useEffect } from 'react';

export default function CarMake() {

    const yearsArray = [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023]

    const workDays = [1, 2, 3, 4, 5, 6, 7]

    const [startPoint, setStartPoint] = useState('')

    const [endPoint, setEndPoint] = useState('')

    const [selectYear, setSelectYear] = useState(1991)

    const [carMakes, setCarMakes] = useState([])

    const [carMakeID, setCarMakeID] = useState('1')

    const [carModels, setCarModels] = useState([])

    const [carTrimID, setCarTrimID] = useState('')

    const [combinedMPGVal, setCombinedMPGVal] = useState('')

    // const [mpgInput, setMpgInput] = useState(null)

    const [workDay, setWorkDay] = useState(1)



    useEffect(() => {
        axios
            .get('https://fathomless-mountain-86819.herokuapp.com/getmakes')
            .then((res) => {
                console.log('makes', res)
                setCarMakes(res.data)
            })
    }, [])


    useEffect(() => {
        if (selectYear && carMakeID) {
            axios
                .get(`https://fathomless-mountain-86819.herokuapp.com/getvehiclemodels?year=${selectYear}&makeid=${carMakeID}`)
                .then((res) => {
                    console.log('models', res)
                    setCarModels(res.data)
                })
        }
    }, [selectYear, carMakeID])

    useEffect(() => {
        if (selectYear && carTrimID) {
            axios
                .get(`https://fathomless-mountain-86819.herokuapp.com/getvehiclespec?year=${selectYear}&trimid=${carTrimID}`)
                .then((res) => {
                    console.log('trims', res.data)
                    setCombinedMPGVal(res.data.CombinedMpg)
                })
        }
    }, [selectYear, carTrimID])



    const handleAskQuestion = (event) => {
        event.preventDefault()
        console.log('starting point:', startPoint)
        console.log('ending point:', endPoint)
        console.log('year:', selectYear)
        console.log('car make id:', carMakeID)
        console.log('car trim id:', carTrimID)
        // console.log('mpg input:', mpgInput)
        console.log('work day:', workDay)

    }

    return (
        <>
            <div>
                <h1>Car Info</h1>
            </div>
            <div>
                <form onSubmit={handleAskQuestion}>

                    <div>
                        <label htmlFor='starting-location-field'>Starting Location: </label>
                        <input
                            id='starting-location-field'
                            type="text"
                            value={startPoint}
                            onChange={(e) => setStartPoint(e.target.value)}
                            required
                        />
                    </div>
                    <br />


                    <div>
                        <label htmlFor='ending-location-field'>Ending Location: </label>
                        <input
                            id='ending-location-field'
                            type="text"
                            value={endPoint}
                            onChange={(e) => setEndPoint(e.target.value)}
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
                        <label htmlFor='car-model-field'>Car Model: </label>
                        <select
                            id='car-model-field'
                            // value={dropItem}
                            onChange={(e) => setCarTrimID(e.target.value)}
                        >
                            {carModels.map((modelz, index) => (
                                <option key={index} value={modelz.TrimId}>
                                    {modelz.TrimName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <br />


                    <div>
                        <label htmlFor='mpg-input-field'>Input MPG: </label>
                        <input
                            id='mpg-input-field'
                            type="text"
                            value={combinedMPGVal}
                            onChange={(e) => setCombinedMPGVal(e.target.value)}
                            required
                        />
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
                        <input type="submit" value="Get Car Make Id" />
                    </div>
                </form>
            </div>
            <div>
                <p>Combined MPG: {combinedMPGVal}</p>
            </div>
        </>
    )
}