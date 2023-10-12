import axios from 'axios';
import { useEffect, useState } from 'react';
import close_Button from '../../Image/close-btn.svg';
import { Modal } from 'react-bootstrap'; 
import './depressiyaPupil.css'
import { ThemeHooks } from '../../Hooks/ThemeHook';
function DepressiyaPupil ({depressiyaModal, setDepressiyaModal}) {
    const [setDepressiya] = useState()
    const {theme} = ThemeHooks()

    useEffect(() => {
        const apiUrl = 'https://jsonplaceholder.typicode.com/posts/1';
        axios.get(apiUrl)
          .then(response => {
            setDepressiya(response.data);
          })
          .catch(error => {
            console.log(error);
          });
      }, []);
    return (
        <Modal
         className='modal custom-modal'
        show={depressiyaModal}
        onHide={() => setDepressiyaModal(false)}
        size="lg"
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
          <Modal.Title style={{color: theme}} className='modal_header' id="example-custom-modal-styling-title">
          Дети в состоянии депрессии
          <img className='close_button' onClick={() => setDepressiyaModal(false)} src={close_Button} />

          </Modal.Title>
        <Modal.Body>
        <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">ученик</th>
      <th scope="col">Фамилия и имя</th>
      <th scope="col">класс</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><img src='djqb' width='30' height='30' alt='agressiyaImg'/></td>
      <td>Otto</td>
      <td>5-A</td>
    </tr>
    <tr>
      <td>img</td>
      <td>Thornton</td>
      <td>2-B</td>
    </tr>
    <tr>
      <td>img</td>
      <td>the Bird</td>
      <td>4-A</td>
    </tr>
  </tbody>
</table>
        </Modal.Body>
      </Modal>
    )
}

export default DepressiyaPupil;