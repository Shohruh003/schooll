import axios from 'axios';
import close_Button from '../../Image/close-btn.svg';
import selectIcon from '../../Image/select-icon.svg';
import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import './AdminModal.css'
function AdminModal({ adminModal, setAdminModal }) {
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

            <Modal.Title className='modal_header' id="example-custom-modal-styling-title">
              Дети в состоянии агрессии
              <img onClick={() => setAdminModal(false)} src={close_Button} />
            </Modal.Title>
          </thead>
          <tbody className='modal_add'>

            <div className='input_box'>
              <label for="1" class="form-label">Имя</label>
              <input class="form-control" list="datalistOptions" id="1" placeholder="​​Алижон  " />
            </div>
            <div className='input_box'>
              <label for="2" class="form-label">Фамилия</label>
              <input class="form-control" list="datalistOptions" id="2" placeholder="Абдурасулов" />
            </div>
            <div className='input_box'>
              <label for="3" class="form-label">Класс</label>
              <input class="form-control" list="datalistOptions" id="3" placeholder="5 “Б”" />
            </div>
            <div className='input_box'>
              <label for="4" class="form-label">Возраст</label>
              <input class="form-control" list="datalistOptions" id="4" placeholder="12" />
            </div>
            <div className='vid-box'>
              <div className='video_box'>
                <label for="5" class="form-label">Видео:</label>
                <button>Доступ к камере</button>
              </div>
              <div className='video_box'>
                <label for="5" class="form-label">Статус:</label>
                <select>
                  <option>преподоатель<img src={selectIcon} /></option>
                  <option>Teacher</option>
                  <option>Person</option>
                </select>
              </div>
            </div>
            <div className='button_box'>

              <div className='d-flex align-items-center'>
              <label for="6" class="form-label" role="button">Добавить несколько</label>
              <input type="checkbox" list="datalistOptions" id="6"/>
              </div>
              <div className='button_box2'>
                <button className="btn1" onClick={() => setAdminModal(false)}>Отмена</button>
                <button className="btn2">Cохранить</button>
              </div>
            </div>

          </tbody>
        </table>
      </Modal.Body>
    </Modal>
  )
}

export default AdminModal;