import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap'; 
import close_Button from '../../Image/close-btn.svg';
import './attendanceModal.css'
import { AuthContext } from '../../context/PupilContext';
function MissingTeacher ({missingTeacher, setMissingTeacher}) {
  const {theme} = useContext(AuthContext)

  // const [setAgressiya] = useState()

  //   useEffect(() => {
  //       const apiUrl = 'https://jsonplaceholder.typicode.com/posts/1';
  //       axios.get(apiUrl)
  //         .then(response => {
  //           setAgressiya(response.data);
  //         })
  //         .catch(error => {
  //           console.log(error);
  //         });
  //     }, []);
    

    return (
        <div>
            <Modal
         className='modal'
        show={missingTeacher}
        onHide={() => setMissingTeacher(false)}
        size="lg"
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
          <Modal.Title style={{color: theme}} className='modal_header' id="example-custom-modal-styling-title">
          Отсутствующие преподавателей
          <img className='close_button' onClick={() => setMissingTeacher(false)} src={close_Button} />

          </Modal.Title>
        <Modal.Body>
        <table class="table table-striped">
  <thead>
    <tr>
      <th className='agressiyaModal_heading' scope="col">преподавателей</th>
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
      <td>5-A</td>
    </tr>
  </tbody>
</table>
        </Modal.Body>
      </Modal>

        </div>
    )
}

export default MissingTeacher;