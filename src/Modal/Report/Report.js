import React, { useContext, useEffect } from 'react';
import {
  Box,
  IconButton,
  Modal,
} from '@mui/material';
import './report.css'
import { Accordion } from 'react-bootstrap';
import CloseIcon from '@mui/icons-material/Close';
import Image from '../../Image/peopleImg1.jpg'
import { AuthContext } from '../../context/PupilContext';
import api from '../../components/Api/api';
import { DecodeHooks } from '../../Hooks/DecodeHook';

const Report = ({ report, setReport }) => {
  const {position, setPosition, schoolNum, setSchoolNum} = useContext(AuthContext)
  const pupilClass = localStorage.getItem('pupilClass');
  const {decode} = DecodeHooks()
  const handleClose = () => {
    setReport(false);
  };
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  
  const formattedDate = `${day}.${month}.${year}`;
  console.log(formattedDate);
  useEffect(() => {

		const fetchClasses = async () => {
			try {
				const response = await api.get(`/users/users/${decode}/`);
				setPosition(response.data.status)
                try {
                    const response1 = await api.get(`/TheSchool/schoolconfigs/${response?.data?.school}/`);
                    setSchoolNum(response1.data.number)
                } catch (error) {
                    console.error(error);
                }
			} catch (error) {
				console.error(error);
			}
		};
		fetchClasses();
	}, [decode, setPosition]);

  
  

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
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            textAlign: 'center',
            bgcolor: 'background.paper',
            border: '1px solid #000',
            boxShadow: 24,
            p: 4,
            maxHeight: '90%',
            overflowY: 'auto'
          }}
        >
          <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
          <Box sx={{ marginTop: '20px' }} direction="row" spacing={2}>

          <h4 style={{display: 'flex', justifyContent: 'space-between'}}>
                 <span>Школа N{schoolNum}</span>
                 <span>{formattedDate}</span>
               </h4>
               <p>Класса {pupilClass}</p>
               <p style={{display: 'flex', justifyContent: 'space-between'}}>
                 <span>Всего учеников</span>
                 <span>- 30</span>
               </p>

               <p style={{display: 'flex', justifyContent: 'space-between'}}>
                 <span>На территории школы</span>
                 <span>- 28</span>
               </p>

               <p style={{display: 'flex', justifyContent: 'space-between'}}>
                 <span>В классе</span>
                 <span>- 26</span>
               </p>

               <Accordion defaultActiveKey={["0"]} alwaysOpen >
             <Accordion.Item className="accordion-item" eventKey="0">
               <Accordion.Header>
                 <div className="accordion-header">
                   <p className="accordion-name">Отсутсвуют</p>
                   <p className="accordion-item-span">- 4</p>
                 </div>
               </Accordion.Header>
               <Accordion.Body>
                 <ul className="accordion-list">
                 <li className="accordion-listItem">
                   <img className='userImage' src={Image} alt='user' width="50" height="50"/>
                     <p className="fullName">Shohruh Azimov</p>
                   </li>
                 </ul>
               </Accordion.Body>
             </Accordion.Item>
           </Accordion>

           <Accordion>
             <Accordion.Item className="accordion-item">
               <Accordion.Header>
                 <div className="accordion-header">
                   <p className="accordion-name">Опоздавшие</p>
                   <p className="accordion-item-span">- 10</p>
                 </div>
               </Accordion.Header>
               <Accordion.Body>
                 <ul className="accordion-list">
                   <li className="accordion-listItem">
                   <img className='userImage' src={Image} alt='user' width="50" height="50"/>
                     <p className="fullName">Shohruh Azimov</p>
                   </li>
                   <li className="accordion-listItem">
                   <img className='userImage' src={Image} alt='user' width="50" height="50"/>
                     <p className="fullName">Shohruh Azimov</p>
                   </li>
                   <li className="accordion-listItem">
                   <img className='userImage' src={Image} alt='user' width="50" height="50"/>
                     <p className="fullName">Bobur Muhammadjokirjonov</p>
                   </li>
                   <li className="accordion-listItem">
                   <img className='userImage' src={Image} alt='user' width="50" height="50"/>
                     <p className="fullName">Shohruh Azimov</p>
                   </li>
                   <li className="accordion-listItem">
                   <img className='userImage' src={Image} alt='user' width="50" height="50"/>
                     <p className="fullName">Shohruh Azimov</p>
                   </li>
                   <li className="accordion-listItem">
                   <img className='userImage' src={Image} alt='user' width="50" height="50"/>
                     <p className="fullName">Shohruh Azimov</p>
                   </li>
                   <li className="accordion-listItem">
                   <img className='userImage' src={Image} alt='user' width="50" height="50"/>
                     <p className="fullName">Shohruh Azimov</p>
                   </li>
                   <li className="accordion-listItem">
                   <img className='userImage' src={Image} alt='user' width="50" height="50"/>
                     <p className="fullName">Shohruh Azimov</p>
                   </li>
                   <li className="accordion-listItem">
                   <img className='userImage' src={Image} alt='user' width="50" height="50"/>
                     <p className="fullName">Shohruh Azimov</p>
                   </li>
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
