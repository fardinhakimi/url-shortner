
import axios from 'axios'
import store from './store'

export const REGISTER_USER_URL = `accounts/register`
export const LOGIN_USER_URL = `accounts/login`
export const LOGOUT_USER_URL = `accounts/logout`
export const REFRESH_TOKEN_URL = `accounts/refresh-token`
export const USERNAME_UNIQUE_URL = `accounts/username-unique`

const user = store.getters.user

const api = axios.create({
    baseURL: "http://127.0.0.1:8080/api/v1/",
    headers: {
        'Content-Type': 'application/json',
        'authorization': `JWT`
    }
})

export default {

    getResource(url) {
        return api.get(url)
    },

    patchResource(url, data) {
        return api({
            method: 'patch',
            url: url,
            data: JSON.stringify(data)
        })
    },

    postResource(url, body) {
        return api({
            method: 'post',
            url: url,
            data: JSON.stringify(body)
        })
    },

    deleteResource(url) {
        return axios({
            method: 'delete',
            url: url
        })
    }
}