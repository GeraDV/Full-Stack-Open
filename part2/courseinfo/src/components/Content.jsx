import Part from "./Part"

const Content = ({parts}) => {
    return (
        <ul>
            {parts.map(p => {
                return (
                    <li key={p.id}>
                        <Part values={p}/>
                    </li>
                )
            })}
        </ul>
    )
}

export default Content
