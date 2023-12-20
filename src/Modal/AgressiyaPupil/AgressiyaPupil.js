import { useContext, useEffect } from 'react';
import close_Button from '../../Image/close-btn.svg';
import { Modal } from 'react-bootstrap';
import './agressiyaPupil.css'
import { AuthContext } from '../../context/PupilContext';
import { useState } from 'react';
import usersLogo from '../../Image/photo_people.jpg'
import api from '../../components/Api/api';


function AgressiyaPupil({ agressiyaModal, setAgressiyaModal }) {
  const { theme, classes} = useContext(AuthContext);
  const [agressiya, setAgressiya] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const promises = classes?.extra?.angry?.map(async (item) => {
          const response = await api.get(
            `/users/pupils/${item?.id}`);
          return response.data;
        });

        const agressiyaData = await Promise.all(promises);
        setAgressiya(agressiyaData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [classes?.extra?.sad]);

  return (
    <Modal
      className='modal'
      show={agressiyaModal}
      onHide={() => setAgressiyaModal(false)}
      size='lg'
      dialogClassName='modal-90w'
      aria-labelledby='example-custom-modal-styling-title'
    >
      <Modal.Title style={{ color: theme }} className='modal_header' id='example-custom-modal-styling-title'>
        Дети в состоянии агрессии
        <img className='close_button' onClick={() => setAgressiyaModal(false)} src={close_Button} alt='Close Button' />
      </Modal.Title>
      <Modal.Body>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th className='agressiyaModal_heading' scope='col'>Ученик</th>
              <th className='agressiyaModal_heading' scope='col'>Фамилия и имя</th>
              <th className='agressiyaModal_heading' scope='col'>Класс</th>
            </tr>
          </thead>
          <tbody>
            {agressiya.map((item, index) => (
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
  );
}

export default AgressiyaPupil;