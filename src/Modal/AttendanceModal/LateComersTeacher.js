import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap'; 
import close_Button from '../../Image/close-btn.svg';
import './attendanceModal.css'
import { AuthContext } from '../../context/PupilContext';
import usersLogo from '../../Image/photo_people.jpg'

function LateComersTeacher ({lateComersTeacher, setLateComersTeacher}) {
  const {theme,lateComersTeachers, setLateComersTeachers} = useContext(AuthContext);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get('https://www.api.yomon-emas.uz/api/users/users/?status=teacher&is_absent=true');
        const result = response?.data?.results?.map((e) => {
          if (e?.is_lated === "true") {
            setLateComersTeachers(response.data);
          }
        })
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
        show={lateComersTeacher}
        onHide={() => setLateComersTeacher(false)}
        size="lg"
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
          <Modal.Title style={{color: theme}} className='modal_header' id="example-custom-modal-styling-title">
          Опоздавшие преподавателей
          <img className='close_button' onClick={() => setLateComersTeacher(false)} src={close_Button} />

          </Modal.Title>
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
  {lateComersTeachers?.results?.map((item, index) => (
              <tr key={index}>
                <td><img src={(item?.main_image?.split('').reverse().slice(0,3).reverse().join('') == 'jpg') ? item?.main_image : usersLogo} width='30' height='30' alt='agressiyaImg' /></td>
                <td>{item?.full_name}</td>
                <td>{item?.pupil_class}</td>
                <td>09:34</td>
              </tr>
            ))}
  </tbody>
</table>
        </Modal.Body>
      </Modal>

        </div>
    )
}

export default LateComersTeacher;