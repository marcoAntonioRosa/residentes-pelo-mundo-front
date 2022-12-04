import axios from "axios"

export default {

    create:(company) => {
        return axios.post('company', company)
    },

    list:() => {
        return axios.get('company')
    },

    listBasic:() => {
        return axios.get('company/findAllBasic')
    },

    update:(id, company) => {
        return axios.put('company/' + id, company)
    },

    delete:(id) => {
        return axios.delete('company/' + id)
    }

}