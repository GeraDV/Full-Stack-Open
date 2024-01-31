import axios from 'axios';

const baseURL = 'https://studies.cs.helsinki.fi/restcountries/api'

const getMatches = (filter) => {
    const match = filter.toLowerCase();
    return (
        axios
        .get(`${baseURL}/all`)
        .then(res => {
            return (
                res.data.filter(country => {
                    const common = country.name.common.toLowerCase()
                    const official = country.name.official.toLowerCase()
                    return (
                        common.includes(match)
                        || official.includes(match)
                    )
                })
            )
        })
    )
}

const getCountry = (name) => {
    return (
        axios
        .get(`${baseURL}/name/${name}`)
        .then(res => res.data)
    )
}

export default {getMatches, getCountry}