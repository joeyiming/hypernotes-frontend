import axios from 'axios';
const baseUrl = 'http://localhost:3001/users';

const getAllUsers = () => {
  return axios.get(baseUrl);
}

const createUser = (newUser) => {
  axios.post(baseUrl + '/users', newUser);
}

const findUserByName = (username, users) => {
  let result = users.filter(user => user.username === username);
  return result.length === 1 ? result[0] : null;
}


export default { getAllUsers: getAllUsers, createUser: createUser, findUserByName: findUserByName }