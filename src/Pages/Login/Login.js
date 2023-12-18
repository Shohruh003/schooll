
import { useNavigate } from 'react-router-dom';
import LoginPageImg from '../../Image/loginImage.png'
import TadIndustries from '../../Image/tad-head-big.png'
import axios from 'axios';
import './login.css'
import { LoginHooks } from '../../Hooks/LoginHooks';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwt_decode from 'jwt-decode'
import { DecodeHooks } from '../../Hooks/DecodeHook';
import eye from '../../Image/eye-svgrepo-com.svg'

function Login() {
  const {setToken} = LoginHooks()
  const {setDecode} = DecodeHooks()
  const navigate = useNavigate();

  const handleUserLogin = (evt) => {
    evt.preventDefault();
    const [email, password] = evt.target.elements;
    const formData = new FormData();
    formData.append('email', email.value);
    formData.append('password', password.value);

    axios.post('https://smartsafeschoolback.tadi.uz/api/users/token/', formData)
    .then((response) => { 
      const intervalId = setInterval(async () => {
        try {
          const response1 = await axios.post('https://smartsafeschoolback.tadi.uz/api/users/token/refresh/', {
            'refresh': response.data.refresh
          });
            setToken(response1.data.access);
        } catch (error) {
          console.error(error);
          clearInterval(intervalId);
        }
      }, 14 * 60 * 1000);
      
      setTimeout(() => {
        clearInterval(intervalId);
        localStorage.clear()
        window.location.reload()
      }, 23 * 60 * 60 * 1000);
      setToken(response.data.access);
      setDecode(jwt_decode(response.data.access).user_id)
      navigate('/');
    })
    .catch((error) => {
      console.log(error);
      toast.error('Неверный логин/пароль !', {
        className: 'custom-toast-warning',
      });
    });
  };

  return(
    <div className="login">
      <div>
        <div className="login_inner">
          <img className='login_img' src={LoginPageImg} alt="loginimg" width='700' height='600'/>
          <div className="login_content">
            <h3 className='login_heading'>СИСТЕМА АНАЛИЗА ПСИХОЭМОЦИОНАЛЬНОГО СОСТОЯНИЯ УЧАЩИХСЯ</h3>
            <p className='login_logoText'>Face IDS School</p>

            <form className="login_form" onSubmit={handleUserLogin}>
            <p className="login_text">Войдите в систему</p>

              <input className="login_input" type="email" name="email" placeholder="Email" />

            
              <div className='password-box'>
                <input className="login_input password" type="password" name="password" placeholder="Пароль" />
                <ToastContainer />
                <img className="btnEye" onClick={() => { const password = document.querySelector('.password'); return (password.type === "password") ? password.type = "text" : password.type = "password" }} src={eye} alt='passwordImg' />
              </div>
            <button className="login_button" type="submit">Войти</button>
            </form>

            <img className='login_logo' src={TadIndustries} alt="Tad industries logo" width='103' height='171'/>
            <p className='login_logoName'>Tad Industries</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;