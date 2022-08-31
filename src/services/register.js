import axios from 'axios';
import { findUserByName } from './utils';
const baseUrl = 'http://localhost:3001'

const register = props => {
  axios.get(baseUrl + '/users').then(response => {
    let users = response.data;
    if (findUserByName(props.username, users)) {
      props.setError('用户名已被占用');
      return;
    }
    const newUser = {
      username: props.username,
      password: props.password,
      email: '',
      groups: '',
      display_name: ''
    };
    axios.post(baseUrl + '/users', newUser).then(resposne => {
      props.setUser(newUser);
    })
  });
}

export default { register }