import axios from 'axios';
import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap'; 
import close_Button from '../../Image/close-btn.svg';

import './attendanceModal.css'
function MissingTeacher ({missingTeacher, setMissingTeacher}) {
    const [agressiya, setAgressiya] = useState()
    useEffect(() => {
        const apiUrl = 'https://jsonplaceholder.typicode.com/posts/1';
        axios.get(apiUrl)
          .then(response => {
            setAgressiya(response.data);
          })
          .catch(error => {
            console.log(error);
          });
      }, []);
    

    return (
        <div>
            <Modal
         className='modal'
        show={modal}
        onHide={() => setModal(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
          Текст сообщения
          <img className='close_button' onClick={() => setMo(false)} src={close_Button} />

          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
          Идейные соображения высшего порядка, а также понимание сути ресурсосберегающих технологий однозначно фиксирует необходимость направлений прогрессивного развития. Как уже неоднократно упомянуто, независимые государства могут быть рассмотрены исключительно в разрезе маркетинговых и финансовых предпосылок.
          </p>

          <p>Не следует, однако, забывать, что курс на социально-ориентированный национальный проект требует анализа своевременного выполнения сверхзадачи.</p>

          <p>А ещё активно развивающиеся страны третьего мира будут рассмотрены исключительно в разрезе маркетинговых и финансовых предпосылок. Сложно сказать, почему действия представителей оппозиции ограничены исключительно образом мышления. Современные технологии достигли такого уровня, что граница обучения кадров представляет собой интересный эксперимент проверки соответствующих условий активизации.</p>
        </Modal.Body>
      </Modal>
            <Modal
         className='modal'
        show={missingTeacher}
        onHide={() => setMissingTeacher(false)}
        size="lg"
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        {/* <Modal.Header> */}
          <Modal.Title className='modal_header' id="example-custom-modal-styling-title">
          Отсутствующие преподавателей
          <img className='close_button' onClick={() => setMissingTeacher(false)} src={close_Button} />

          </Modal.Title>
        {/* </Modal.Header> */}
        <Modal.Body>
        <table class="table table-striped">
  <thead>
    <tr>
      <th className='agressiyaModal_heading' scope="col">преподавателей</th>
      <th className='agressiyaModal_heading' scope="col">Фамилия и имя</th>
      <th className='agressiyaModal_heading' scope="col">класс</th>
      <th>Пришел</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><img src='djqb' width='30' height='30' alt='agressiyaImg'/></td>
      <td>Otto</td>
      <td>5-A</td>
      <td>09:34</td>
    </tr>
  </tbody>
</table>
        </Modal.Body>
      </Modal>

        </div>
    )
}

export default MissingTeacher;