import close_Button from '../../Image/close-btn.svg';
import selectIcon from '../../Image/select-icon.svg';
import eye from '../../Image/eye-svgrepo-com.svg';
import { useContext, useState } from 'react';
import { Modal } from 'react-bootstrap';
import './editAdminModal.css'
import { AuthContext } from '../../context/PupilContext';
import { useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import api from '../../components/Api/api';


function EditAdminModal({ editAdminModal, setEditAdminModal }) {
  const { theme, editUser } = useContext(AuthContext)
  const [user, setUser] = useState()
  const [parent, setParent] = useState()
  const [orginalParent, setOrginalParent] = useState()


  var imgref = useRef()

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
          if (evetValue === 'parents') {
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
    const formData = new FormData()
    formData.append('main_image', imgref.current.files[0] ? imgref.current.files[0] : editUser?.main_image)
    formData.append('email', user?.email ? user?.email : editUser?.email)
    formData.append('full_name', user?.full_name ? user?.full_name : editUser?.full_name)
    formData.append('birth_date', user?.birth_date ? user?.birth_date : editUser?.birth_date)
    formData.append('password', user?.password ? user?.password : editUser?.password)
    formData.append('confirm_password', user?.password ? user?.password : editUser?.password)
    formData.append('status', user?.status ? user?.status : 'pupil')
    formData.append('pupil_class', (user?.pupil_class ? user?.pupil_class : editUser?.pupil_class[0]?.slice(0, 1)) +'-'+ (user?.pupil_class_str?user?.pupil_class_str: editUser?.pupil_class[0]?.slice(2, 3)?.toUpperCase()))    
    formData.append('parents', user?.parent ? user?.parent : editUser?.parent)
    formData.append('gender', user?.gender ? user?.gender : editUser?.gender)
    formData.append('is_morning', user?.shift ? user?.shift : editUser?.is_morning)
    if (user?.status === 'pupil') {
      const apiUrl = `/users/pupils/${editUser?.id}/`;
      formData.delete('password')
      formData.delete('main_image')
      formData.delete('email')
      formData.delete('status')

      api.patch(apiUrl, formData)
        .then((response) => {
          console.log(response.data);
          toast.success("Ma'lumot yangilandi!");
          setEditAdminModal(false)
        })
        .catch((error) => {
          console.log('Error sending data:', error?.response?.data);
          toast.error("Xatolik sodir bo'ldida !");
          
        });
      } else if (user?.status === 'teacher') {
      console.log(user,'----------------')

        const apiUrl = `/users/users/${editUser?.id}/update_user/`;
        formData.delete('parent')
        formData.delete('is_morning')
        formData.delete('main_image')
        api.patch(apiUrl, formData)
        .then((response) => {
          console.log(response.data);
          toast.success("Ma'lumot yangilandi !");
          setEditAdminModal(false)
        })
        .catch((error) => {
          console.log('Error sending data:', error);
          toast.error("Xatolik sodir bo'ldi !");
        });
    }else if (user?.status === 'psychologist') {
      console.log(user,'----------------')

        const apiUrl = `/users/users/${editUser?.id}/update_user/`;
        formData.delete('parent')
        formData.delete('is_morning')
        formData.delete('main_image')
        formData.delete('pupil_class')
        api.patch(apiUrl, formData)
        .then((response) => {
          console.log(response.data);
          toast.success("Ma'lumot yangilandi !");
          setEditAdminModal(false)
        })
        .catch((error) => {
          console.log('Error sending data:', error);
          toast.error("Xatolik sodir bo'ldi !");
        });
    } else if (user?.status === 'parents') {
      console.log(user,'----------------')

        const apiUrl = `/users/users/${editUser?.id}/update_user/`;
        formData.delete('parent')
        formData.delete('is_morning')
        formData.delete('main_image')
        formData.delete('pupil_class')
        api.patch(apiUrl, formData)
        .then((response) => {
          console.log(response.data);
          toast.success("Ma'lumot yangilandi !");
          setEditAdminModal(false)
        })
        .catch((error) => {
          console.log('Error sending data:', error);
          toast.error("Xatolik sodir bo'ldi !");
        });
    } 
      
  }


  const hendlParent = async (evt) => {
    var parentList = document.getElementById('parentList')
    parentList.style.display = 'block'

    await api.get('/users/users/?status=parents')
      .then((response) => {
        setParent(response?.data?.results);
        setOrginalParent(response?.data?.results);
      })
      .catch((error) => {
        console.log('Error sending data:', error);
      });
    console.log(parent);

    const searchTerm = evt;
    const filteredUsers = orginalParent?.filter((item) =>
      item?.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setParent(searchTerm === '' ? orginalParent : filteredUsers);
  }

  const hendlItem = (evt) => {
    const input = document.getElementById('8')
    const value2 = evt
    input.value = value2
    var parentList = document.getElementById('parentList')
    parentList.style.display = 'none'
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
          <thead><Modal.Title style={{ color: theme }} className='modal_header' id="example-custom-modal-styling-title">
              <div className='modalHeader'>
              <img className='editUserImg' style={{objectFit: "cover"}} src={editUser?.main_image} width="100" height="50" alt='editUser'/>
              Изменить профиль
                <img className='close_btn' onClick={() => setEditAdminModal(false)} src={close_Button} />
              </div>
            </Modal.Title>
          </thead>
          <tbody className='modal_add'>
          
            <div className='input_box'>
              <label for="1" class="form-label">Email</label>
              <input defaultValue={editUser?.email} disabled onChange={(event) => {
                setUser({
                  ...user,
                  email: event.target.value
                })
              }} type="email" class="form-control" list="datalistOptions" id="1" placeholder="example@gmail.com" />
            </div>
            <div className='input_box'>
              <label for="2" class="form-label">ФИО</label>
              <input defaultValue={editUser?.full_name} onChange={(event) => {
                setUser({
                  ...user,
                  full_name: event.target.value
                })
              }} class="form-control" list="datalistOptions" id="2" placeholder="Введите ФИО" />
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
              <select  defaultValue={editUser?.pupil_class ? editUser?.pupil_class[0]?.slice(0, 1):''} onChange={(event) => {
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
                <option value='6'>6</option>
                <option value='7'>7</option>
                <option value='8'>8</option>
                <option value='9'>9</option>
                <option value='10'>10</option>
                <option value='11'>11</option>
              </select>
              <select onChange={(event) => {
                setUser({
                  ...user,
                  pupil_class_str: event.target.value
                })
              }} defaultValue={editUser?.pupil_class ? editUser?.pupil_class[0]?.slice(2, 3)?.toUpperCase(): ''} className="class2">
                <option defaultValue='А'>"А"<img src={selectIcon} /></option>
                <option value='Б'>"Б"</option>
                <option value='В'>"В"</option>
                <option value='Г'>"Г"</option>
                <option value='Д'>"Д"</option>
                <option value='Е'>"Е"</option>
              </select>
            </div>
            <div className='input_box'>
              <label for="8" class="form-label">Родители ребёнка</label>
              <input defaultValue={editUser?.parents} onChange={(event) => {
                hendlParent(event.target.value);

              }} type="text" class="form-control parentInput" list="datalistOptions" id="8" placeholder="Введите ФИО родителя" />
              <table class="table table-hover" id='parentList'>
                <tbody>
                  {parent?.map((item) => (
                    <tr onClick={() => {hendlItem(item.full_name);                setUser({
                      ...user,
                      parent: item?.id
                    })}}>{item.full_name}</tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className='input_box2'>
              <div className='box2_item'>
                <label class="form-label">Укажите пол</label><br />
                <div className='d-flex align-items-center gap-2'>
                  <input
                  onChange={(event) => {
                    setUser({
                      ...user,
                      gender: Boolean(event.target.value)
                    })
                  }} name='gender' value='true' className='radio' type="radio" id="boy" />
                  <label for="boy">Мальчик</label>
                </div>
                <div className="d-flex align-items-center justify-content-between gap-2">
                  <div className="d-flex align-items-center gap-2">
                    <input  
                    id='girl'
                     onChange={(event) => {
                      setUser({
                        ...user,
                        gender: Boolean(event.target.value)
                      })
                    }} name='gender' value='false' className='radio' type="radio" />
                    <label for="girl">Девочка</label>
                  </div>
                </div>
              </div>
              <div className='box2_item'>
                <label class="form-label">Укажите смену</label><br />
                <div className='d-flex align-items-center gap-2'>
                  <input
                   onChange={(event) => {
                    setUser({
                      ...user,
                      shift: Boolean(event.target.value)
                    })
                  }} name='shift' value='true' className='radio' type="radio" id="first" />
                  <label for="first">Первая</label>
                </div>
                <div className="d-flex align-items-center justify-content-between gap-2">
                  <div className="d-flex align-items-center gap-2">
                    <input
                    id='second' onChange={(event) => {
                      setUser({
                        ...user,
                        shift: Boolean(event.target.value)
                      })
                    }} name='shift' value='false' className='radio' type="radio" />
                    <label for="second">Вторая</label>
                  </div>
                </div>
              </div>
            </div>
            <div className='vid-box'>
              <div className='video_box'>
                <label for="5" class="form-label">Роль:</label>
                <select onChange={changeOption}>
                  <option disabled selected hidden>Роль:</option>
                  <option value='pupil'>ученик</option>
                  <option value='psychologist'>психолог</option>
                  <option value='teacher'>учитель</option>
                  <option value='parents'>родители</option>
                </select>
              </div>
              <div className='video_box '>
                <label for="5" class="form-label">Фото:</label>
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
<ToastContainer />
      </Modal.Body>
    </Modal>

  )
}

export default EditAdminModal;