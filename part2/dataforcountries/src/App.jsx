import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
    const [countries, setCountries] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        axios
            .get("https://studies.cs.helsinki.fi/restcountries/api/all")
            .then((response) => {
                setCountries(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleChange = (event) => {
        setSearch(event.target.value);
    };

    const countriesToShow = countries.filter((country) => country.name.common.toLowerCase().includes(search.toLowerCase()));
    const len = countriesToShow.length;

    return (
        <>
            <p>Find Countries</p>
            <input type="text" onChange={handleChange} value={search} />

            {len > 10 && <p>Too many results, please narrow down your search</p>}

            {len <= 10 && len > 1 && (
                <ul>
                    {countriesToShow.map((country, index) => (
                        <li key={index}>{country.name.common}</li>
                    ))}
                </ul>
            )}

            {len === 1 && (
                <>
                    {countriesToShow.map((country, index) => {
                        const langArr = Object.values(country.languages);
                        return (
                            <div key={index}>
                                <p>
                                    {country.name.common} {country.flag}
                                </p>
                                <p>Capital: {country.capital}</p>
                                <p>Area: {country.area}</p>
                                <p>Languages:</p>
                                <ul>
                                    {langArr.map((lang, index) => {
                                        return <li key={index}>{lang}</li>;
                                    })}
                                </ul>
                                <p>
                                    Maps: <a href={country.maps.googleMaps}>link</a>
                                </p>

                                {/* <iframe src={} width={600} height={450} style={{ border: "0" }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe> */}
                                <p>Alternate Spellings:</p>
                                <ul>
                                    {country.altSpellings.map((altSpelling, index) => (
                                        <li key={index}>{altSpelling}</li>
                                    ))}
                                </ul>

                                <img src={country.flags.png} alt="flag" />
                            </div>
                        );
                    })}
                </>
            )}
        </>
    );
};

export default App;
