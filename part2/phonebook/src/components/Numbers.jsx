import ContactLine from "./ContactLine";

const Numbers = ({numbers, handleDelete}) => {
    return (
        <div>
            <h2>Numbers</h2>
            <ul>
                {numbers && numbers.map(p => <ContactLine key={p.id} person={p} handleDelete={handleDelete}/>)}
            </ul>
        </div>
    )
}

export default Numbers;