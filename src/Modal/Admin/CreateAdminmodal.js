import close_Button from '../../Image/close-btn.svg';
import selectIcon from '../../Image/select-icon.svg';
import eye from '../../Image/eye-svgrepo-com.svg';
import { useContext} from 'react';
import { Modal } from 'react-bootstrap';
import './createAdminModal.css'
import { AuthContext } from '../../context/PupilContext';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

function CreateAdminModal({ adminModal, setAdminModal }) {
  const {theme} = useContext(AuthContext)
  const [createProfil, setCreateProfil] = useState()

    const CreateProfils = (evt) => {
      evt.preventDefault();
      const password1 = document.querySelector('#pass3');
      const password2 = document.querySelector('#pass5');  
     if (password1.value !== password2.value){
      alert("Tasdiqlash paroli xato !")
     }
    const [email, password, full_name,birth_date,gender,pupil_class, main_video] = evt.target.elements;
    const formData = new FormData();
    formData.append('email', email.value);
    formData.append('full_name', full_name.value);
    formData.append('birth_date', birth_date.value);
    formData.append('gender', gender.value);
    formData.append('pupil_class', pupil_class.value);
    formData.append('main_video', main_video.file[0]);
    formData.append('password', password.value);
    formData.append('password', password.value);

  //   useEffect(() => {
  //     axios.post('https://www.api.yomon-emas.uz/api/users/pupils/', formData)
  //       .then(response => {
  //           setCreateProfil(response.data);
  //           toast.success("Qo'shildi !", {
  //             className: 'custom-toast-warning',
  //           });
  //         })
  //         .catch(error => {
  //             console.log(error);
  //           });
  // }, []);
  console.log(email.value);
  console.log(full_name.value);
}


const changeOption = (evt) => {
  const evetValue = evt.target.value
  const elEmail = document.getElementById('1')
  const elPassword = document.getElementById('pass5')
  const elPassword3 = document.getElementById('pass3')
  const elClass = document.getElementById('7')
  const elClass1 = document.querySelector('.class2')
  const elParent = document.getElementById('8')

  if (evetValue === 'teacher') {
    elParent.disabled = true
    elEmail.disabled = false
    elPassword.disabled = false
    elPassword3.disabled = false
    elClass.disabled = false
    elClass1.disabled = false   
  } else
  if (evetValue === 'pupil') {
    elParent.disabled = false
    elEmail.disabled = true
    elPassword.disabled = true
    elPassword3.disabled = true
    elClass.disabled = false
    elClass1.disabled = false 
  } else 
  if (evetValue === 'psychologist') {
    elParent.disabled = true
    elEmail.disabled = false
    elPassword.disabled = false
    elPassword3.disabled = false
    elClass.disabled = true
    elClass1.disabled = true 
  } else
  if (evetValue === 'parent') {
    elParent.disabled = true
    elEmail.disabled = false
    elPassword.disabled = false
    elPassword3.disabled = false
    elClass.disabled = true
    elClass1.disabled = true 
  }
}


  return (
    <Modal
      className='modal'
      show={adminModal}
      onHide={() => setAdminModal(false)}
      size="lg"
      dialogClassName="modal-90w"
      aria-labelledby="example-custom-modal-styling-title"
    >

      <Modal.Body>
        <table className="table table-striped modal_update">
          <thead>

            <Modal.Title style={{color: theme}} className='modal_header' id="example-custom-modal-styling-title">
              Создать профиль
              <img className='closeBtn' onClick={() => setAdminModal(false)} src={close_Button} />
            </Modal.Title>
          </thead>
          <tbody className='modal_add'>

            <div className='input_box'>
            <ToastContainer />
              <label for="1" class="form-label">email</label>
              <input name='email' type="email" class="form-control email" list="datalistOptions" id="1" placeholder="shohruhazimov0705@gmail.com " />
            </div>
            <div className='input_box'>
              <label for="2" class="form-label">Имя</label>
              <input name='full_name' class="form-control" list="datalistOptions" id="2" placeholder="Shohruh Azimov" />
            </div>
            <div className='input_box pass3'>
              <label for="pass3" class="form-label">Пароль</label>
              <input name='password' type="password" class="form-control" list="datalistOptions" id="pass3" placeholder="*********" />
              <img className="btnpass3" onClick={()=>  {const password1 = document.querySelector('#pass3'); return (password1.type == "password") ? password1.type = "text" : password1.type = "password"}} src={eye}/>
            </div>
            <div className='input_box'>
              <label for="4" class="form-label">Дата рождения</label>
              <input name='birth_date' type="date" class="form-control" list="datalistOptions" id="4" />
            </div>
            <div className='input_box pass5'>
              <label for="pass5" class="form-label">Повторите пароль</label>
              <input type="password" class="form-control" list="datalistOptions" id="pass5" placeholder="*********" />
              <img src={eye} className="btnpass5" onClick={()=>  {  const password2 = document.querySelector('#pass5'); return(password2.type == "password") ? password2.type = "text" : password2.type = "password"}}/>
            </div>
            <div className='input_box'>
              <label for="7" class="form-label class-lable">Класс</label>
              <select name='pupil_class' id='7' className="classNum">
                <option value='1'>1<img src={selectIcon} /></option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
              </select>
              <select className="class2">
                <option value='A'>"А"<img src={selectIcon} /></option>
                <option value='B'>"B"</option>
                <option value='C'>"C"</option>
                <option value='D'>"D"</option>
                <option value='E'>"E"</option>
              </select>
            </div>
            <div className='input_box'>
              <label for="8" class="form-label">Родители ребёнка</label>
              <input type="text" class="form-control" list="datalistOptions" id="8" placeholder="Муминова Гульчехра" />
            </div>
            <div className='input_box2'>
              <label class="form-label">Укажите пол</label><br />
              <div className='d-flex align-items-center gap-2'>
                <input name='gender' value='true' className='radio' type="radio" id="boy" />
                <label for="boy">Мальчик</label>
              </div>
              <div className="d-flex align-items-center justify-content-between gap-2">
                <div className="d-flex align-items-center gap-2">
                  <input id='girl' name='gender' value='false' className='radio' type="radio" />
                  <label for="girl">Девочка</label>
                </div>
                <div className='d-flex align-items-center check gap-2'>
                  <label for="6" class="form-label" role="button">Добавить несколько</label>
                  <input type="checkbox" list="datalistOptions" id="6" />
                </div>
              </div>
            </div>
            <div className='vid-box'>
              <div className='video_box'>
                <label for="5" class="form-label">Статус:</label>
                <select name='status' onChange={changeOption}>
                <option value='pupil'>ученик<img src={selectIcon} /></option>
                  <option value='psychologist'>психолог</option>
                  <option value='parent'>родители</option>
                  <option value='teacher'>Преподавателя</option>
                </select>
              </div>
              <div name='video' className='video_box'>
                <label for="5" class="form-label">Видео:</label>
                <input name='main_video' type="file"  id="startButton2"/>
              </div>
            </div>
            <div className='button_box'>
              <div className='button_box2'>
                <button className="btn1" onClick={() => setAdminModal(false)}>Отмена</button>
                <button type="button" style={{backgroundColor: theme}} onClick={CreateProfils} className="btn2">Cохранить</button>
              </div>
            </div>
          </tbody>
        </table>
      </Modal.Body>
    </Modal>
  )
}

export default CreateAdminModal;