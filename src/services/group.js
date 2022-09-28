import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/groups';
const pairUrl = 'http://localhost:3001/api/user_group';
const userUrl = 'http://localhost:3001/api/users';

const getAllGroups = () => {
  return axios.get(baseUrl);
}

const getGroupsByUser = (userId) => {
  return axios.get(userUrl + `/${userId}/groups`);
}

const getGroupById = (id) => {
  return axios.get(baseUrl + `/${id}`);
}

const updateGroup = (id, content) => {
  return axios.put(baseUrl + `/${id}`, content);
}

const getPairs = () => {
  return axios.get(pairUrl);
}

const exitGroup = (groupId, userId) => {
  return axios.delete(baseUrl + `/${groupId}/members/${userId}`);
}

// 获取成员列表
const getMembersByGroupId = (id) => {
  return axios.get(baseUrl + `/${id}/members`);
}

// 加入新成员
// /api/groups/:id/members/:user/:type
const addMemberToGroup = (groupId, userId, userType) => {
  return axios.post(baseUrl + `/${groupId}/members/${userId}/${userType}`)
}

// 搜索小组
const searchGroups = (value) => {
  return axios.get(baseUrl + `?value=${value}`);
}

// 创建小组
const createNewGroup = (newGroup) => {
  return axios.post(baseUrl, newGroup)
}

export default { getAllGroups, getGroupById, getPairs, createNewGroup, exitGroup, getMembersByGroupId, addMemberToGroup, searchGroups, getGroupsByUser, updateGroup }