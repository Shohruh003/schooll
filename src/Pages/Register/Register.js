
import { Link, useNavigate } from 'react-router-dom';
import TadIndustries from '../../Image/tad-big.png'
import axios from 'axios';
import './register.css'


function Register() {
  const {token, setToken} = LoginHooks()
  const navigate = useNavigate();


  const handleUserRegister = (evt) => {
    evt.preventDefault();
    const [fullName, email, password,confirm_password] = evt.target.elements;
    const formData = new FormData();
    formData.append('fullName', fullName.value);
    formData.append('email', email.value);
    formData.append('password', password.value);
    formData.append('confirm_password', confirm_password.value);

    api.post('https://www.api.yomon-emas.uz/api/users/token/', formData)
    .then((data) => {
      if (data) {
        setToken(data);
        navigate('/');
      }
    })
    .catch((error) => console.log(error));
  };

  return(
    <div className="register">

        <div className="register_inner">
          <img className='register_img' src={TadIndustries} alt="registerImg" width='700' height='600'/>
          <div className="register_content">
            <h3 className='register_heading'>СИСТЕМА АНАЛИЗА ПСИХОЭМОЦИОНАЛЬНОГО СОСТОЯНИЯ УЧАЩИХСЯ</h3>
            <p className='register_logoText'>Face IDS School</p>

            <form className="register_form" onSubmit={handleUserRegister}>
          <p className="register_text">Регистрация</p>
              <input className="register_input" type="text" name="name" placeholder="Имя и фамилия" />

              <input className="register_input" type="email" name="email" placeholder="Email" />

              <input className="register_input" type="password" name="password" placeholder="Пароль" />
              <input className="register_input" type="password" name="confirmPassword" placeholder="Повторите пароль" />

            <button className="register_button" type="submit">Войти</button>
          </form>

          <Link className='register_link'>У меня есть аккаунт</Link>
          </div>
        </div>

    </div>
  )
}

export default Register;