import axios from 'axios';
import { useContext, useEffect } from 'react';
import { Modal } from 'react-bootstrap'; 
import close_Button from '../../Image/close-btn.svg';
import './attendanceModal.css'
import { AuthContext } from '../../context/PupilContext';
import usersLogo from '../../Image/photo_people.jpg'

function LateComersPupil ({lateComersPupil, setLateComersPupil}) {
  const { theme, classes,lateComersPupils, setLateComersPupils} = useContext(AuthContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const promises = Object.values(classes?.classes).flatMap((classData) => classData.present_pupils.id).map(async (id) => {
          const response = await axios.get(`https://www.api.yomon-emas.uz/api/users/pupils/${id}`);
          return response.data;
        });
  
        const absentPupilsData = await Promise.all(promises);
        setLateComersPupils(absentPupilsData);
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
        show={lateComersPupil}
        onHide={() => setLateComersPupil(false)}
        size="lg"
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
          <Modal.Title style={{color: theme}} className='modal_header' id="example-custom-modal-styling-title">
          Опоздавшие ученик
          <img className='close_button' onClick={() => setLateComersPupil(false)} src={close_Button} alt='closeButton' />

          </Modal.Title>
        <Modal.Body>
        <table class="table table-striped">
  <thead>
    <tr>
      <th className='agressiyaModal_heading' scope="col">ученик</th>
      <th className='agressiyaModal_heading' scope="col">Фамилия и имя</th>
      <th className='agressiyaModal_heading' scope="col">класс</th>
      <th>Пришел</th>
    </tr>
  </thead>
  <tbody>
  {lateComersPupils.map((item, index) => (
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

export default LateComersPupil;