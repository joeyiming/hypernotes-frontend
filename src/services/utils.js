import axios from "axios";
const baseUrl = 'http://localhost:3001'

function findUserByName(username, users) {
  let result = users.filter(user => user.username === username);
  return result.length === 1 ? result[0] : null;
}

export { findUserByName }