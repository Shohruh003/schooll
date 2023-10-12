import axios from 'axios';
import { useEffect, useState } from 'react';
import close_Button from '../../Image/close-btn.svg';

import { Modal } from 'react-bootstrap';
import './agressiyaPupil.css'
import { ThemeHooks } from '../../Hooks/ThemeHook';
function AgressiyaPupil ({agressiyaModal, setAgressiyaModal}) {
    const [setAgressiya] = useState()
    const {theme} = ThemeHooks()

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
        <Modal
         className='modal'
        show={agressiyaModal}
        onHide={() => setAgressiyaModal(false)}
        size="lg"
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
          <Modal.Title style={{color: theme}} className='modal_header' id="example-custom-modal-styling-title">
          Дети в состоянии агрессии
          <img className='close_button' onClick={() => setAgressiyaModal(false)} src={close_Button} />

          </Modal.Title>
        <Modal.Body>
        <table class="table table-striped">
  <thead>
    <tr>
      <th className='agressiyaModal_heading' scope="col">ученик</th>
      <th className='agressiyaModal_heading' scope="col">Фамилия и имя</th>
      <th className='agressiyaModal_heading' scope="col">класс</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><img src='djqb' width='30' height='30' alt='agressiyaImg'/></td>
      <td>Otto</td>
      <td>5-A</td>
    </tr>
  </tbody>
</table>
        </Modal.Body>
      </Modal>
    )
}

export default AgressiyaPupil;