import React from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWaveSquare, faSearch, faArrowRight, faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
import ThemeToggleContext from '../contexts/ThemeToggleContext'


const Button = styled.button`
    background-color: transparent;
    border: 2px solid ${({theme}) => theme.colors.primary};
    border-radius: 5px;
    padding: 0.25em;
    cursor: pointer;

    color: ${({theme}) => theme.colors.primary};
    font-size: 18px;
    font-weight: 500;

    & svg {
        width: 1em;
        font-size: 24px;
    }
    & span {
        vertical-align: top;
        margin-left: 5px;
    }
    &:hover {
        background-color: ${({theme}) => theme.colors.button_hover};
    }

    @media (max-width: 768px) {
        span {
            display: none;
        }
    }
`

const Nav = styled.nav`
    position: sticky;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1em;
    z-index: 100;

    font-size: 2rem;
    height: 75px;
    padding-left: 20px;
    padding-right: 20px;

    @media (max-width: 768px) {
        height: 55px;
        gap: 0.5em;
    }

    background-color: ${({theme}) => theme.colors.accent};
    & li {
        display: inline;
    }
    & ul {
        margin: 0;
        padding: 0;
    }
    li a {
        color: ${({theme}) => theme.colors.primary};
        text-decoration: none;
    }
`

const Logo = styled.li`
    font-family: "Mohave";
    font-weight: 500;
    font-size: 32px;

    span {
        margin-left: 0.2em;
        @media (max-width: 768px) {
            display: none;
        }
    }
`

const Form = styled.form`
    box-sizing: border-box;
    height: 40px;
    width: 35vw;

    @media (max-width: 768px) {
        width: calc(100% - 6em);
    }
`

const Search = styled.div`
    display: block;

    display: flex;
    align-items: center;
    background-color: ${({theme}) => theme.colors.background};
    border-radius: 20px;
    width: 100%;
    height: 100%;
    padding-left: 0.5em;
    padding-right: 0.5em;


    font-size: 24px;

    & input {
        font-size: 24px;
        width: 100%;
        background-color: transparent;
        border: none;
        height: 80%;
        color: ${({theme}) => theme.colors.secondary};
    }
    & input:focus {
        outline: none;
    }

    & .search {
        color: ${({theme}) => theme.colors.placeholder};
        margin-right: 0.2em;
    }

    & button {
        border: none;
        background-color: transparent;
        color: ${({theme}) => theme.colors.secondary};
        font-size: 24px;
        cursor: pointer;
    }
    &:hover {
        filter: drop-shadow(1px 2px 2px ${({theme}) => theme.colors.shadow});
    }
`

const End = css`
    margin-left: auto;
`

const Units = css`
    font-weight: 500;
    width: 37px;
    height: 37px;
`


export default function NavBar(props) {
    const { isDayTheme, toggleTheme } = React.useContext(ThemeToggleContext)
    const { imperialUnits, setUnits,
            locationQuery, setLocationQuery,
            setSearchParams} = props

    return (
        <Nav>
            <ul>
                <Logo><a href="/"><FontAwesomeIcon icon={faWaveSquare}/><span>WeatherWave</span></a></Logo>
            </ul>
            <Form onSubmit={e => {
                e.preventDefault()
                setSearchParams({ q: locationQuery})
            }}>
                <Search>
                    <FontAwesomeIcon className="search" icon={faSearch}/>
                    <input
                        placeholder="City,State,Country"
                        value={locationQuery}
                        name="location"
                        onChange={e => setLocationQuery(e.target.value)}
                    />
                    <button type="submit"><FontAwesomeIcon icon={faArrowRight}/></button>
                </Search>
            </Form>
            <Button css={[End, Units]} onClick={() => setUnits(prev => !prev)}>
                {imperialUnits ? <>&deg;F</>: <>&deg;C</>}
            </Button>
            <Button onClick={() => toggleTheme(prev => !prev)}>
                {isDayTheme ? <FontAwesomeIcon icon={faSun}/> : <FontAwesomeIcon icon={faMoon}/>}
                <span>Theme</span>
            </Button>
        </Nav>
    )
}
