
import axios from 'axios'
import store from './store'

export const LOGIN_USER_URL      = `auth/login`
export const REGISTER_USER_URL   = `account/register`
export const LOGOUT_USER_URL     = `account/logout`
export const REFRESH_TOKEN_URL   = `account/refresh-token`
export const USERNAME_UNIQUE_URL = `account/username-unique`

const user = store.getters.user

const api = axios.create({
    baseURL: "http://127.0.0.1:8080/",
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