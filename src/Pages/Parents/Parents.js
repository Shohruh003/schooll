import React, { useState, useEffect, useContext } from 'react';
import './parents.css'
import { BarChart } from '@mui/x-charts';
import { Link } from 'react-router-dom';
import Avatar from '../../Image/photo_people.jpg'
import CanvasJSReact from '@canvasjs/react-charts';
import { AuthContext } from '../../context/PupilContext';
import { DecodeHooks } from '../../Hooks/DecodeHook';
import Notification from '../../Modal/Notification/Notification';
import api from '../../components/Api/api';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;



function Parents () {
	    const {theme, setTheme, modal, setModal,setNotification,notificationCount, setNotificationCount} = useContext(AuthContext)
        const {decode} = DecodeHooks()
        const [parent, setParent] = useState()
        const [parentId, setParentId] = useState()
        const [bar, setBar] = useState()

        useEffect(() => {
            const fetchNotification = async () => {
              try {
      
                  const response = await api.get(`/notification/notification/${decode}/get_messages_by_user/`);
                  setNotification(response.data.messages)
                  setNotificationCount(response.data.messages.length)
              } catch (error) {
                  console.error(error);
              }
          };
      
          fetchNotification();
      }, [decode]);

        useEffect(() => {
            const fetchParents = async () => {
                try {
                    const response = await api.get(`/users/users/${decode}/sons/`);
                    setParentId(response?.data[0]?.id)
                    setParent(response.data)
                } catch (error) {
                    console.error(error);
                }
            };
    
            fetchParents();
        }, [decode]);

	useEffect(() => {
		const savedTheme = localStorage.getItem('theme');
		if (savedTheme) {
			setTheme(savedTheme);
		} else {
			applyDefaultTheme();
		}
	}, []);

	useEffect(() => {
		applyTheme();
	}, [theme]);

	const applyDefaultTheme = () => {
		setTheme('#81B37A');
	};

	const applyTheme = () => {
		const body = document.body;
		const header = document.querySelector('.header_parent')
		const dashboardIcons = document.querySelectorAll('.dashboard_icon circle')
		const weather = document.querySelector('.weather')
		const weatherParent = document.querySelector('.weather_parent')
        const headerIcons = document.querySelectorAll('.header_icon circle')
        const smsCount = document.querySelector('.sms_count')
        const avatarAbout = document.querySelector('.avatar_about')
        const columnDiv = document.querySelector('.column')
        const emotionWeek = document.querySelector('.emotion_week')
        const chartAbout = document.querySelector('.avatar_chartInner')
        const chat = document.querySelector('.chat')




		if (theme === '#ffbe98') {
			body.style.backgroundColor = '#F5EFEF';
			header.style.borderColor = '#ffbe98'
			dashboardIcons.forEach((e) => {
				e.setAttribute('fill', '#ffbe98')

				e.addEventListener('mouseover', () => {
					e.setAttribute('fill', '#ffbe98')
				});
				e.addEventListener('mouseout', () => {
					e.setAttribute('fill', '#ffbe98')
				});
			})
			weather.style.backgroundColor = 'rgba(255, 190, 152)';
			weatherParent.style.backgroundColor = 'rgba(255, 190, 152)';
            headerIcons.forEach((e) => {
                e.setAttribute('fill', '#ffbe98')
              })
            smsCount.style.backgroundColor = '#ffbe98'
            avatarAbout.style.backgroundColor = 'rgba(255, 190, 152, 0.2)'
            columnDiv.style.backgroundColor = 'rgba(255, 190, 152, 0.2)'
            emotionWeek.style.backgroundColor = 'rgba(255, 190, 152, 0.2)'
            chartAbout.style.backgroundColor = 'rgba(255, 190, 152, 0.2)'
            chat.style.backgroundColor = '#ffbe98'
            
		} else if (theme === '#81B37A') {
			body.style.backgroundColor = '#E4F0E2';
			header.style.borderColor = '#81B37A'
			dashboardIcons.forEach((e) => {
				e.setAttribute('fill', '#ACCAA8')

				e.addEventListener('mouseover', () => {
					e.setAttribute('fill', '#81B37A')
				});
				e.addEventListener('mouseout', () => {
					e.setAttribute('fill', '#ACCAA8')
				});
			})
			weather.style.backgroundColor = '#81B37A';
			weatherParent.style.backgroundColor = '#81B37A';
            headerIcons.forEach((e) => {
                e.setAttribute('fill', '#ACCAA8')
              })
            smsCount.style.backgroundColor = '#81B37A'
            avatarAbout.style.backgroundColor = 'rgba(129, 179, 122, 0.15)'
            columnDiv.style.backgroundColor = 'rgba(129, 179, 122, 0.15)'
            emotionWeek.style.backgroundColor = 'rgba(129, 179, 122, 0.15)'
            chartAbout.style.backgroundColor = 'rgba(129, 179, 122, 0.15)'
            chat.style.backgroundColor = '#9BC196'
		}
	};


	const changeTheme = () => {
		const newTheme = theme === '#ffbe98' ? '#81B37A' : '#ffbe98';
		setTheme(newTheme);
		localStorage.setItem('theme', newTheme);
	};
		const [weather, setWeather] = useState()

		useEffect(() => {
			const fetchWeather = async () => {
				try {
					const response = await api.get('http://api.weatherapi.com/v1/current.json?key=1f52a0a6619d4479a83122537220705&q=tashkent');
					setWeather(response.data.current.temp_c + 273)
				} catch (error) {
					console.error(error);
				}
			};
	
			fetchWeather();
		}, []);



			const currentDate = new Date();
			const day = String(currentDate.getDate()).padStart(2, '0');
			const month = String(currentDate.getMonth() + 1).padStart(2, '0');
			const year = currentDate.getFullYear();


            const handleModal = () => {
                try {
                  setModal(true)
      
                    const response = api.get(`/notification/notification/${decode}/get_messages_by_user/`);
                    setNotification(response.data.messages)
                } catch (error) {
                    console.error(error);
                }
            };

            function getLastWeekDates() {
                const currentDate = new Date();
                const lastWeekDates = [];
              
                for (let i = 6; i >= 0; i--) {
                    const date = new Date(currentDate);
                    date.setDate(currentDate.getDate() - i);
                    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
                    lastWeekDates.push(formattedDate);
                  }
              
                return lastWeekDates;
              }
              const result = getLastWeekDates();
              const date1 = result[0];
              const date2 = result[1];
              const date3 = result[2];
              const date4 = result[3];
              const date5 = result[4];
              const date6 = result[5];
              const date7 = result[6];

              const [profil, setProfil] = useState()
              const [pia, setPia] = useState()
              const [week, setWeek] = useState()
              const [week2, setWeek2] = useState()
              const [week3, setWeek3] = useState()
              const [week4, setWeek4] = useState()
              const [week5, setWeek5] = useState()
              const [week6, setWeek6] = useState()
              const [week7, setWeek7] = useState()
              const weekdays = ['Вс','Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
             
              const week7day = new Date(date7);
              const week6day = new Date(date6);
              const week5day = new Date(date5);
              const week4day = new Date(date4);
              const week3day = new Date(date3);
              const week2day = new Date(date2);
              const week1day = new Date(date1);
              const weekday7 = weekdays[week7day?.getDay()];
              const weekday6 = weekdays[week6day?.getDay()];
              const weekday5 = weekdays[week5day?.getDay()];
              const weekday4 = weekdays[week4day?.getDay()];
              const weekday3 = weekdays[week3day?.getDay()];
              const weekday2 = weekdays[week2day?.getDay()];

          useEffect(() => { 
                const fetchPrentPupils = async () => {
                  try {
                      const response = await api.get(`/users/pupils/${parentId}/`);
                      setProfil(response.data)
                  } catch (error) {
                      console.error(error);
                  }


                try {
                    const response = await api.get(`/users/emotions/${parentId}/pie_chart_id/`);
                    setPia(response.data)
                } catch (error) {
                    console.error(error);
                }

                try {
                    const response = await api.get(`/users/emotions/${parentId}/for_week/`);
                    setWeek(response.data)
                    const data2 = response.data[date2]
                    const data3 = response.data[date3]
                    const data4 = response.data[date4]
                    const data5 = response.data[date5]
                    const data6 = response.data[date6]
                    const data7 = response.data[date7]

                    setWeek2(data2)
                    setWeek3(data3)
                    setWeek4(data4)
                    setWeek5(data5)
                    setWeek6(data6)
                    setWeek7(data7)

                } catch (error) {
                    console.error(error);
                }

                try {
                    const response = await api.get(`/users/emotions/${parentId}/weekly_diagram_v2/`);
                        setBar(response.data)
                    } catch (error) {
                        console.error(error);
                    }
              };
           
              fetchPrentPupils();
          }, [parentId]);


                      const OnParentChange = async (evt) => {
                          try {
                              const response = await api.get(`/users/pupils/${evt.target.value}/`);
                              setProfil(response.data)
                          } catch (error) {
                              console.error(error);
                          }


                          try {
                            const response = await api.get(`/users/emotions/${evt.target.value}/pie_chart_id/`);
                            setPia(response.data)
                        } catch (error) {
                            console.error(error);
                        }


                        try {
                            const response = await api.get(`/users/emotions/${evt.target.value}/for_week/`);
                            setWeek(response.data)
                            const data2 = response.data[date2]
                            const data3 = response.data[date3]
                            const data4 = response.data[date4]
                            const data5 = response.data[date5]
                            const data6 = response.data[date6]
                            const data7 = response.data[date7]

                            setWeek2(data2)
                            setWeek3(data3)
                            setWeek4(data4)
                            setWeek5(data5)
                            setWeek6(data6)
                            setWeek7(data7)

                        } catch (error) {
                            console.error(error);
                        }

                        try {
                            const response = await api.get(`/users/emotions/${evt.target.value}/weekly_diagram_v2/`);
                                setBar(response.data)
                            } catch (error) {
                                console.error(error);
                            }
                      };
const piAngry = Math.round(pia?.angry)
const piSad = Math.round(pia?.sad)
const piNeutral = Math.round(pia?.neutral)
const piHappy = Math.round(pia?.happy)

              const pupils = {
                animationEnabled: true,
                subtitles: [{
                    verticalAlign: "center",
                    fontSize: 14,
                    dockInsidePlotArea: true,
                }],
                width: 350,
                height: 175,
                data: [{
                    type: "doughnut",
                    yValueFormatString: "#,###'%'",
                    dataPoints: [
                        { y: piAngry ? piAngry : 0 , color: "#ffbe98", name: "Злость" },
                        { y: piSad ? piSad : 0 , color: "#c0c0c0", name: "Грусть" },
                        { y: piNeutral ? piNeutral : 0, color: "#81B37A", name: "Нейтраль" },
                        { y: piHappy ? piHappy : 0, color: "#ffa500", name: "Веселье"}
                    ]
                }],
                backgroundColor: "transparent",
            }

            function findLargestSection(pupils) {
                let largestSectionIndex = 0;
                let largestSectionValue = pupils.data[0].dataPoints[0].y;
              
                for (let i = 1; i < pupils.data[0].dataPoints.length; i++) {
                  const sectionValue = pupils.data[0].dataPoints[i].y;
                  if (sectionValue > largestSectionValue) {
                    largestSectionIndex = i;
                    largestSectionValue = sectionValue;
                  }
                }
              
                const largestSection = pupils.data[0].dataPoints[largestSectionIndex];
                const largestSectionPercentage = ((largestSection.y / pupils.data[0].dataPoints.reduce((sum, dp) => sum + dp.y, 0)) * 100).toFixed(1);
                
                pupils.subtitles[0].text = `${largestSection.name} ${largestSectionPercentage}%`;
              
                return largestSection.name;
              }
              
              const pupilsSectionName = findLargestSection(pupils);


                        const formattedTime2 = new Date(week2?.first?.time).toLocaleTimeString('uz-UZ', {
                            hour: 'numeric',
                            minute: 'numeric'
                          })

                          const formattedTime3 = new Date(week3?.first?.time).toLocaleTimeString('uz-UZ', {
                            hour: 'numeric',
                            minute: 'numeric'
                          })

                          const formattedTime4 = new Date(week4?.first?.time).toLocaleTimeString('uz-UZ', {
                            hour: 'numeric',
                            minute: 'numeric'
                          })

                          const formattedTime5 = new Date(week5?.first?.time).toLocaleTimeString('uz-UZ', {
                            hour: 'numeric',
                            minute: 'numeric'
                          })

                          const formattedTime6 = new Date(week6?.first?.time).toLocaleTimeString('uz-UZ', {
                            hour: 'numeric',
                            minute: 'numeric'
                          })

                          const formattedTime7 = new Date(week7?.first?.time).toLocaleTimeString('uz-UZ', {
                            hour: 'numeric',
                            minute: 'numeric'
                          })


                        const formattedTime2week = new Date(week2?.last?.time).toLocaleTimeString('uz-UZ', {
                            hour: 'numeric',
                            minute: 'numeric'
                          })

                          const formattedTime3week = new Date(week3?.last?.time).toLocaleTimeString('uz-UZ', {
                            hour: 'numeric',
                            minute: 'numeric'
                          })

                          const formattedTime4week = new Date(week4?.last?.time).toLocaleTimeString('uz-UZ', {
                            hour: 'numeric',
                            minute: 'numeric'
                          })

                          const formattedTime5week = new Date(week5?.last?.time).toLocaleTimeString('uz-UZ', {
                            hour: 'numeric',
                            minute: 'numeric'
                          })

                          const formattedTime6week = new Date(week6?.last?.time).toLocaleTimeString('uz-UZ', {
                            hour: 'numeric',
                            minute: 'numeric'
                          })

                          const formattedTime7week = new Date(week7?.last?.time).toLocaleTimeString('uz-UZ', {
                            hour: 'numeric',
                            minute: 'numeric'
                          })
                          const formattedDates = [];
                          const remainingDays = 6;
                          const weekDays = ["Вс","Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
                          const targetDates = [];
                          
                          for (let i = 0; i < remainingDays; i++) {
                            const date = new Date(currentDate);
                            date.setDate(date.getDate() - i);
                            const formattedDate = date.toLocaleDateString("en-GB");
                          
                            const year = date.getFullYear();
                            const month = String(date.getMonth() + 1).padStart(2, '0');
                            const day = String(date.getDate()).padStart(2, '0');
                          
                            const filteredDate = `${year}-${month}-${day}`;
                            targetDates.push(filteredDate);
                            const weekDay = weekDays[date.getDay()];
                            formattedDates.push(`${formattedDate}-${weekDay}`);
                          }
                        
                          const reversedDates = formattedDates.reverse();;
                        
                        const filteredData0 = bar?.filter((item) => targetDates[0].includes(Object.keys(item)[0]))
                          .map((item) => item[Object.keys(item)[0]])[0]
                        
                        const filteredData1 = bar?.filter((item) => targetDates[1].includes(Object.keys(item)[0]))
                          .map((item) => item[Object.keys(item)[0]])[0]
                        
                        const filteredData2 = bar?.filter((item) => targetDates[2].includes(Object.keys(item)[0]))
                          .map((item) => item[Object.keys(item)[0]])[0]
                        
                        const filteredData3 = bar?.filter((item) => targetDates[3].includes(Object.keys(item)[0]))
                          .map((item) => item[Object.keys(item)[0]])[0]
                        
                        const filteredData4 = bar?.filter((item) => targetDates[4].includes(Object.keys(item)[0]))
                          .map((item) => item[Object.keys(item)[0]])[0]
                        
                        const filteredData5 = bar?.filter((item) => targetDates[5].includes(Object.keys(item)[0]))
                          .map((item) => item[Object.keys(item)[0]])[0]
                        let happy0 = filteredData0?.happy
                        let happy1 = filteredData1?.happy
                        let happy2 = filteredData2?.happy
                        let happy3 = filteredData3?.happy
                        let happy4 = filteredData4?.happy
                        let happy5 = filteredData5?.happy
                        
                        let neutral0 = filteredData0?.neutral
                        let neutral1 = filteredData1?.neutral
                        let neutral2 = filteredData2?.neutral
                        let neutral3 = filteredData3?.neutral
                        let neutral4 = filteredData4?.neutral
                        let neutral5 = filteredData5?.neutral
                        
                        let sad0 = filteredData0?.sad
                        let sad1 = filteredData1?.sad
                        let sad2 = filteredData2?.sad
                        let sad3 = filteredData3?.sad
                        let sad4 = filteredData4?.sad
                        let sad5 = filteredData5?.sad
                        
                        let angry0 = filteredData0?.angry
                        let angry1 = filteredData1?.angry
                        let angry2 = filteredData2?.angry
                        let angry3 = filteredData3?.angry
                        let angry4 = filteredData4?.angry
                        let angry5 = filteredData5?.angry
	return (
		<div className="school">
			<div className='container'>

				<div className="header_parent">
					<Link to="/">
                    <svg className='logo-parent' width="467" height="54" viewBox="0 0 467 54" fill="none" xmlns="http://www.w3.org/2000/svg">
						<rect width="467" height="54" fill={theme}/>
						<path d="M27.8945 14.0791H41.7178V17.3818H31.6055V24.6182H41.7178V27.9209H31.6055V40H27.8945V14.0791Z" fill="white"/>
						<path d="M63.5678 29.7393V36.9941C63.5678 37.5755 63.7657 37.8662 64.1615 37.8662C64.5697 37.8662 65.2068 37.5632 66.0727 36.957V39.0166C65.3057 39.5114 64.6872 39.8454 64.2172 40.0186C63.7595 40.2041 63.2771 40.2969 62.7699 40.2969C61.3227 40.2969 60.4691 39.7279 60.2094 38.5898C58.7745 39.7031 57.2468 40.2598 55.6264 40.2598C54.4389 40.2598 53.4493 39.8701 52.6576 39.0908C51.866 38.2992 51.4701 37.3096 51.4701 36.1221C51.4701 35.0459 51.8536 34.0872 52.6205 33.2461C53.3998 32.3926 54.5007 31.7184 55.9232 31.2236L60.2465 29.7393V28.8301C60.2465 26.7767 59.2198 25.75 57.1664 25.75C55.3233 25.75 53.5297 26.7025 51.7855 28.6074V24.915C53.0967 23.3688 54.9831 22.5957 57.4447 22.5957C59.2878 22.5957 60.766 23.0781 61.8793 24.043C62.2504 24.3522 62.5844 24.7666 62.8812 25.2861C63.1781 25.7933 63.3637 26.3066 63.4379 26.8262C63.5245 27.3333 63.5678 28.3044 63.5678 29.7393ZM60.2465 36.623V31.5576L57.9828 32.4297C56.8324 32.8874 56.016 33.3512 55.5336 33.8213C55.0635 34.279 54.8285 34.8542 54.8285 35.5469C54.8285 36.252 55.0512 36.8271 55.4965 37.2725C55.9542 37.7178 56.5417 37.9404 57.2592 37.9404C58.3354 37.9404 59.3311 37.5013 60.2465 36.623Z" fill="white"/>
						<path d="M89.4627 36.0107V39.3506C87.768 39.9814 86.1105 40.2969 84.49 40.2969C81.8182 40.2969 79.6844 39.5052 78.0887 37.9219C76.5053 36.3385 75.7137 34.2171 75.7137 31.5576C75.7137 28.8734 76.4868 26.7087 78.033 25.0635C79.5792 23.4183 81.6141 22.5957 84.1375 22.5957C85.0158 22.5957 85.8012 22.6823 86.4939 22.8555C87.199 23.0163 88.0649 23.3255 89.0916 23.7832V27.3828C87.3846 26.2943 85.8012 25.75 84.3416 25.75C82.8201 25.75 81.5708 26.2881 80.5936 27.3643C79.6163 28.4281 79.1277 29.7887 79.1277 31.4463C79.1277 33.1904 79.6535 34.5758 80.7049 35.6025C81.7687 36.6292 83.1974 37.1426 84.991 37.1426C86.2898 37.1426 87.7804 36.7653 89.4627 36.0107Z" fill="white"/>
						<path d="M115.469 31.7617H103.464C103.551 33.3945 104.095 34.6934 105.097 35.6582C106.111 36.623 107.416 37.1055 109.012 37.1055C111.238 37.1055 113.292 36.4128 115.172 35.0273V38.3301C114.133 39.0228 113.1 39.5176 112.073 39.8145C111.059 40.1113 109.865 40.2598 108.492 40.2598C106.612 40.2598 105.091 39.8701 103.928 39.0908C102.765 38.3115 101.831 37.2663 101.126 35.9551C100.433 34.6315 100.087 33.1038 100.087 31.3721C100.087 28.7744 100.823 26.6654 102.295 25.0449C103.767 23.4121 105.678 22.5957 108.029 22.5957C110.292 22.5957 112.098 23.3874 113.446 24.9707C114.795 26.554 115.469 28.6755 115.469 31.335V31.7617ZM103.538 29.7393H112.129C112.043 28.391 111.64 27.3519 110.923 26.6221C110.206 25.8923 109.241 25.5273 108.029 25.5273C106.816 25.5273 105.821 25.8923 105.041 26.6221C104.274 27.3519 103.773 28.391 103.538 29.7393Z" fill="white"/>
						<path d="M145.42 14.0791H149.131V40H145.42V14.0791Z" fill="white"/>
						<path d="M162.52 39.9629V14.0791H171.259C174.785 14.0791 177.574 14.611 179.627 15.6748C181.681 16.7262 183.314 18.2786 184.526 20.332C185.738 22.3854 186.344 24.6243 186.344 27.0488C186.344 28.7806 186.01 30.4382 185.342 32.0215C184.674 33.6048 183.722 34.9964 182.485 36.1963C181.223 37.4333 179.757 38.3672 178.087 38.998C177.11 39.3815 176.213 39.6413 175.397 39.7773C174.58 39.901 173.022 39.9629 170.721 39.9629H162.52ZM170.87 17.3818H166.231V36.6602H170.981C172.836 36.6602 174.277 36.5365 175.304 36.2891C176.331 36.0293 177.184 35.7077 177.865 35.3242C178.557 34.9284 179.188 34.446 179.757 33.877C181.588 32.0215 182.503 29.6774 182.503 26.8447C182.503 24.0615 181.563 21.7917 179.683 20.0352C178.99 19.3796 178.192 18.8415 177.289 18.4209C176.399 18.0003 175.551 17.722 174.747 17.5859C173.943 17.4499 172.651 17.3818 170.87 17.3818Z" fill="white"/>
						<path d="M205.003 29.127L202.182 27.4199C200.414 26.3438 199.152 25.2861 198.397 24.2471C197.655 23.1956 197.284 21.9896 197.284 20.6289C197.284 18.5879 197.989 16.9303 199.399 15.6562C200.822 14.3822 202.665 13.7451 204.929 13.7451C207.093 13.7451 209.079 14.3512 210.885 15.5635V19.7754C209.017 17.9818 207.007 17.085 204.854 17.085C203.642 17.085 202.646 17.3695 201.867 17.9385C201.088 18.4951 200.698 19.2126 200.698 20.0908C200.698 20.8701 200.983 21.5999 201.552 22.2803C202.121 22.9606 203.042 23.6719 204.316 24.4141L207.155 26.084C210.322 27.9642 211.905 30.3639 211.905 33.2832C211.905 35.3613 211.206 37.0498 209.808 38.3486C208.423 39.6475 206.617 40.2969 204.39 40.2969C201.83 40.2969 199.498 39.5114 197.395 37.9404V33.2275C199.399 35.7633 201.719 37.0312 204.353 37.0312C205.516 37.0312 206.481 36.7096 207.248 36.0664C208.027 35.4108 208.417 34.5944 208.417 33.6172C208.417 32.0339 207.279 30.5371 205.003 29.127Z" fill="white"/>
						<path d="M248.183 29.127L245.363 27.4199C243.594 26.3438 242.332 25.2861 241.578 24.2471C240.836 23.1956 240.464 21.9896 240.464 20.6289C240.464 18.5879 241.17 16.9303 242.58 15.6562C244.002 14.3822 245.845 13.7451 248.109 13.7451C250.274 13.7451 252.259 14.3512 254.065 15.5635V19.7754C252.197 17.9818 250.187 17.085 248.035 17.085C246.823 17.085 245.827 17.3695 245.047 17.9385C244.268 18.4951 243.879 19.2126 243.879 20.0908C243.879 20.8701 244.163 21.5999 244.732 22.2803C245.301 22.9606 246.223 23.6719 247.497 24.4141L250.336 26.084C253.502 27.9642 255.086 30.3639 255.086 33.2832C255.086 35.3613 254.387 37.0498 252.989 38.3486C251.603 39.6475 249.797 40.2969 247.571 40.2969C245.01 40.2969 242.679 39.5114 240.576 37.9404V33.2275C242.58 35.7633 244.899 37.0312 247.534 37.0312C248.697 37.0312 249.661 36.7096 250.428 36.0664C251.208 35.4108 251.597 34.5944 251.597 33.6172C251.597 32.0339 250.459 30.5371 248.183 29.127Z" fill="white"/>
						<path d="M279.106 36.0107V39.3506C277.412 39.9814 275.754 40.2969 274.134 40.2969C271.462 40.2969 269.328 39.5052 267.732 37.9219C266.149 36.3385 265.357 34.2171 265.357 31.5576C265.357 28.8734 266.131 26.7087 267.677 25.0635C269.223 23.4183 271.258 22.5957 273.781 22.5957C274.66 22.5957 275.445 22.6823 276.138 22.8555C276.843 23.0163 277.709 23.3255 278.735 23.7832V27.3828C277.028 26.2943 275.445 25.75 273.985 25.75C272.464 25.75 271.215 26.2881 270.237 27.3643C269.26 28.4281 268.771 29.7887 268.771 31.4463C268.771 33.1904 269.297 34.5758 270.349 35.6025C271.412 36.6292 272.841 37.1426 274.635 37.1426C275.934 37.1426 277.424 36.7653 279.106 36.0107Z" fill="white"/>
						<path d="M290.492 14.0791H293.869V25.1748C295.279 23.4554 297.029 22.5957 299.12 22.5957C300.258 22.5957 301.278 22.8802 302.181 23.4492C303.084 24.0182 303.752 24.8037 304.185 25.8057C304.63 26.8076 304.853 28.2982 304.853 30.2773V40H301.476V29.4424C301.476 28.193 301.167 27.1911 300.548 26.4365C299.942 25.6696 299.138 25.2861 298.136 25.2861C297.394 25.2861 296.695 25.4779 296.039 25.8613C295.384 26.2448 294.66 26.8818 293.869 27.7725V40H290.492V14.0791Z" fill="white"/>
						<path d="M325.33 22.8926C327.928 22.8926 330.086 23.7337 331.805 25.416C333.525 27.0859 334.385 29.1888 334.385 31.7246C334.385 34.1862 333.513 36.2334 331.768 37.8662C330.024 39.4867 327.829 40.2969 325.181 40.2969C322.621 40.2969 320.481 39.4743 318.762 37.8291C317.042 36.1715 316.182 34.1058 316.182 31.6318C316.182 29.1331 317.048 27.055 318.78 25.3975C320.524 23.7275 322.707 22.8926 325.33 22.8926ZM325.144 25.9355C323.524 25.9355 322.194 26.4674 321.155 27.5312C320.116 28.5951 319.596 29.9495 319.596 31.5947C319.596 33.2275 320.128 34.5635 321.192 35.6025C322.256 36.6292 323.623 37.1426 325.293 37.1426C326.95 37.1426 328.305 36.623 329.356 35.584C330.42 34.5326 330.952 33.1904 330.952 31.5576C330.952 29.9372 330.402 28.5951 329.301 27.5312C328.2 26.4674 326.814 25.9355 325.144 25.9355Z" fill="white"/>
						<path d="M353.897 22.8926C356.494 22.8926 358.653 23.7337 360.372 25.416C362.092 27.0859 362.951 29.1888 362.951 31.7246C362.951 34.1862 362.079 36.2334 360.335 37.8662C358.591 39.4867 356.395 40.2969 353.748 40.2969C351.188 40.2969 349.048 39.4743 347.328 37.8291C345.609 36.1715 344.749 34.1058 344.749 31.6318C344.749 29.1331 345.615 27.055 347.347 25.3975C349.091 23.7275 351.274 22.8926 353.897 22.8926ZM353.711 25.9355C352.091 25.9355 350.761 26.4674 349.722 27.5312C348.683 28.5951 348.163 29.9495 348.163 31.5947C348.163 33.2275 348.695 34.5635 349.759 35.6025C350.823 36.6292 352.19 37.1426 353.86 37.1426C355.517 37.1426 356.872 36.623 357.923 35.584C358.987 34.5326 359.519 33.1904 359.519 31.5576C359.519 29.9372 358.968 28.5951 357.867 27.5312C356.766 26.4674 355.381 25.9355 353.711 25.9355Z" fill="white"/>
						<path d="M374.374 14.0791H377.751V40H374.374V14.0791Z" fill="white"/>
					</svg></Link>

					<div className='weather_parent'>
					<svg className='weather_monstr' width="50" height="47" viewBox="0 0 50 47" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_71_1472)">
<path d="M42.5458 15.8227C42.175 9.01871 36.2313 3.66096 29.1458 4.26305C26.8813 1.65259 23.5354 0 19.7917 0C13.1833 0 7.80417 5.14302 7.45417 11.6123C3.21875 12.3681 0 16.0438 0 20.4668C0 25.4393 4.06042 29.4729 9.07083 29.4729H11.8333C13.4396 31.995 16.2583 33.6833 19.4875 33.6833H40.9271C45.9396 33.6833 50 29.6498 50 24.6773C50 20.2542 46.7813 16.5785 42.5458 15.8227ZM10.4729 25.2625H9.07083C6.36875 25.2625 4.16667 23.1131 4.16667 20.4668C4.16667 16.008 8.55 14.9996 11.4333 15.1764C11.3292 12.3239 11.7188 4.21042 19.7917 4.21042C21.8063 4.21042 23.3625 4.73672 24.5625 5.56828C20.7646 7.50717 18.1125 11.3471 17.8708 15.8227C13.6583 16.5743 10.1688 20.3005 10.4729 25.2625ZM40.9271 29.4729H19.4875C16.7854 29.4729 14.5833 27.3235 14.5833 24.6773C14.5833 20.2184 18.9667 19.21 21.85 19.3869C21.7458 16.5343 22.1354 8.42083 30.2083 8.42083C38.0646 8.42083 39.0187 16.3596 38.5667 19.3869C41.7104 19.1658 45.8333 20.3068 45.8333 24.6773C45.8333 27.3235 43.6313 29.4729 40.9271 29.4729ZM11.1542 44.0683L14.4667 40.7211L15.9375 42.2094L12.625 45.5567L11.1542 44.0683ZM20.975 45.5399L24.2875 42.1905L22.8146 40.7021L19.5021 44.0515L20.975 45.5399ZM15.9375 39.2327L17.4104 40.7211L20.8167 37.2769L19.3438 35.7885L15.9375 39.2327ZM9.67917 45.5567L6.25 49.0198L7.72292 50.5082L11.1521 47.043L9.67917 45.5567ZM29.3146 45.5799L32.6292 42.2305L31.1563 40.7421L27.8417 44.0915L29.3146 45.5799ZM18.0292 45.5399L14.5833 49.0198L16.0562 50.5082L19.5021 47.0283L18.0292 45.5399ZM32.6292 39.2537L34.1021 40.7421L37.5167 37.2917L36.0438 35.8033L32.6292 39.2537ZM26.3708 45.5799L22.9479 49.0366L24.4229 50.525L27.8438 47.0683L26.3708 45.5799Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_71_1472">
<rect width="50" height="47" fill="white"/>
</clipPath>
</defs>
</svg>
					<span className='weather_number'>{Number(weather).toFixed() - 273}</span>
					<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.19239 7C6.74763 7 7.20009 7.449 7.20009 8C7.20009 8.551 6.74763 9 6.19239 9C5.63716 9 5.1847 8.551 5.1847 8C5.1847 7.449 5.63716 7 6.19239 7ZM6.19239 6C5.07889 6 4.17701 6.895 4.17701 8C4.17701 9.105 5.07889 10 6.19239 10C7.30589 10 8.20778 9.105 8.20778 8C8.20778 6.895 7.30589 6 6.19239 6ZM18.2686 13.949C18.1769 15.206 17.7093 16.195 16.8659 16.917C16.0234 17.639 14.912 18 13.5314 18C12.0229 18 10.8358 17.496 9.97124 16.488C9.10664 15.48 8.67434 14.096 8.67434 12.337V11.623C8.67434 10.5 8.87386 9.511 9.2719 8.655C9.67095 7.8 10.2403 7.143 10.982 6.686C11.7226 6.229 12.5832 6 13.5637 6C14.922 6 16.0154 6.361 16.8457 7.083C17.6761 7.805 18.1547 8.818 18.2847 10.123H15.8602C15.8007 9.369 15.5891 8.822 15.2253 8.483C14.8616 8.143 14.3083 7.974 13.5647 7.974C12.7565 7.974 12.1519 8.262 11.7498 8.836C11.3488 9.411 11.1422 10.303 11.1311 11.511V12.393C11.1311 13.655 11.3236 14.578 11.7085 15.16C12.0934 15.743 12.7011 16.034 13.5314 16.034C14.2801 16.034 14.8394 15.864 15.2082 15.525C15.577 15.185 15.7886 14.66 15.8431 13.949H18.2686ZM12.2385 2C17.795 2 22.3155 6.486 22.3155 12C22.3155 17.514 17.795 22 12.2385 22C6.68213 22 2.16162 17.514 2.16162 12C2.16162 6.486 6.68213 2 12.2385 2ZM12.2385 0C5.56057 0 0.14624 5.373 0.14624 12C0.14624 18.627 5.56057 24 12.2385 24C18.9165 24 24.3309 18.627 24.3309 12C24.3309 5.373 18.9165 0 12.2385 0Z" fill="white"/>
</svg>
					<span className='weather_date'>{`${day}/${month}/${year}`}</span>

					</div>
                    <div className='weather'>
					<svg className='weather_monstr' width="50" height="47" viewBox="0 0 50 47" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_71_1472)">
<path d="M42.5458 15.8227C42.175 9.01871 36.2313 3.66096 29.1458 4.26305C26.8813 1.65259 23.5354 0 19.7917 0C13.1833 0 7.80417 5.14302 7.45417 11.6123C3.21875 12.3681 0 16.0438 0 20.4668C0 25.4393 4.06042 29.4729 9.07083 29.4729H11.8333C13.4396 31.995 16.2583 33.6833 19.4875 33.6833H40.9271C45.9396 33.6833 50 29.6498 50 24.6773C50 20.2542 46.7813 16.5785 42.5458 15.8227ZM10.4729 25.2625H9.07083C6.36875 25.2625 4.16667 23.1131 4.16667 20.4668C4.16667 16.008 8.55 14.9996 11.4333 15.1764C11.3292 12.3239 11.7188 4.21042 19.7917 4.21042C21.8063 4.21042 23.3625 4.73672 24.5625 5.56828C20.7646 7.50717 18.1125 11.3471 17.8708 15.8227C13.6583 16.5743 10.1688 20.3005 10.4729 25.2625ZM40.9271 29.4729H19.4875C16.7854 29.4729 14.5833 27.3235 14.5833 24.6773C14.5833 20.2184 18.9667 19.21 21.85 19.3869C21.7458 16.5343 22.1354 8.42083 30.2083 8.42083C38.0646 8.42083 39.0187 16.3596 38.5667 19.3869C41.7104 19.1658 45.8333 20.3068 45.8333 24.6773C45.8333 27.3235 43.6313 29.4729 40.9271 29.4729ZM11.1542 44.0683L14.4667 40.7211L15.9375 42.2094L12.625 45.5567L11.1542 44.0683ZM20.975 45.5399L24.2875 42.1905L22.8146 40.7021L19.5021 44.0515L20.975 45.5399ZM15.9375 39.2327L17.4104 40.7211L20.8167 37.2769L19.3438 35.7885L15.9375 39.2327ZM9.67917 45.5567L6.25 49.0198L7.72292 50.5082L11.1521 47.043L9.67917 45.5567ZM29.3146 45.5799L32.6292 42.2305L31.1563 40.7421L27.8417 44.0915L29.3146 45.5799ZM18.0292 45.5399L14.5833 49.0198L16.0562 50.5082L19.5021 47.0283L18.0292 45.5399ZM32.6292 39.2537L34.1021 40.7421L37.5167 37.2917L36.0438 35.8033L32.6292 39.2537ZM26.3708 45.5799L22.9479 49.0366L24.4229 50.525L27.8438 47.0683L26.3708 45.5799Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_71_1472">
<rect width="50" height="47" fill="white"/>
</clipPath>
</defs>
</svg>
					<span className='weather_number'>{Number(weather).toFixed() - 273}</span>
					<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.19239 7C6.74763 7 7.20009 7.449 7.20009 8C7.20009 8.551 6.74763 9 6.19239 9C5.63716 9 5.1847 8.551 5.1847 8C5.1847 7.449 5.63716 7 6.19239 7ZM6.19239 6C5.07889 6 4.17701 6.895 4.17701 8C4.17701 9.105 5.07889 10 6.19239 10C7.30589 10 8.20778 9.105 8.20778 8C8.20778 6.895 7.30589 6 6.19239 6ZM18.2686 13.949C18.1769 15.206 17.7093 16.195 16.8659 16.917C16.0234 17.639 14.912 18 13.5314 18C12.0229 18 10.8358 17.496 9.97124 16.488C9.10664 15.48 8.67434 14.096 8.67434 12.337V11.623C8.67434 10.5 8.87386 9.511 9.2719 8.655C9.67095 7.8 10.2403 7.143 10.982 6.686C11.7226 6.229 12.5832 6 13.5637 6C14.922 6 16.0154 6.361 16.8457 7.083C17.6761 7.805 18.1547 8.818 18.2847 10.123H15.8602C15.8007 9.369 15.5891 8.822 15.2253 8.483C14.8616 8.143 14.3083 7.974 13.5647 7.974C12.7565 7.974 12.1519 8.262 11.7498 8.836C11.3488 9.411 11.1422 10.303 11.1311 11.511V12.393C11.1311 13.655 11.3236 14.578 11.7085 15.16C12.0934 15.743 12.7011 16.034 13.5314 16.034C14.2801 16.034 14.8394 15.864 15.2082 15.525C15.577 15.185 15.7886 14.66 15.8431 13.949H18.2686ZM12.2385 2C17.795 2 22.3155 6.486 22.3155 12C22.3155 17.514 17.795 22 12.2385 22C6.68213 22 2.16162 17.514 2.16162 12C2.16162 6.486 6.68213 2 12.2385 2ZM12.2385 0C5.56057 0 0.14624 5.373 0.14624 12C0.14624 18.627 5.56057 24 12.2385 24C18.9165 24 24.3309 18.627 24.3309 12C24.3309 5.373 18.9165 0 12.2385 0Z" fill="white"/>
</svg>
					<span className='weather_date'>{`${day}/${month}/${year}`}</span>

					</div>

					<div className='langTheme'>

						<div>
                        <button className='avatar_dashboard' style={{borderColor: theme}}>
                            <img className='avatarImg' style={{objectFit: "cover"}} src={profil?.main_image} alt='Avatar' width='55' height='55'/>
						</button>

                        <select onChange={OnParentChange} className='select'>
                            {parent?.map((item) => (
                                <option key={item?.id} value={item?.id}>
                                    <h4>{item?.full_name}</h4>
                                </option>
                            ))}
                        </select>
                        </div>

                        <div>
                        <button className='theme_dashboard dashboard_button' onClick={changeTheme}>
							<svg className='theme-dash dashboard_icon theme_parent' width="55" height="55" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
								<circle cx="27.5" cy="27.5" r="27.5" fill="#ffbe98"/>
								<path d="M18.5838 39.0163C23.8397 39.4518 21.9571 33.8681 26.82 33.8165L28.9261 35.5743C29.4509 41.9199 21.6901 43.335 18.5838 39.0163ZM34.6999 30.8637C36.335 28.2982 41.3996 19.693 41.3996 19.693C41.8029 18.9792 40.9069 18.2344 40.2813 18.7614C40.2813 18.7614 32.7509 25.3087 30.5291 27.3838C28.7737 29.0247 28.7657 29.774 28.1973 32.4794L30.1223 34.0835C32.6741 33.0351 33.4086 32.893 34.6999 30.8637ZM20.9511 35.305C21.7142 34.0056 22.954 31.8938 26.0466 31.5673C26.5439 29.1759 26.7421 27.786 28.965 25.7098C30.5383 24.2408 34.6232 20.6578 37.0099 18.5724C35.8641 16.0424 32.265 13.9627 27.6393 14.0005C20.0493 14.0635 13.9397 20.2625 14.0004 27.8559C14.0268 31.1914 15.2391 34.2394 17.2317 36.6044C19.0857 37.0959 19.9542 37.0031 20.9511 35.305ZM28.9169 17.1607C30.1796 17.1538 31.2143 18.1702 31.2269 19.4329C31.2315 20.6968 30.2163 21.7349 28.9513 21.7429C27.6851 21.7532 26.6504 20.7346 26.6436 19.4696C26.6287 18.2023 27.6473 17.171 28.9169 17.1607ZM22.0453 19.4535C23.3081 19.4421 24.3462 20.4584 24.3508 21.7257C24.3645 22.993 23.3424 24.0231 22.082 24.0357C20.8147 24.0437 19.78 23.0262 19.772 21.7578C19.7617 20.4939 20.7769 19.4615 22.0453 19.4535ZM19.7502 26.3262C21.0175 26.3182 22.0534 27.3369 22.0602 28.6007C22.0717 29.8657 21.0519 30.9016 19.7846 30.9096C18.5185 30.9187 17.4872 29.9012 17.4803 28.6351C17.4677 27.3689 18.4875 26.3388 19.7502 26.3262ZM31.2441 36.1025C31.2682 38.668 30.2335 40.3627 29.3168 41.3584L29.2641 41.4088C35.2854 40.7317 39.6476 36.4772 36.4439 32.3694C34.8707 34.7149 33.5403 35.1675 31.2441 36.1025Z" fill="white"/>
							</svg>
						</button>

                        <button className='header_icon' onClick={handleModal}>
                    <svg className='notification_parent header_icon' width="57" height="57" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="30" cy="30" r="30" fill="#ffbe98"/>
  <g clip-path="url(#clip0_147_1132)">
  <path d="M35.2069 19.5027C34.4019 19.0352 33.9044 18.1652 33.9069 17.2277V17.2239C33.9069 15.7589 32.7331 14.5714 31.2856 14.5714C29.8381 14.5714 28.6644 15.7589 28.6644 17.2239V17.2277C28.6669 18.1664 28.1694 19.0352 27.3644 19.5027C21.5294 22.8927 24.8819 34.1464 18.7856 36.1352V38.3214H43.7856V36.1352C37.6894 34.1464 41.0419 22.8927 35.2069 19.5027ZM31.2856 15.8214C31.9756 15.8214 32.5356 16.3827 32.5356 17.0714C32.5356 17.7614 31.9756 18.3214 31.2856 18.3214C30.5956 18.3214 30.0356 17.7614 30.0356 17.0714C30.0356 16.3827 30.5956 15.8214 31.2856 15.8214ZM35.0356 40.8214C35.0356 42.8189 33.2956 44.5714 31.3219 44.5714C29.3481 44.5714 27.5356 42.8189 27.5356 40.8214H35.0356ZM41.3044 25.1702C40.9969 23.2902 40.1381 20.5677 37.7831 18.2764L39.5281 16.4839C41.7781 18.6739 43.2456 21.5389 43.7719 24.7664L41.3044 25.1702ZM18.7856 24.7677C19.3119 21.5389 20.7794 18.6752 23.0294 16.4839L24.7744 18.2764C22.4194 20.5677 21.5594 23.2902 21.2531 25.1702L18.7856 24.7677Z" fill="white"/>
  </g>
  <defs>
  <clipPath id="clip0_147_1132">
  <rect width="30" height="30" fill="white" transform="translate(16.2856 14.5714)"/>
  </clipPath>
  </defs>
                    </svg>
                    <span className='sms_count' style={notificationCount ? {display: 'block'} : {display: 'none'}}>{notificationCount}</span>
                  </button>

                  <Link className='header_icon parent_dom' to='/'>
                  <svg className='domIcons' width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="25" cy="25" r="25" fill="#ffbe98"/>
<path d="M33 20.093L30 17.093V15H33V20.093ZM37 26H34V36H16V26H13L25 14L37 26ZM27 28H23V34H27V28Z" fill="white"/>
</svg>
                  </Link>
                        </div>
					</div>

				</div>

                <div className='avatar'>
                    <div className='avatar_inner'>
                        <div className='avatar_about'>
                            <p className='avatar_name'>
                                <span>{profil?.full_name}</span> <br/>
                                <span className='avatar_time'>Класс: {profil?.pupil_class}</span>
                            </p>

                            <p className='avatar_name'>Пришел:
                                <span className='avatar_time'>{formattedTime7 === 'Invalid Date' ? "--:--" : formattedTime7}</span>
                            </p>

                            <p className='avatar_name'>Ушел:
                                <span className='avatar_time'>{formattedTime7week === formattedTime7 ? "--:--" : formattedTime7week}</span>
                            </p>
                        </div>

                        <div className='column'>
                            <h4>Эмоции за неделю</h4>
			                <div className='column_inner'>

                    <BarChart
    xAxis={[
        {
        scaleType: 'band',
        data: reversedDates.flatMap((date) => [
            date
          ]),
        },              
    ]}
    series={[
        { data: [isNaN(happy5) ? 0 : happy5,isNaN(happy4) ? 0 : happy4,isNaN(happy3) ? 0 : happy3,isNaN(happy2) ? 0 : happy2,isNaN(happy1) ? 0 : happy1,isNaN(happy0) ? 0 : happy0], color: '#ffa500', label: '   Веселье' },
        { data: [isNaN(neutral5) ? 0 : neutral5,isNaN(neutral4) ? 0 : neutral4,isNaN(neutral3) ? 0 : neutral3,isNaN(neutral2) ? 0 : neutral2,isNaN(neutral1) ? 0 : neutral1,isNaN(neutral0) ? 0 : neutral0], color: '#81B37A', label: "Нейтраль"  },
        { data: [isNaN(sad5) ? 0 : sad5,isNaN(sad4) ? 0 : sad4,isNaN(sad3) ? 0 : sad3,isNaN(sad2) ? 0 : sad2,isNaN(sad1) ? 0 : sad1,isNaN(sad0) ? 0 : sad0], color: '#c0c0c0', label: "Грусть"  },
        { data: [isNaN(angry5) ? 0 : angry5,isNaN(angry4) ? 0 : angry4,isNaN(angry3) ? 0 : angry3,isNaN(angry2) ? 0 : angry2,isNaN(angry1) ? 0 : angry1,isNaN(angry0) ? 0 : angry0], color: '#FDB193', label: "Злость"  }

    ]}
    width={800}
    height={300}
    />
                </div>
		</div>

                        <div className='emotion_week'>
                            <h3 className='week_heading'>Посещаемость за неделю</h3>

                            <ul className='week_list'>
                                <li className='week_item'>
                                    <p>{weekday2}</p>
                                    <img className='weekImg_come' style={theme === '#81B37A' ? {borderColor: '#ffffff'} : {borderColor: '#ffbe98'}} src={week2?.first?.thumbnail}/>
                                    <span className='weekItem_time'>{formattedTime2 === 'Invalid Date' ? '--:--' : formattedTime2}</span>
                                    <span className='days'>{date2}</span>
                                    <img className='weekImg_leave' style={theme === '#81B37A' ? {borderColor: '#85D77A'} : {borderColor: '#ffbe98'}} src={week2?.last?.thumbnail}/>
                                    <span className='weekItem_time'>{formattedTime2week === formattedTime2 ? '--:--' : formattedTime2week}</span>
                                </li>

                                <li className='week_item'>
                                <p>{weekday3}</p>
                                    <img className='weekImg_come' style={theme === '#81B37A' ? {borderColor: '#ffffff'} : {borderColor: '#ffbe98'}} src={week3?.first?.thumbnail}/>
                                    <span className='weekItem_time'>{formattedTime3 === 'Invalid Date' ? '--:--' : formattedTime3}</span>
                                    <span className='days'>{date3}</span>
                                    <img className='weekImg_leave' style={theme === '#81B37A' ? {borderColor: '#85D77A'} : {borderColor: '#ffbe98'}} src={week3?.last?.thumbnail}/>
                                    <span className='weekItem_time'>{formattedTime3week === formattedTime3 ? '--:--' : formattedTime3week}</span>
                                </li>

                                <li className='week_item'>
                                <p>{weekday4}</p>

                                    <img className='weekImg_come' style={theme === '#81B37A' ? {borderColor: '#ffffff'} : {borderColor: '#ffbe98'}} src={week4?.first?.thumbnail}/>
                                    <span className='weekItem_time'>{formattedTime4 === 'Invalid Date' ? '--:--' : formattedTime4}</span>
                                    <span className='days'>{date4}</span>
                                    <img className='weekImg_leave' style={theme === '#81B37A' ? {borderColor: '#85D77A'} : {borderColor: '#ffbe98'}} src={week4?.last?.thumbnail}/>
                                    <span className='weekItem_time'>{formattedTime4week === formattedTime4 ? '--:--' : formattedTime4week}</span>
                                </li>

                                <li className='week_item'>
                                <p>{weekday5}</p>

                                    <img className='weekImg_come' style={theme === '#81B37A' ? {borderColor: '#ffffff'} : {borderColor: '#ffbe98'}} src={week5?.first?.thumbnail}/>
                                    <span className='weekItem_time'>{formattedTime5 === 'Invalid Date' ? '--:--' : formattedTime5}</span>
                                    <span className='days'>{date5}</span>
                                    <img className='weekImg_leave' style={theme === '#81B37A' ? {borderColor: '#85D77A'} : {borderColor: '#ffbe98'}} src={week5?.last?.thumbnail}/>
                                    <span className='weekItem_time'>{formattedTime5week === formattedTime5 ? '--:--' : formattedTime5week}</span>
                                </li>

                                <li className='week_item'>
                                <p>{weekday6}</p>

                                    <img className='weekImg_come' style={theme === '#81B37A' ? {borderColor: '#ffffff'} : {borderColor: '#ffbe98'}} src={week6?.first?.thumbnail}/>
                                    <span className='weekItem_time'>{formattedTime6 === 'Invalid Date' ? '--:--' : formattedTime6}</span>
                                    <span className='days'>{date6}</span>
                                    <img className='weekImg_leave' style={theme === '#81B37A' ? {borderColor: '#85D77A'} : {borderColor: '#ffbe98'}} src={week6?.last?.thumbnail}/>
                                    <span className='weekItem_time'>{formattedTime6week === formattedTime6 ? '--:--' : formattedTime6week}</span>
                                </li>

                                <li className='week_item'>
                                <p>{weekday7}</p>

                                    <img className='weekImg_come' style={theme === '#81B37A' ? {borderColor: '#ffffff'} : {borderColor: '#ffbe98'}} src={week7?.first?.thumbnail}/>
                                    <span className='weekItem_time'>{formattedTime7 === 'Invalid Date' ? '--:--' : formattedTime7}</span>
                                    <span className='days'>{date7}</span>
                                    <img className='weekImg_leave' style={theme === '#81B37A' ? {borderColor: '#85D77A'} : {borderColor: '#ffbe98'}} src={week7?.last?.thumbnail}/>
                                    <span className='weekItem_time'>{formattedTime7week === formattedTime7 ? '--:--' : formattedTime7week}</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className='avatar_chat'>
                        <div className='avatar_chartInner'>
                            <div className='chart_about'>
                                <p className='charts_text'>
                                    <span className='chart_percentage chart_percentage1'>{piHappy ? piHappy : 0}%</span>
                                    <span className='chart_name'>Веселье</span>
                                </p>
                                <p className='charts_text'>
                                    <span className='chart_percentage chart_percentage2'>{piNeutral ? piNeutral : 0}%</span>
                                    <span className='chart_name'>Нейтраль</span>
                                </p>
                                <p className='charts_text'>
                                    <span className='chart_percentage chart_percentage3'>{piSad ? piSad : 0}%</span>
                                    <span className='chart_name'>Грусть</span>
                                </p>
                                <p className='charts_text'>
                                    <span className='chart_percentage chart_percentage4'>{piAngry ? piAngry : 0 }%</span>
                                    <span className='chart_name'>Злость</span>
                                </p>
                            </div>

                            <div className='chart'>
                            <CanvasJSChart options = {pupils}
							/>
                            </div>
                        </div>


                        <div className='chat'>
                            <div className='chat_content'>
                                <h3 className='chat_heading' style={theme === '#81B37A' ? {backgroundColor: '#E4F0E2'} : {backgroundColor: '#F5EFEF'}}>Чат с учителями</h3>

                                <ul className='chat_list' style={theme === '#81B37A' ? {backgroundColor: '#E4F0E2'} : {backgroundColor: '#F5EFEF'}}>
                                    <li className='chat_item' style={{borderColor: theme}}>
                                        <Link className='chat_link'>
                                        <p className='chat_about'>
                                            <span className='chat_name'>Димитрий Тамаеев:</span>
                                            <span className='chat_position'>учитель труда</span>
                                        </p>

                                        <img className='chat_avatarImg' style={{objectFit: "cover"}} src={Avatar} alt='Avatar' width="40" height="40"/>
                                        <span className='chat_count' style={{backgroundColor: theme}}>2</span></Link>
                                    </li>
                                    
                                    <li className='chat_item' style={{borderColor: theme}}>
                                        <Link className='chat_link'>
                                        <p className='chat_about'>
                                            <span className='chat_name'>Димитрий Тамаеев:</span>
                                            <span className='chat_position'>учитель труда</span>
                                        </p>

                                        <img className='chat_avatarImg' style={{objectFit: "cover"}} src={Avatar} alt='Avatar' width="40" height="40"/>
                                        <span className='chat_count' style={{backgroundColor: theme}}>2</span></Link>
                                    </li>

                                    <li className='chat_item' style={{borderColor: theme}}>
                                        <Link className='chat_link'>
                                        <p className='chat_about'>
                                            <span className='chat_name'>Димитрий Тамаеев:</span>
                                            <span className='chat_position'>учитель труда</span>
                                        </p>

                                        <img className='chat_avatarImg' style={{objectFit: "cover"}} src={Avatar} alt='Avatar' width="40" height="40"/>
                                        <span className='chat_count' style={{backgroundColor: theme}}>2</span></Link>
                                    </li>
                                    
                                </ul>
                                <Notification modal={modal} setModal={setModal}/>
                            </div>
                        </div>
                    </div>
                </div>

			</div>
		</div>
	);
}

export default Parents; 