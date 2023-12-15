import axios from 'axios';
import { useContext, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { AuthContext } from '../../context/PupilContext';
import { LoginHooks } from '../../Hooks/LoginHooks';
import "./delete.css"

function Delete ({deleteUser, setDeleteUser}) {
  const {theme, deleteId} = useContext(AuthContext)
  const {token} = LoginHooks()

  const config =  {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }

    const deletePupils = async () => {
      try {
        await axios.delete(
          `https://smartsafeschoolback.tadi.uz/api/users/users/${deleteId}/`,config
        );

        setDeleteUser(false)
      } catch (error) {
        console.error(error);
      }
    };

    return (
        <div>
            <Modal
         className='modal'
        show={deleteUser}
        onHide={() => setDeleteUser(false)}
        size="lg"
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Body>
            <div className='delete'>
                <h2 className='delete_heading'>Удалить данные ?</h2>
                <div className='delete_button'>
                <button
  style={{ borderColor: theme, color: theme }}
  onClick={deletePupils}
  onMouseEnter={(e) => {
    e.target.style.backgroundColor = theme;
    e.target.style.color = "white";
  }}
  onMouseLeave={(e) => {
    e.target.style.backgroundColor = "";
    e.target.style.color = theme;
  }}
  onMouseDown={(e) => {
    e.target.style.backgroundColor = "white";
    e.target.style.color = theme;
  }}
  onMouseUp={(e) => {
    e.target.style.backgroundColor = theme;
    e.target.style.color = "white";
  }}
>
  Да
</button>

<button
  style={{ borderColor: theme, color: theme }}
  onClick={() => setDeleteUser(false)}
  onMouseEnter={(e) => {
    e.target.style.backgroundColor = theme;
    e.target.style.color = "white";
  }}
  onMouseLeave={(e) => {
    e.target.style.backgroundColor = "";
    e.target.style.color = theme;
  }}
  onMouseDown={(e) => {
    e.target.style.backgroundColor = "white";
    e.target.style.color = theme;
  }}
  onMouseUp={(e) => {
    e.target.style.backgroundColor = theme;
    e.target.style.color = "white";
  }}
>
Нет
</button>
                </div>
            </div>
        
        </Modal.Body>
      </Modal>

        </div>
    )
}

export default Delete;