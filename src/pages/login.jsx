import React, { useEffect } from 'react'
import YouTubeIcon from '@mui/icons-material/YouTube';
import GoogleIcon from '@mui/icons-material/Google';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions/auth.action';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector(state => state?.auth?.accessToken);

  const handleClick = () => {
    dispatch(login());
  }
  const navigate = useNavigate();
  useEffect(() => {
    if (accessToken) {
      navigate('/');
    }
  },[accessToken,navigate])

  return (
    <section className='login-section'>
      <div className="container h-100">
        <div className="login-wrapper">
          <div className="inner-wrapper">
            <h4>Welcome Back To</h4>
            <div className="l-title">
              <YouTubeIcon style={{ color: '#f00', fontSize: 40 }} />
              <h6>YouTube</h6>
            </div>
            <div className="login-with-google">
              <div className='inner-login-wrapper' onClick={handleClick}>
                <GoogleIcon />
                <p>Login With Google</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login;
