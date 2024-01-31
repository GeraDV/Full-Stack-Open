const ContactLine = ({person, handleDelete}) => {
    const handleClick = () => {
        handleDelete(person.id);
    }
    return (
        <li className='person'>{person.name}: {person.number}  <button onClick={handleClick}>delete</button></li>
    )
}

export default ContactLine;
