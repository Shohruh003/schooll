import close_Button from '../../Image/close-btn.svg';
import selectIcon from '../../Image/select-icon.svg';
import eye from '../../Image/eye-svgrepo-com.svg';
import { useContext} from 'react';
import { Modal } from 'react-bootstrap';
import './createAdminModal.css'
import { AuthContext } from '../../context/PupilContext';
function CreateAdminModal({ adminModal, setAdminModal }) {
  const {theme} = useContext(AuthContext)
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
        <table class="table table-striped modal_update">
          <thead>

            <Modal.Title style={{color: theme}} className='modal_header' id="example-custom-modal-styling-title">
              Создать профиль
              <img onClick={() => setAdminModal(false)} src={close_Button} />
            </Modal.Title>
          </thead>
          <tbody className='modal_add'>

            <div className='input_box'>
              <label for="1" class="form-label">email</label>
              <input type="email" class="form-control" list="datalistOptions" id="1" placeholder="shohruhazimov0705@gmail.com " />
            </div>
            <div className='input_box'>
              <label for="2" class="form-label">Имя</label>
              <input class="form-control" list="datalistOptions" id="2" placeholder="Shohruh Azimov" />
            </div>
            <div className='input_box pass3'>
              <label for="pass3" class="form-label">Пароль</label>
              <input type="password" class="form-control" list="datalistOptions" id="pass3" placeholder="*********" />
              <img className="btnpass3" onClick={()=>  {const password1 = document.querySelector('#pass3'); return (password1.type == "password") ? password1.type = "text" : password1.type = "password"}} src={eye}/>
            </div>
            <div className='input_box'>
              <label for="4" class="form-label">Дата рождения</label>
              <input type="date" class="form-control" list="datalistOptions" id="4" />
            </div>
            <div className='input_box pass5'>
              <label for="pass5" class="form-label">Повторите пароль</label>
              <input type="password" class="form-control" list="datalistOptions" id="pass5" placeholder="*********" />
              <img src={eye} className="btnpass5" onClick={()=>  {  const password2 = document.querySelector('#pass5'); return(password2.type == "password") ? password2.type = "text" : password2.type = "password"}}/>
            </div>
            <div className='input_box'>
              <label for="7" class="form-label class-lable">Класс</label>
              <select id='7' className="classNum">
                <option>1<img src={selectIcon} /></option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
              <select className="class2">
                <option>"А"<img src={selectIcon} /></option>
                <option>"Б"</option>
                <option>"В"</option>
                <option>"Г"</option>
                <option>"Д"</option>
              </select>
            </div>
            <div className='input_box'>
              <label for="8" class="form-label">Родители ребёнка</label>
              <input type="password" class="form-control" list="datalistOptions" id="8" placeholder="Муминова Гульчехра" />
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
                <select>
                  <option>ученик<img src={selectIcon} /></option>
                  <option>психолог</option>
                  <option>родители</option>
                </select>
              </div>
              <div className='video_box'>
                <label for="5" class="form-label">Видео:</label>
                <button id="startButton2">Доступ к камере</button>
              </div>
            </div>
            <div className='button_box'>
              <div className='button_box2'>
                <button className="btn1" onClick={() => setAdminModal(false)}>Отмена</button>
                <button style={{backgroundColor: theme}} onClick={() => {const password1 = document.querySelector('#pass3'); const password2 = document.querySelector('#pass5'); return (password1.value !== password2.value) ? alert("Tasdiqlash paroli xato !"): ''}} className="btn2">Cохранить</button>
              </div>
            </div>
          </tbody>
        </table>
      </Modal.Body>
    </Modal>
  )
}

export default CreateAdminModal;