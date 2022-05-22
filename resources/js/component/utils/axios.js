import axios from 'axios';

export const BASE_URL = 'http://localhost:8000';



axios.defaults.baseURL = BASE_URL
axios.defaults.withCredentials = true

const callApi = async (url, method , body = null) => {
    try {
        const res = await axios({
            url: url,
            method: method,
            data: body
        })
        return res.data
    } catch (e) {
        console.log(e.response)
    }
}


export default callApi;
