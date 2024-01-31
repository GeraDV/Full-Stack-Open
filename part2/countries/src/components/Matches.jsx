const Matches = ({countries, search}) => {
    return (
        <div>
            {
                countries.length>0 && countries.length<=10? 
                <ul>
                    {
                        countries
                        .map(match => {
                            const common = match.name.common
                            const official = match.name.official
                            const keyID = common.toLowerCase();
                            return(
                                common.toLowerCase().includes(search.toLowerCase())?
                                <li key={keyID}>{common}</li>
                                :<li key={keyID}>{official}</li>
                            )
                        })
                    }
                </ul>
                : <p>Too many matches, specify another filter</p>
            }
        </div>
    )
}

export default Matches;