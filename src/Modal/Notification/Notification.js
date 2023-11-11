import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap'; 
import close_Button from '../../Image/close-btn.svg';
import './notification.css'
import { AuthContext } from '../../context/PupilContext';
function Notification () {
    const {modal, setModal, notification, theme} = useContext(AuthContext)
    

    return (
        <div>
            <Modal
         className='modal'
        show={modal}
        onHide={() => setModal(false)}
        size="lg"
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
          <Modal.Title style={{color: theme}} className='modal_header' id="example-custom-modal-styling-title">
          Текст сообщения
          <img className='close_button' onClick={() => setModal(false)} src={close_Button} />

          </Modal.Title>
        {
          notification?.map((e) => {
            return (
              <Modal.Body>
              <h4>{e?.title}</h4>
              <p>{e?.message}</p>
            </Modal.Body>
            )
          })
        }      </Modal>
        </div>
    )
}

export default Notification;