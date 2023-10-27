import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import close_Button from '../../Image/close-btn.svg';
import { Modal } from 'react-bootstrap'; 
import './depressiyaPupil.css'
import { AuthContext } from '../../context/PupilContext';
import usersLogo from '../../Image/photo_people.jpg'

function DepressiyaPupil ({depressiyaModal, setDepressiyaModal}) {
  const {theme, classes} = useContext(AuthContext)

  const [depressiya, setDepressiya] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const promises = classes?.extra?.angry?.map(async (item) => {
          const response = await axios.get(
            `https://www.api.yomon-emas.uz/api/users/pupils/${item?.id}`
          );
          return response.data;
        });

        const depressiyaData = await Promise.all(promises);
        setDepressiya(depressiyaData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [classes?.extra?.angry]);
    return (
        <Modal
         className='modal custom-modal'
        show={depressiyaModal}
        onHide={() => setDepressiyaModal(false)}
        size="lg"
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
          <Modal.Title style={{color: theme}} className='modal_header' id="example-custom-modal-styling-title">
          Дети в состоянии депрессии
          <img className='close_button' onClick={() => setDepressiyaModal(false)} src={close_Button} />

          </Modal.Title>
        <Modal.Body>
        <table class="table  table-striped">
  <thead>
    <tr>
      <th scope="col">ученик</th>
      <th scope="col">Фамилия и имя</th>
      <th scope="col">класс</th>
    </tr>
  </thead>
  <tbody>
  {depressiya.map((item, index) => (
              <tr key={index}>
                <td><img src={(item?.main_image?.split('').reverse().slice(0,3).reverse().join('') == 'jpg') ? item?.main_image : usersLogo} width='30' height='30' alt='agressiyaImg' /></td>
                <td>{item?.full_name}</td>
                <td>{item?.pupil_class}</td>
              </tr>
            ))}
  </tbody>
</table>
        </Modal.Body>
      </Modal>
    )
}

export default DepressiyaPupil;