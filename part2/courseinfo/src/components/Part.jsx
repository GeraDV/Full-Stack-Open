const Part = ({values}) => {
    const {name, exercises, id} = values
    return (
        <p>{name}: {exercises}</p>
    )
}

export default Part
