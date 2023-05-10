import axios from 'axios';

const request =(option) => {
    option.url = 'https://social-network-server-production.up.railway.app/api/' + option.url
    return axios(option)
   .then(response => {
        return response.data
    })
}
export { request }