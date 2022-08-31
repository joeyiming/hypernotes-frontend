import { findUserByName } from './utils';
import axios from 'axios'
const baseUrl = 'http://localhost:3001'

const login = props => {
  axios.get(baseUrl + '/users').then(response => {
    let users = response.data;
    let user = findUserByName(props.username, users);
    if (user === null){
      props.setError('用户名不存在');
      return;
    }
    if (user.password !== props.password){
      props.setError('密码错误');
      return;
    }
    props.setUser(user);
  });
}

export default { login }