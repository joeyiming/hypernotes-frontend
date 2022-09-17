import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/groups';
const pairUrl = 'http://localhost:3001/api/user_group';
const userUrl = 'http://localhost:3001/api/users';

const getAllGroups = () => {
  return axios.get(baseUrl);
}

const getGroupsByUser = (userId)=>{
  return axios.get(userUrl+`/${userId}/groups`);
}

const getGroupById = (id) => {
  return axios.get(baseUrl + `/${id}`);
}

const getPairs = () => {
  return axios.get(pairUrl);
}

const exitGroup = (userId, groupId) => {
  return axios.delete(pairUrl + `/${userId}/${groupId}`);
}

// 获取成员列表
const getMembersByGroupId = (id) => {
  return axios.get(baseUrl + `/${id}/members`);
}

// 加入新成员
// /api/groups/:id/members/:user
const addMemberToGroup = (groupId, userId) => {
  return axios.post(baseUrl + `/${groupId}/members/${userId}`)
}

// 搜索小组
const searchGroups = (value) => {
  return axios.get(baseUrl + `?value=${value}`);
}

const findMembers = (id, pairs) => {
  let members = [];
  for (const pair of pairs) {
    if (pair.groupId === id) {
      members.push({ 'id': pair.userId, 'type': pair.userType });
    }
  }
  console.log('m:',members);
  return members;
}

export default { getAllGroups, getGroupById, getPairs, findMembers, exitGroup, getMembersByGroupId, addMemberToGroup,searchGroups,getGroupsByUser }