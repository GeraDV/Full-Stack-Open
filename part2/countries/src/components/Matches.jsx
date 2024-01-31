import MatchLine from "./MatchLine";

const Matches = ({countries, search, handleShow}) => {
    return (
        <div>
            {
                countries.length>0 && countries.length<=10? 
                <ul>
                    {
                        countries
                        .map(match =><MatchLine 
                                    key={match.name.common} 
                                    match={match} 
                                    search={search}
                                    handleShow={handleShow}/>
                        )
                    }
                </ul>
                : <p>Too many matches, specify another filter</p>
            }
        </div>
    )
}

export default Matches;