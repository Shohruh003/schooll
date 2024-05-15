import { useContext, useEffect, useState } from "react";
import close_Button from "../../Image/close-btn.svg";
import { Modal } from "react-bootstrap";
import "./depressiyaPupil.css";
import { AuthContext } from "../../context/PupilContext";
import usersLogo from "../../Image/photo_people.jpg";

import api from "../../components/Api/api";

function DepressiyaPupil({ depressiyaModal, setDepressiyaModal }) {
  const { theme, classes } = useContext(AuthContext);

  const [depressiya, setDepressiya] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (classes && classes.extra && Array.isArray(classes.extra.sad)) {
          const promises = classes.extra.sad.map(async (item) => {
            const response = await api.get(`/users/pupils/${item?.id}`);
            return response.data;
          });

          const depressiyaData = await Promise.all(promises);
          setDepressiya(depressiyaData);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [classes]);

  return (
    <Modal
      className="modal custom-modal"
      show={depressiyaModal}
      onHide={() => setDepressiyaModal(false)}
      size="lg"
      dialogClassName="modal-90w"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Title
        style={{ color: theme }}
        className="modal_header"
        id="example-custom-modal-styling-title"
      >
        Дети в состоянии депрессии
        <img
          className="close_button"
          onClick={() => setDepressiyaModal(false)}
          src={close_Button}
          alt="icon"
        />
      </Modal.Title>
      <Modal.Body>
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Ученик</th>
              <th scope="col">Фамилия и имя</th>
              <th scope="col">Kласс</th>
            </tr>
          </thead>
          <tbody>
            {depressiya.map((item, index) => (
              <tr key={index}>
                <td>
                  <img
                    className="lateComersImg"
                    style={{ objectFit: "cover" }}
                    src={item?.main_image ? item?.main_image : usersLogo}
                    width="30"
                    height="30"
                    alt="agressiyaImg"
                  />
                </td>
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

export default DepressiyaPupil;
