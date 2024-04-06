import { useContext, useEffect } from 'react';
import { Modal } from 'react-bootstrap'; 
import close_Button from '../../Image/close-btn.svg';
import './attendanceModal.css'
import { AuthContext } from '../../context/PupilContext';
import usersLogo from '../../Image/photo_people.jpg'


function MissingPupil ({missingPupil, setMissingPupil}) {
  const {theme,classes,comersPupils, setComersPupil} = useContext(AuthContext)
  


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (classes && classes.classes) {
          const promises = Object.values(classes.classes)
            .flatMap((classData) => classData?.absent_pupils?.pupils || []);
          setComersPupil(promises);
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();
  }, [classes, setComersPupil]);
  
    

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
          Отсутствующие ученики
          <img className='close_button' onClick={() => setMissingPupil(false)} src={close_Button} alt='icon' />

          </Modal.Title>
        <Modal.Body>
        <table class="table table-striped">
  <thead>
    <tr>
      <th className='agressiyaModal_heading' scope="col">Ученик</th>
      <th className='agressiyaModal_heading' scope="col">Фамилия и имя</th>
      <th className='agressiyaModal_heading' scope="col">Класс</th>
    </tr>
  </thead>
  <tbody>
  {comersPupils.map((item, index) => (
              <tr key={index}>
                <td><img className='lateComersImg' style={{objectFit: "cover"}} src={item?.main_image ? item?.main_image : usersLogo} width='30' height='30' alt='agressiyaImg' /></td>
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