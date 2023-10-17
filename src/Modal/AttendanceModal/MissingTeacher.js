import axios from 'axios';
import { useContext, useEffect } from 'react';
import { Modal } from 'react-bootstrap'; 
import close_Button from '../../Image/close-btn.svg';
import './attendanceModal.css'
import { AuthContext } from '../../context/PupilContext';
function MissingTeacher ({missingTeacher, setMissingTeacher}) {
  const {theme,missingTeachers, setMissingTeachers} = useContext(AuthContext)


  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get('https://www.api.yomon-emas.uz/api/users/users/?status=teacher&is_absent=true');
        const result = response?.data?.results?.map((e) => {
          if (e.is_absent === true) {
            setMissingTeachers(response.data);
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
  {missingTeachers?.results?.map((item, index) => (
              <tr key={index}>
                <td><img src={item?.main_image} width='30' height='30' alt='agressiyaImg' /></td>
                <td>{item?.full_name}</td>
                <td>{item?.pupil_class}</td>
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