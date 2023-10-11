import axios from 'axios';
import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap'; 
import close_Button from '../../Image/close-btn.svg';

import './attendanceModal.css'
function MissingPupil ({missingPupil, setMissingPupil}) {
    const [setAgressiya] = useState()
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
        show={missingPupil}
        onHide={() => setMissingPupil(false)}
        size="lg"
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
          <Modal.Title className='modal_header' id="example-custom-modal-styling-title">
          Отсутствующие ученик
          <img className='close_button' onClick={() => setMissingPupil(false)} src={close_Button} />

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

    <tr>
      <td><img src='djqb' width='30' height='30' alt='agressiyaImg'/></td>
      <td>Shohruh Azimov</td>
      <td>4-B</td>
    </tr>

    <tr>
      <td><img src='djqb' width='30' height='30' alt='agressiyaImg'/></td>
      <td>Azizbek Normatov</td>
      <td>5-A</td>
    </tr>
  </tbody>
</table>
        </Modal.Body>
      </Modal>

        </div>
    )
}

export default MissingPupil;