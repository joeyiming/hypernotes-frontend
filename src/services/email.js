import axios from 'axios';
const baseUrl = 'http://localhost:3001/send';

const sendVerifyEmail = (receiver) => {
  return axios.post(baseUrl, receiver);
}

export default { sendVerifyEmail }