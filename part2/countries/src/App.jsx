import { useState, useEffect } from 'react'
import countrieService from './services/countries'
import Country from './components/Country'
import Matches from './components/Matches'

const Search = ({text, handleSearch}) => {
  return (
    <div>
      find countries <input value={text} onChange={handleSearch}/>
    </div>
  )
}

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [country, setCountry] = useState()

  useEffect(()=>{
    if(search){
      countrieService
        .getMatches(search)
        .then(res => setCountries(res))
    }
  }, [search])

  useEffect(()=>{
    if(countries.length===1){
      const name = countries[0].name.common.toLowerCase();
      countrieService
        .getCountry(name)
        .then(res => {
          setCountry(res)
        })
    }else{
      setCountry();
    }
  },[countries])


  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const handleShow = (country) => {
    setSearch(country.name.common)
    setCountries([country]);
  }

  return (
    <div>
      {/* <Search value={search} handleSearch={handleSearch}/> */}
      <div>find countries <input value={search} onChange={handleSearch}/></div>
      {country?
        <Country country={country}/>
        :<Matches countries={countries} search={search} handleShow={handleShow}/>
      }
    </div>
  )
}

export default App
