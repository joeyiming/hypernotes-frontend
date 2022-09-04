import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/groups';
const pairUrl = 'http://localhost:3001/api/user_group';

const getAllGroups = () => {
  return axios.get(baseUrl);
}

const getGroupById = (id) => {
  return axios.get(baseUrl + `/${id}`);
}

const getPairs = () => {
  return axios.get(pairUrl);
}

const findMembers = (id, pairs) => {
  let members = [];
  for (const pair of pairs) {
    if (pair.groupId === id) {
      members.push({ 'id': pair.userId, 'type': pair.userType });
    }
  }
  return members;
}

export default { getAllGroups, getGroupById, getPairs, findMembers }