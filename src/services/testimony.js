import axios from "axios"

export default {

    create:(testimony) => {
        return axios.post('testimony', testimony)
    },

    list:() => {
        return axios.get('testimony')
    },

    update:(id, testimony) => {
        return axios.put('testimony/' + id, testimony)
    },

    approve:(id) => {
        return axios.post('testimony/approve/' + id)
    },

    delete:(id) => {
        return axios.delete('testimony/' + id)
    }

}