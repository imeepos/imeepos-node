import axios from 'axios'
import { message as antdMessage } from 'antd'
export function get(url: string, params?: any) {
    return axios.get(url, { params }).then(res => res.data).then((res) => {
        const { success, message, data } = res;
        if (success) {
            return data;
        } else {
            antdMessage.error(message)
        }
    }).catch(e => {
        antdMessage.error(e.message)
    })
}

export function post(url: string, body?: any) {
    return axios.post(url, body).then(res => res.data).then((res) => {
        const { success, message, data } = res;
        if (success) {
            return data;
        } else {
            antdMessage.error(message)
        }
    }).catch(e => {
        antdMessage.error(e.message)
    })
}