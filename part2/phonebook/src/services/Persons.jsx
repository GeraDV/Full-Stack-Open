import axios from "axios";

const baseURL = 'http://localhost:3001/persons'

const getAll = () => {
    return axios
            .get(baseURL)
            .then(res => res.data)
}

const create = (newPerson) => {
    return axios
            .post(baseURL, newPerson)
            .then(res => res.data)
}

const remove = (idPerson) => {
    return axios.delete(`${baseURL}/${idPerson}`)
}

const update = (newPerson) => {
    return axios
        .put(`${baseURL}/${newPerson.id}`, newPerson)
        .then(res => res.data)
}

export default {getAll, create, remove, update};