const ButtonShow = ({handleShow, country}) => {
    const handleClick = () =>{
        handleShow(country)
    }
    return (
        <button onClick={handleClick}>
            Show
        </button>
    )
}

const MatchLine = ({match, search, handleShow}) => {
    const common = match.name.common
    const official = match.name.official

    const name = common.toLowerCase().includes(search.toLowerCase())?
                    common : official
    return(
        <li>{name} <ButtonShow handleShow={handleShow} country={match}/></li>
    )
}

export default MatchLine;