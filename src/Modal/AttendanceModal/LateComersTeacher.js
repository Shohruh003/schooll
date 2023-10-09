import axios from 'axios';
import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap'; 
import './attendanceModal.css'
function LateComersTeacher ({lateComersTeacher, setLateComersTeacher}) {
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
        show={lateComersTeacher}
        onHide={() => setLateComersTeacher(false)}
        size="lg"
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
          Опоздавшие преподавателей
          </Modal.Title>
        </Modal.Header>
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

export default LateComersTeacher;