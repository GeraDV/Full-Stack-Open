import MatchLine from "./MatchLine";

const Matches = ({matches, search, handleShow}) => {
    return (
        <div>
            {
                matches.length>10? 
                <p>Too many matches, specify another filter</p>
                :<ul>
                    {
                        matches
                        .map(match =><MatchLine 
                                    key={match.name.common} 
                                    match={match} 
                                    search={search}
                                    handleShow={handleShow}/>
                        )
                    }
                </ul>
            }
        </div>
    )
}

export default Matches;