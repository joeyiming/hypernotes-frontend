import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/users';

const getAllUsers = () => {
  return axios.get(baseUrl);
}

const createUser = (newUser) => {
  return axios.post(baseUrl, newUser);
}

const updateUser = (id,content) => {
  return axios.put(baseUrl+`/${id}`, content);
}

const findUserByName = (username, users) => {
  let result = users.filter(user => user.name === username);
  return result.length === 1 ? result[0] : null;
}


export default { getAllUsers: getAllUsers, createUser: createUser, findUserByName: findUserByName, updateUser:updateUser }