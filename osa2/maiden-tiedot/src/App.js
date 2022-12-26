import { useState, useEffect } from "react"
import axios from "axios"

const Filter = ({ value, handleChange }) => (
    <div>
        find countries
        <input
            value={value}
            onChange={handleChange}
        />
    </div>
)

const Content = ({ countries, filter, setFilterValue }) => {
    const countriesFiltered = countries
        .filter(country => country.name.common
            .toLowerCase()
            .includes(filter))
    if (countriesFiltered.length > 10) {
        return <div>Too many matches ({countriesFiltered.length})</div>
    }
    if (countriesFiltered.length > 1) {
        return countriesFiltered
            .map(country =>
                <ListCountry
                    key={country.cca3}
                    country={country}
                    handleClick={() => setFilterValue(country.name.common)}
                />
            )
    }
    if (countriesFiltered.length <= 0) {
        return <div>No matches</div>
    }
    return <CountryDetails country={countriesFiltered[0]} />
}

const ListCountry = ({ country, handleClick }) => (
    <div>
        {country.name.common}
        <button onClick={handleClick}>show</button>
    </div>
)

const CountryDetails = ({ country }) => (
    <div>
        <h2>{country.name.common}</h2>
        <div>capital {country.capital}</div>
        <div>area {country.area}</div>
        <h4>languages:</h4>
        <ul>
            {Object.values(country.languages)
                .map(language => <li key={language}>{language}</li>)}
        </ul>
        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} height="100px" />
        <WeatherDetails country={country} />
    </div>
)

const WeatherDetails = ({ country }) => {
    const [weatherInfo, setWeatherInfo] = useState()

    const api_key = process.env.REACT_APP_API_KEY
    const lat = country.capitalInfo.latlng[0]
    const lng = country.capitalInfo.latlng[1]
    const api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${api_key}`

    useEffect(() => {
        axios
            .get(api_url)
            .then(response => {
                setWeatherInfo(response.data)
            })
    }, [])

    if (weatherInfo) return (
        <div>
            <h3>Weather in {country.capital[0]}</h3>
            <div>temperature {(weatherInfo.main.temp - 273.15).toFixed(2)} Celsius</div>
            <img src={`https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}.png`} alt={weatherInfo.weather[0].description} />
            <div>wind {weatherInfo.wind.speed} m/s</div>
        </div>
    )
}

const App = () => {
    const [countries, setCountries] = useState([])
    const [filterValue, setFilterValue] = useState("")

    const handleFilterChange = (event) => setFilterValue(event.target.value)

    useEffect(() => {
        axios
            .get("https://restcountries.com/v3.1/all")
            .then(response => setCountries(response.data))
    }, [])

    return (
        <div>
            <Filter value={filterValue} handleChange={handleFilterChange} />
            <Content countries={countries} filter={filterValue.toLowerCase()} setFilterValue={setFilterValue} />
        </div>
    )
}

export default App