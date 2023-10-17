import axios from 'axios';
import { useContext, useEffect } from 'react';
import { Modal } from 'react-bootstrap'; 
import close_Button from '../../Image/close-btn.svg';
import './attendanceModal.css'
import { AuthContext } from '../../context/PupilContext';
function MissingPupil ({missingPupil, setMissingPupil}) {
  const {theme,classes,comersPupils, setComersPupil} = useContext(AuthContext)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const promises = Object.values(classes?.classes).flatMap((classData) => classData.absent_pupils.id).map(async (id) => {
          const response = await axios.get(`https://www.api.yomon-emas.uz/api/users/pupils/${id}`);
          return response.data;
        });
  
        const absentPupilsData = await Promise.all(promises);
        setComersPupil(absentPupilsData);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();
  }, [classes?.classes]);
    

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
          <Modal.Title style={{color: theme}} className='modal_header' id="example-custom-modal-styling-title">
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
  {comersPupils.map((item, index) => (
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

export default MissingPupil;