import axios from 'axios'
import router from '../router'

axios.defaults.baseURL = 'http://localhost:8080/api/'
axios.interceptors.request.use((config) => {

    const authorization = localStorage.getItem('Authorization')
    const refreshToken = localStorage.getItem('refreshToken')

    config.headers.Authorization = authorization
    config.headers.refreshToken = refreshToken

    return config
})
axios.interceptors.response.use(
    (response) => {
        return response
    },
    async (error) => {
        if (error.response.status === 401) {

            axios.defaults.headers.common['Authorization'] = localStorage.Authorization
            axios.defaults.headers.common['refreshToken'] = localStorage.refreshToken

            try {
                const authorization = await axios.post('refreshToken', {
                    headers: {
                        'refreshToken': localStorage.refreshToken
                    }
                })

                axios.defaults.headers.common['Authorization'] = 'Bearer ' + authorization.data.accessToken
                axios.defaults.headers.common['refreshToken'] = authorization.data.refreshToken
                localStorage.setItem('Authorization', 'Bearer ' + authorization.data.accessToken)
                localStorage.setItem('refreshToken', authorization.data.refreshToken)
                router.push('/')
            } catch (error) {
                console.log("An error has occurred: " + error);
                router.push('/login')
            }

        }
        return Promise.reject(error)
    }
)