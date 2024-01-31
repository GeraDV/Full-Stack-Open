const Country = ({country}) => {

    const flagStyle = {
        height:'auto',
        width:'120px'
    }
    
    return (
        <div>
            <h2>{country.name.common}</h2>
            <p>
                capital: {country.capital} <br/>
                area: {country.area}
            </p>
            <h3>Languages</h3>
            <ul>
                {Object
                    .values(country.languages)
                    .map(lang => <li key={lang}>{lang}</li>)}
            </ul>
            <img style={flagStyle} src={country.flags.svg} alt={country.flags.alt} />
        </div>
    )
}

export default Country;