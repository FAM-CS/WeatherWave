import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDroplet } from '@fortawesome/free-solid-svg-icons'



const Card = styled.figure`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    gap: 0.5em;

    margin: 0;
    padding: 10px;
    width: 300px;
    border-radius: 20px;
    background-color: ${({theme}) => theme.colors.accent_card};
    backdrop-filter: blur(2px);
    filter: drop-shadow(0px 2px 4px ${({theme}) => theme.colors.shadow});

    color: ${({theme}) => theme.colors.primary};
`

const DateLabel = styled.h1`
    margin: 0;
    font-size: 28px;
    color: ${({theme}) => theme.colors.primary};
    font-weight: 400;
`

const HighTemp = styled.h1`
    display: inline-block;
    margin: 0;
    font-size: 24px;
    color: ${({theme}) => theme.colors.primary};
    font-weight: normal;
`

const LowTemp = styled.h2`
    display: inline-block;
    margin: 0;
    font-size: 24px;
    color: ${({theme}) => theme.colors.text_deactive};
    font-weight: normal;
    margin-left: 1em;
`

const Weather = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    text-align: left;

    img {
        display: block;
    }
`

const Description = styled.h1`
    /* display: inline-block; */
    margin: 0;
    font-size: 24px;
    color: ${({theme}) => theme.colors.primary};
    font-weight: 500;
`

const Pop = styled.div`
    margin-top: 0.2em;
    margin-bottom: 0.2em;
    font-size: 18px;
    color: ${({theme}) => theme.colors.text_deactive};
    & span {
        margin-left: 5px;
        vertical-align: top;
    }
`

const Stats = styled.div`
    text-align: center;
    padding-right: 30px;
`

//? https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date
//? https://www.freecodecamp.org/news/javascript-capitalize-first-letter-of-word/
export default function ForecastCard(props) {
    let {dt, timezone, main, weather, pop } = props
    //
    const date = new Date((dt+timezone) * 1000)
    const weekdayTime = date.toLocaleTimeString('en-US', {timeZone: "UTC", weekday: "short", hour12: true, hour: "numeric", minute: "2-digit"})
    //
    const imgURL = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`
    const description = weather[0].description.charAt(0).toUpperCase() + weather[0].description.slice(1)
    const highTemp = Math.round(main.temp_max)
    const lowTemp = Math.round(main.temp_min)
    pop = `${Math.round(pop * 100)}%`
    //
    return (
        <Card>
            <DateLabel>{weekdayTime}</DateLabel>
            <Weather>
                <img src={imgURL}/>
                <Stats>
                    <Description>{description}</Description>
                    <Pop><FontAwesomeIcon icon={faDroplet}/><span>{pop}</span></Pop>
                    <HighTemp>{highTemp}&deg;</HighTemp>
                    <LowTemp>{lowTemp}&deg;</LowTemp>
                </Stats>
            </Weather>
        </Card>
    )
}