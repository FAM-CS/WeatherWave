import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import styled from '@emotion/styled'
import NavBar from './components/NavBar'
import ForecastCard from './components/ForecastCard'
import Spinner from './components/Spinner'


const Main = styled.main`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
`

const Error = styled.span`
    color: #971919;
    font-size: 32px;
`

export default function App(props) {
    const { isDayTheme, toggleTheme } = props
    const [ imperialUnits, setUnits ] = useState(true)
    //
    const [ searchParams, setSearchParams ] = useSearchParams()
    const query = searchParams.get("q")
    const [ locationQuery, setLocationQuery] = useState(query || "")

    const { fetchStatus, isLoading, error, data } = useQuery({
        queryKey: [ "getForecast", query, imperialUnits ],
        queryFn: async () => {
            const res = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=${query}&units=${imperialUnits ? "imperial" : "metric"}&appid=${import.meta.env.VITE_OPENWEATHER_KEY}`,
            )
            return res.json() // not awaiting the result because it should return promise
        }
    })

    // TODO: Add try catch above
    // TODO: Improve UI by showing an error of city not found, and also some city selector
    // TODO: Separate cards more by day to show discontinuity
    // TODO: Map
    // TODO: Current weather card

    console.log("== fetchStatus:", fetchStatus)
    console.log("== isLoading:", isLoading)
    console.log("== error:", error)
    console.log("== data:", data)

    return (
        <>
            <NavBar
                isDayTheme={isDayTheme}
                toggleTheme={isDayTheme => toggleTheme(isDayTheme)}
                imperialUnits={imperialUnits}
                setUnits={imperialUnits => setUnits(imperialUnits)}
                locationQuery={locationQuery}
                setLocationQuery={locationQuery => setLocationQuery(locationQuery)}
                setSearchParams={searchParams => setSearchParams(searchParams)}
            />
            <Main>
                {error && <Error>Error...</Error>}
                {isLoading && <Spinner />}
                {data?.list && data.list.map((forecast, idx) => (
                    <ForecastCard
                        key={idx}
                        dt={forecast.dt}
                        timezone={data.city.timezone}
                        main={forecast.main}
                        weather={forecast.weather}
                        pop={forecast.pop}
                    />
                ))}
            </Main>
        </>
    )
}
