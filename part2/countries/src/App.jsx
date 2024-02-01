import { useState, useEffect } from 'react'
import countryService from './services/countries'
import Country from './components/Country'
import Matches from './components/Matches'

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [country, setCountry] = useState();
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    countryService
      .getAll()
      .then(res => {
        setCountries(res);
      })
  }, [])

  useEffect(()=>{
    if(matches.length===1){
      const name = matches[0].name.common.toLowerCase();
      countryService
        .getCountry(name)
        .then(res => {
          setCountry(res)
        })
    }else{
      setCountry();
    }
  },[matches])


  const handleSearch = (event) => {
    const name = event.target.value
    setSearch(name)
    const listMatches = 
    countries.filter(country => {
      const common = country.name.common.toLowerCase()
      const official = country.name.official.toLowerCase()
      return (
          common.includes(name.toLowerCase())
          || official.includes(name.toLowerCase())
      )
    })
    setMatches(listMatches)
  }

  const handleShow = (country) => {
    console.log([country]);
    setSearch(country.name.common)
    setMatches([country])
  }

  return (
    <div>
      {countries.length===0?
        <p>Loading countries...</p>
        :<div>
          <div>find countries <input value={search} onChange={handleSearch}/></div>
          {country?
            <Country country={country}/>
            :<Matches matches={matches} search={search} handleShow={handleShow}/>
          }
        </div>
      }
    </div>
  )
}

export default App
