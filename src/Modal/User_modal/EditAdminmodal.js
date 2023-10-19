import axios from 'axios';
import close_Button from '../../Image/close-btn.svg';
import selectIcon from '../../Image/select-icon.svg';
import eye from '../../Image/eye-svgrepo-com.svg';
import { useContext, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import './editAdminModal.css'
import { AuthContext } from '../../context/PupilContext';
import { useRef } from 'react';


function EditAdminModal({ editAdminModal, setEditAdminModal }) {
  const { theme, editUser, modal, setModal } = useContext(AuthContext)
  const [user, setUser] = useState()
  var imgref = useRef()

  // const [agressiya, setAgressiya] = useState()

  // useEffect(() => {
  //     const apiUrl = 'https://jsonplaceholder.typicode.com/posts/1';
  //     axios.get(apiUrl)
  //       .then(response => {
  //         setAgressiya(response.data);
  //       })
  //       .catch(error => {
  //         console.log(error);
  //       });
  //   }, []);

  // const password1 = document.querySelector('#pass3');
  // const password2 = document.querySelector('#pass5');

  const changeOption = (evt) => {
    setUser({
      ...user,
      status: evt.target.value
    })
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

  const hendlSend = (evt) => {

    evt.preventDefault()
    const password1 = document.querySelector('#pass3'); const password2 = document.querySelector('#pass5');
    if (password1.value !== password2.value) { return alert("Tasdiqlash paroli xato !") };

    console.log(user, 'user');
    console.log(imgref, 'imgref');
    const formData = new FormData()
    formData.append('main_video', imgref.current.files[0])
    formData.append('email', user?.email)
    formData.append('full_name', user?.full_name)
    formData.append('birth_date', user?.birth_date)
    formData.append('password', user?.password)
    formData.append('status', user?.status)
    formData.append('pupil_class', (user?.pupil_class+'-'+ user?.pupil_class_str))
    formData.append('parent', user?.parent)
    formData.append('gender', user?.gender)
    formData.append('shift', user?.shift)

    const apiUrl = 'http://localhost:5000/test';
    axios.put(apiUrl, formData)
      .then((response) => {
        console(response.data);
        setModal('')
      })
      .catch((error) => {
        console.log(error);
      });

      setEditAdminModal(false)
  }


  return (
    <Modal
      className='modal'
      show={editAdminModal}
      onHide={() => setEditAdminModal(false)}
      size="lg"
      dialogClassName="modal-90w"
      aria-labelledby="example-custom-modal-styling-title"
    >

      <Modal.Body>
        <form onSubmit={(e) => hendlSend(e)} className="table table-striped modal_update">
          <thead>

            <Modal.Title style={{ color: theme }} className='modal_header' id="example-custom-modal-styling-title">
              <div className='modalHeader'>
                Создать профиль
                <img className='close_btn' onClick={() => setEditAdminModal(false)} src={close_Button} />
              </div>
            </Modal.Title>
          </thead>
          <tbody className='modal_add'>
           
            <div className='input_box'>
              <label for="1" class="form-label">email</label>
              <input defaultValue={editUser?.email} disabled onChange={(event) => {
                setUser({
                  ...user,
                  email: event.target.value
                })
              }} type="email" class="form-control" list="datalistOptions" id="1" placeholder="shohruhazimov0705@gmail.com " />
            </div>
            <div className='input_box'>
              <label for="2" class="form-label">Имя</label>
              <input defaultValue={editUser?.full_name} onChange={(event) => {
                setUser({
                  ...user,
                  full_name: event.target.value
                })
              }} class="form-control" list="datalistOptions" id="2" placeholder="Shohruh Azimov" />
            </div>
            <div className='input_box pass3'>
              <label for="pass3" class="form-label">Пароль</label>
              <input  defaultValue={editUser?.password} disabled onChange={(event) => {
                setUser({
                  ...user,
                  password: event.target.value
                })
              }} type="password" class="form-control" list="datalistOptions" id="pass3" placeholder="*********" />
              <img className="btnpass3" onClick={() => { const password1 = document.querySelector('#pass3'); return (password1.type == "password") ? password1.type = "text" : password1.type = "password" }} src={eye} />
            </div>
            <div className='input_box'>
              <label for="4" class="form-label">Дата рождения</label>
              <input  defaultValue={editUser?.birth_date} onChange={(event) => {
                setUser({
                  ...user,
                  birth_date: event.target.value
                })
              }} type="date" class="form-control" list="datalistOptions" id="4" />
            </div>
            <div className='input_box pass5'>
              <label for="pass5" class="form-label">Повторите пароль</label>
              <input    defaultValue={editUser?.password} disabled type="password" class="form-control" list="datalistOptions" id="pass5" placeholder="*********" />
              <img src={eye} className="btnpass5" onClick={() => { const password2 = document.querySelector('#pass5'); return (password2.type == "password") ? password2.type = "text" : password2.type = "password" }} />
            </div>
            <div className='input_box'>
              <label for="7" class="form-label class-lable">Класс</label>
              <select  defaultValue={editUser?.pupil_class ? editUser?.pupil_class.slice(0, 1):''} onChange={(event) => {
                setUser({
                  ...user,
                  pupil_class: event.target.value
                })
              }} id='7' className="classNum">
                <option value='1'>1<img src={selectIcon} /></option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
              </select>
              <select onChange={(event) => {
                setUser({
                  ...user,
                  pupil_class_str: event.target.value
                })
              }} defaultValue={editUser?.pupil_class ? editUser?.pupil_class.slice(2, 3).toUpperCase(): ''} className="class2">
                <option value='A'>"А"<img src={selectIcon} /></option>
                <option value='B'>"B"</option>
                <option value='C'>"C"</option>
                <option value='D'>"D"</option>
                <option value='E'>"E"</option>
              </select>
            </div>
            <div className='input_box'>
              <label for="8" class="form-label">Родители ребёнка</label>
              <input  defaultValue={editUser?.parent} onChange={(event) => {
                setUser({
                  ...user,
                  parent: event.target.value
                })
              }} type="text" class="form-control" list="datalistOptions" id="8" placeholder="Муминова Гульчехра" />
            </div>
            <div className='input_box2'>
              <div className='box2_item'>
                <label class="form-label">Укажите пол</label><br />
                <div className='d-flex align-items-center gap-2'>
                  <input checked={editUser?.gender ?  true : false}   onClick={(e)=> {e.target.checked ? e.target.name = false : e.target.checked = true}} onChange={(event) => {
                    setUser({
                      ...user,
                      gender: event.target.value
                    })
                  }} name='gender' value='true' className='radio' type="radio" id="boy" />
                  <label for="boy">Мальчик</label>
                </div>
                <div className="d-flex align-items-center justify-content-between gap-2">
                  <div className="d-flex align-items-center gap-2">
                    <input  checked={editUser?.gender? false : true}  id='girl'   defaultValue={editUser?.gender} onClick={(e)=> {e.target.checked ? e.target.checked = false : e.target.checked = true}} onChange={(event) => {
                      setUser({
                        ...user,
                        gender: event.target.value
                      })
                    }} name='gender' value='false' className='radio' type="radio" />
                    <label for="girl">Девочка</label>
                  </div>
                </div>
              </div>
              <div className='box2_item'>
                <label class="form-label">Укажите смену</label><br />
                <div className='d-flex align-items-center gap-2'>
                  <input  checked={editUser?.is_morning ? true: false} onChange={(event) => {
                    setUser({
                      ...user,
                      shift: event.target.value
                    })
                  }} name='shift' value='true' className='radio' type="radio" id="first" />
                  <label for="first">Первая</label>
                </div>
                <div className="d-flex align-items-center justify-content-between gap-2">
                  <div className="d-flex align-items-center gap-2">
                    <input  checked={editUser?.is_morning? false : true} id='second' onChange={(event) => {
                      setUser({
                        ...user,
                        shift: event.target.value
                      })
                    }} name='shift' value='false' className='radio' type="radio" />
                    <label for="second">Вторая</label>
                  </div>
                </div>
              </div>
            </div>
            <div className='vid-box'>
              <div className='video_box'>
                <label for="5" class="form-label">Статус:</label>
                <select onChange={changeOption}>
                  <option value='pupil'>ученик<img src={selectIcon} /></option>
                  <option value='psychologist'>психолог</option>
                  <option value='teacher'>учитель</option>
                  <option value='parent'>родители</option>
                </select>
              </div>
              <div className='video_box '>
                <label for="5" class="form-label">Видео:</label>
                <input  ref={imgref} type="file" id="startButton2" />
              </div>
            </div>
            <div className='button_box'>
              <div className='button_box2'>
                <button className="btn1" type='button' onClick={() => setEditAdminModal(false)}>Отмена</button>
                <button style={{ backgroundColor: theme }} type="submit" className="btn2">Cохранить</button>
              </div>
            </div>
            
          </tbody>
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default EditAdminModal;