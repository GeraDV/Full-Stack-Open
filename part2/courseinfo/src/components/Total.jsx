const Total = ({parts}) => {
    return (
        <p><b>
            Number of exercises: <span>{parts
                .reduce((prev,curr)=>prev+curr.exercises,0)}</span>
        </b></p>
    )
}

export default Total;