import axios from 'axios';
axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

export async function get_request(url) {
    try {
        const response = await axios.get(url);
        console.log(response.data);       
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export async function post_request(url) {    
    try {        
        const response = await axios.post(url);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}
