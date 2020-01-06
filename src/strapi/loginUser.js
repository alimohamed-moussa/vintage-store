import axios from 'axios';
import url from '../utils/URL';

async function loginUser({email, password}) {

    const response = await axios.post(`${url}/auth/local`, {
       identifier: email, password
    }).catch(error => console.error(error));
    return response;
}


export default loginUser;
