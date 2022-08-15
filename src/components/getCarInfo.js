import axios from 'axios';
// import React from 'react';
import React, { useState, useEffect } from 'react';

export default function CarMake() {

    const workDays = [1, 2, 3, 4, 5, 6, 7]

    const [workDay, setWorkDay] = useState(1)

    const [mpgInput, setMpgInput] = useState(null)

    const [carMakes, setCarMakes] = useState([])

    const [dropItem, setDropItem] = useState('1')

    useEffect(() => {
        axios
            .get('https://fathomless-mountain-86819.herokuapp.com/getmakes')
            .then((res) => {
                console.log('res', res)
                setCarMakes(res.data)
            })
    }, [])

    const handleAskQuestion = (event) => {
        event.preventDefault()
        console.log('car make id:', dropItem)
        console.log('work day:', workDay)
        console.log('mpg input:', mpgInput)

    }

    return (
        <>
            <div>
                <h1>Car Info</h1>
            </div>
            <div>
                <form onSubmit={handleAskQuestion}>


                    <div>
                        <label htmlFor='mpg-input-field'>Input MPG: </label>
                        <input
                            id='mpg-input-field'
                            type="text"
                            value={mpgInput}
                            onChange={(e) => setMpgInput(e.target.value)}
                            required
                        />
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
                        <input type="submit" value="Get Car Make Id" />
                    </div>
                </form>
            </div>
        </>
    )
}