
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

    axios.post('https://www.api.yomon-emas.uz/api/users/token/', formData)
    .then((data) => {
      if (data.data.access) {
        setToken(data.data.access);
        setDecode(jwt_decode(data.data.access).user_id)
        navigate('/');
      }
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
          <img className='login_img' src={LoginPageImg} alt="loginImg" width='700' height='600'/>
          <div className="login_content">
            <h3 className='login_heading'>СИСТЕМА АНАЛИЗА ПСИХОЭМОЦИОНАЛЬНОГО СОСТОЯНИЯ УЧАЩИХСЯ</h3>
            <p className='login_logoText'>Face IDS School</p>

            <form className="login_form" onSubmit={handleUserLogin}>
          <p className="login_text">Войдите в систему</p>

              <input className="login_input" type="email" name="email" placeholder="Email" />

            
              <input className="login_input" type="password" name="password" placeholder="Пароль" />
              <ToastContainer />
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