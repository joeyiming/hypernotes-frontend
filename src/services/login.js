import { findUserByName } from './utils';
import axios from 'axios';
const baseUrl = 'http://localhost:3001/users';

const getAllUsers = () => {
  return axios.get(baseUrl);
}

const createUser = (newUser) => {
  axios.post(baseUrl + '/users', newUser);
}


export default { getAllUsers: getAllUsers, createUser: createUser }