import React, { useContext, useEffect, useState } from "react";
import { Box, IconButton, Modal } from "@mui/material";
import "./report.css";
import { Accordion } from "react-bootstrap";
import CloseIcon from "@mui/icons-material/Close";
import { AuthContext } from "../../context/PupilContext";
import api from "../../components/Api/api";
import { DecodeHooks } from "../../Hooks/DecodeHook";
import usersLogo from "../../Image/photo_people.jpg";

const Report = ({ report, setReport }) => {
  const { setPosition, schoolNum, setSchoolNum } = useContext(AuthContext);
  const pupilClass = localStorage.getItem("pupilClass");
  const { decode } = DecodeHooks();
  const handleClose = () => {
    setReport(false);
  };
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  const { theme, pupilsClass, teach, setDepres, setTeach, setClasses } =
    useContext(AuthContext);
  const [pupilMissing, setPupilMissing] = useState([]);
  const [test, setTest] = useState();
  const [latePupils, setLatePupils] = useState([]);
  const teachPupilsCount =
    teach?.pupils[pupilsClass ? pupilsClass : test]?.length;
  const formattedDate = `${day}.${month}.${year}`;
  const nameClass = localStorage.getItem("pupilClass");

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await api.get(`/users/users/${decode}/`);
        setPosition(response.data.status);
        try {
          const response1 = await api.get(
            `/TheSchool/schoolconfigs/${response?.data?.school}/`
          );
          setSchoolNum(response1.data.number);
        } catch (error) {
          console.error(error);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchClasses();
  }, [decode, setPosition, setSchoolNum]);

  useEffect(() => {
    const fetchParents = async () => {
      try {
        const response = await api.get(`/users/users/${decode}/`);
        setTest(response.data?.pupil_class[0]);
        setTeach(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchParents();
  }, [decode, setTeach]);

  useEffect(() => {
    const fetchParents = async () => {
      try {
        const response = await api.get(`/users/pupils/classes/`);
        setClasses(response.data);
        console.log(response.data);
        const presentPupilIds =
          response.data?.classes[nameClass ? nameClass : test]?.absent_pupils
            ?.pupils;

        setPupilMissing(presentPupilIds);
      } catch (error) {
        console.error(error);
      }
    };
    fetchParents();
  }, [decode, test, setClasses, setDepres, nameClass]);

  useEffect(() => {
    const fetchParents = async () => {
      try {
        const response = await api.get(`/users/pupils/classes/`);
        console.log(response.data?.classes[nameClass]);
        const presentPupilIds =
          response.data?.classes[nameClass]?.present_pupils?.pupils;

        setLatePupils(presentPupilIds);
      } catch (error) {
        console.error(error);
      }
    };
    fetchParents();
  }, [test, nameClass]);

  return (
    <div>
      <Modal
        open={report}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            textAlign: "center",
            bgcolor: "background.paper",
            border: "1px solid #000",
            boxShadow: 24,
            p: 4,
            maxHeight: "90%",
            overflowY: "auto",
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <Box sx={{ marginTop: "20px" }} direction="row" spacing={2}>
            <h4 style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Школа N{schoolNum}</span>
              <span>{formattedDate}</span>
            </h4>
            <p>Класса {pupilClass}</p>
            <p style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Всего учеников</span>
              <span>- {teachPupilsCount}</span>
            </p>

            <p style={{ display: "flex", justifyContent: "space-between" }}>
              <span>На территории школы</span>
              <span>- {teachPupilsCount}</span>
            </p>

            <p style={{ display: "flex", justifyContent: "space-between" }}>
              <span>В классе</span>
              <span>
                -{" "}
                {(teachPupilsCount -
                  (pupilMissing?.length ? pupilMissing?.length : 0) >
                0
                  ? teachPupilsCount -
                    (pupilMissing?.length ? pupilMissing?.length : 0)
                  : 0) | 0}
              </span>
            </p>

            <Accordion defaultActiveKey={["0"]} alwaysOpen>
              <Accordion.Item className="accordion-item" eventKey="0">
                <Accordion.Header>
                  <div className="accordion-header">
                    <p className="accordion-name">Отсутсвуют</p>
                    <p className="accordion-item-span">
                      - {pupilMissing?.length | 0}
                    </p>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <ul className="accordion-list">
                    {pupilMissing?.map((item, index) => (
                      <li
                        key={index}
                        className="accordion-listItem"
                        style={{ borderColor: theme }}
                      >
                        <img
                          className="userImage"
                          style={{ objectFit: "cover" }}
                          src={item?.main_image ? item?.main_image : usersLogo}
                          alt="user"
                          width="50"
                          height="50"
                        />
                        <p className="fullName">{item?.full_name}</p>
                      </li>
                    ))}
                  </ul>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            <Accordion>
              <Accordion.Item className="accordion-item">
                <Accordion.Header>
                  <div className="accordion-header">
                    <p className="accordion-name">Опоздавшие</p>
                    <p className="accordion-item-span">
                      - {latePupils?.length | 0}
                    </p>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <ul className="accordion-list">
                    {latePupils?.map((item, index) => (
                      <li
                        key={index}
                        className="accordion-listItem"
                        style={{ borderColor: theme }}
                      >
                        <img
                          className="userImage"
                          style={{ objectFit: "cover" }}
                          src={item?.main_image ? item?.main_image : usersLogo}
                          alt="user"
                          width="50"
                          height="50"
                        />
                        <p className="fullName">{item?.full_name}</p>
                      </li>
                    ))}
                  </ul>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default Report;
