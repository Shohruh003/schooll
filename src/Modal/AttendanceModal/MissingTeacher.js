import axios from 'axios';
import { useContext, useEffect } from 'react';
import { Modal } from 'react-bootstrap'; 
import close_Button from '../../Image/close-btn.svg';
import './attendanceModal.css'
import { AuthContext } from '../../context/PupilContext';
import usersLogo from '../../Image/photo_people.jpg'

import api from '../../components/Api/api';

function MissingTeacher ({missingTeacher, setMissingTeacher}) {
  const {theme,missingTeachers, setMissingTeachers} = useContext(AuthContext)
  




  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await api.get('/users/users/?status=teacher');
        const teachers = response.data.results.filter((teacher) => teacher.is_absent === true);
            setMissingTeachers(teachers);

      } catch (error) {
        console.error(error);
      }
    };
  
    fetchTeachers();
  }, []);

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
          Отсутствующие преподаватели
          <img className='close_button' onClick={() => setMissingTeacher(false)} src={close_Button} />

          </Modal.Title>
        <Modal.Body>
        <table class="table table-striped">
  <thead>
    <tr>
      <th className='agressiyaModal_heading' scope="col">Преподаватели</th>
      <th className='agressiyaModal_heading' scope="col">Фамилия и имя</th>
      <th className='agressiyaModal_heading' scope="col">Класс</th>
    </tr>
  </thead>
  <tbody>
  {missingTeachers?.map((item, index) => (
              <tr key={index}>
                <td><img className='lateComersImg' style={{objectFit: "cover"}} src={item?.main_image ? item?.main_image : usersLogo} width='30' height='30' alt='agressiyaImg' /></td>
                <td>{item?.full_name}</td>
                <td>{item?.pupil_class?.join(', ')}</td>
              </tr>
            ))}
  </tbody>
</table>
        </Modal.Body>
      </Modal>

        </div>
    )
}

export default MissingTeacher;