import parse from 'html-react-parser';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Captcha(checkCaptcha, onCheck) {
  const [inputCaptcha, setInputCaptcha] = useState('');
  const [captchaText, setCaptchaText] = useState('');
  const [captchaSvg, setCaptchaSvg] = useState('');
  useEffect(() => {
    axios.get('http://localhost:3001/captcha').then(response => {
      let data = response.data;
      setCaptchaSvg(data[0]);
      setCaptchaText(data[1]);
    })
  }, [])
  const handleChange = ({ target }) => {
    let input = target.value;
    setInputCaptcha(input);
    if (input.toLowerCase() === captchaText.toLowerCase()) {
      console.log('check!');
      console.log(onCheck());
    }
  }

  return (
    <div className='captcha'>
      <div className='captcha-input'>
        <label htmlFor='captcha'>验证码</label>
        <input id="captcha" className='form-input' type="text" value={inputCaptcha} onChange={handleChange} />
      </div>
      <div className='captcha-img'>{captchaSvg ? parse(captchaSvg) : 'Loading'}</div>
    </div>
  )
}

export default Captcha