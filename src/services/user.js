import axios from "axios"

export default {

    create:(user) => {
        return axios.post('user', user)
    },

    list:() => {
        return axios.get('user')
    },

    getOne:(id) => {
        return axios.get('user/' + id)
    },

    update:(id, user) => {
        return axios.put('user/' + id, user)
    },

    delete:(id) => {
        return axios.delete('user/' + id)
    }

}