import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap'; 
import close_Button from '../../Image/close-btn.svg';
import './attendanceModal.css'
import { AuthContext } from '../../context/PupilContext';
import usersLogo from '../../Image/photo_people.jpg'
import { LoginHooks } from '../../Hooks/LoginHooks';

function LateComersTeacher ({lateComersTeacher, setLateComersTeacher}) {
  const {theme,lateComersTeachers, setLateComersTeachers} = useContext(AuthContext);
  const {token} = LoginHooks()

  const config =  {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get('https://www.api.yomon-emas.uz/api/users/users/?status=teacher&is_absent=true', config);
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
                <td><img className='lateComersImg' src={item?.main_image ? item?.main_image : usersLogo} width='30' height='30' alt='agressiyaImg' /></td>
                <td>{item?.full_name}</td>
                <td>{item?.pupil_class}</td>
                <td>
      {item?.emotions[item?.emotions.length - 1]?.create_date ? (
        new Date(item?.emotions[item?.emotions.length - 1]?.create_date).toLocaleTimeString('uz-UZ', {
          hour: 'numeric',
          minute: 'numeric'
        })
      ) : (
        'N/A'
      )}
    </td>
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