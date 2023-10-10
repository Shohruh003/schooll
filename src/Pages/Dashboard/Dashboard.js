import React, { useState, useEffect } from 'react';
// const CanvasJS = CanvasJSReact.CanvasJS;
import CanvasJSReact from '@canvasjs/react-charts';
import './dashboard.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ThemeHooks } from '../../Hooks/ThemeHook';
import { DecodeHooks } from '../../Hooks/DecodeHook';
import LateComersTeacher from '../../Modal/AttendanceModal/LateComersTeacher';
import LateComersPupil from '../../Modal/AttendanceModal/LateComersPupil';
import MissingPupil from '../../Modal/AttendanceModal/MissingPupil';
import MissingTeacher from '../../Modal/AttendanceModal/MissingTeacher';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
function Dashboard () {
	const [teacherCount, setTeacherCount] = useState()
	const [teacherEmotion, setTeacherEmotion] = useState()

	const [pupilCount, setPupilCount] = useState()
	const [pupilEmotion, setPupilEmotion] = useState()
	const {theme, setTheme} = ThemeHooks()
const {decode} = DecodeHooks()
		const [position, setPosition] = useState()
		const [lateComersTeacher, setLateComersTeacher] = useState(false)
		const [missingTeacher, setMissingTeacher] = useState(false)
		const [missingPupil, setMissingPupil] = useState(false)
		const [lateComersPupil, setLateComersPupil] = useState(false)

	const logOut = () => {
		localStorage.clear()
		window.location.reload()
	}

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
		setTheme('#FC6C85');
	};

	const applyTheme = () => {
		const body = document.body;
		const texts = document.querySelectorAll('p');
		const header = document.querySelector('.header_dashboard')
		const adminLink = document.querySelector('.admin_link')
		const canvas = document.querySelectorAll('.canvas');
		const dashboardIcons = document.querySelectorAll('.dashboard_icon circle')

		if (theme === '#FC6C85') {
			body.style.backgroundColor = '#F5EFEF';
			texts.forEach((e) => {
				e.style.color = '#FC6C85';
			})
			header.style.borderColor = '#FC6C85'
			dashboardIcons.forEach((e) => {
				e.setAttribute('fill', '#F9A298')

				e.addEventListener('mouseover', () => {
					e.setAttribute('fill', '#FC6C85')
				});
				e.addEventListener('mouseout', () => {
					e.setAttribute('fill', '#F9A298')
				});
			})
			adminLink.style.backgroundColor = '#FA8072';
			adminLink.addEventListener('mouseover', () => {
				adminLink.style.backgroundColor = 'rgba(250, 128, 114, 0.5)';
			});
			adminLink.addEventListener('mouseout', () => {
				adminLink.style.backgroundColor = '#FA8072';
			});
			canvas.forEach((e) => {
				e.style.borderColor = '#FC6C85';
			})
		} else if (theme === '#81B37A') {
			body.style.backgroundColor = 'rgba(133, 215, 122, 0.15)';
			texts.forEach((e) => {
				e.style.color = '#81B37A';
			})
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
			adminLink.style.backgroundColor = '#81B37A';
			adminLink.addEventListener('mouseover', () => {
				adminLink.style.backgroundColor = 'rgba(129, 179, 122, 0.5)';
			});
			adminLink.addEventListener('mouseout', () => {
				adminLink.style.backgroundColor = '#81B37A';
			});
			canvas.forEach((e) => {
				e.style.borderColor = '#81B37A';
			})
		}
	};


	const changeTheme = () => {
		const newTheme = theme === '#FC6C85' ? '#81B37A' : '#FC6C85';
		setTheme(newTheme);
		localStorage.setItem('theme', newTheme);
	};

	useEffect(() => {
		const fetchPupils = async () => {
			try {
				const response = await axios.get('https://www.api.yomon-emas.uz/api/users/all_pupils_emotion/pie_chart/');
				setTeacherEmotion(response.data.all_teachers)
				setPupilEmotion(response.data.all_pupils)
			} catch (error) {
				console.error(error);
			}
		};

		fetchPupils();
	}, []);
const neutralTeacher = teacherEmotion?.neutral?.count
		const happyTeacher = teacherEmotion?.happy?.count
		const sadTeacher = teacherEmotion?.sad?.count
		const angryTeacher = teacherEmotion?.angry?.count


	const options = {
		animationEnabled: true,
		subtitles: [{
						verticalAlign: "center",
			color: '#8F00FF',
			fontSize: 24,
			dockInsidePlotArea: true,
		}],
		width: 500,
		height: 350,
		data: [{
			type: "doughnut",
			showInLegend: true,
			toolTipContent: "<b>{name}</b>: (#percent%)",
			indexLabel: "{name} - #percent%",
			yValueFormatString: "#,###'%'",
			dataPoints: [
				{ y: sadTeacher, color: "#FC6C85", name: "Злость" },
				{ y: angryTeacher, color: "#ffffff", name: "Грусть" },
				{ y: neutralTeacher, color: "#FCEFED", name: "Нейтраль" },
				{ y: happyTeacher, color: "#F9A79D", name: "Веселье"}
			]
		}],
		backgroundColor: "transparent"
	}

		const neutralPupils = pupilEmotion?.neutral?.count
		const happyPupils = pupilEmotion?.happy?.count
		const sadPupils = pupilEmotion?.sad?.count
		const angryPupils = pupilEmotion?.angry?.count

	const pupils = {
		animationEnabled: true,
		subtitles: [{
						verticalAlign: "center",
			fontSize: 24,
			dockInsidePlotArea: true,
		}],
		width: 500,
		height: 350,
		data: [{
			type: "doughnut",
			showInLegend: true,
			toolTipContent: "<b>{name}</b>: (#percent%)",
			indexLabel: "{name} - #percent%",
			yValueFormatString: "#,###'%'",
			dataPoints: [
				// { y: 400, color: "#FC6C85", name: "Злость" },
				// { y: 100, color: "#ffffff", name: "Грусть" },
				// { y: 200, color: "#FCEFED", name: "Нейтраль" },
				// { y: 300, color: "#F9A79D", name: "Веселье"}
				{ y: sadPupils, color: "#FC6C85", name: "Злость" },
				{ y: angryPupils, color: "#ffffff", name: "Грусть" },
				{ y: neutralPupils, color: "#FCEFED", name: "Нейтраль" },
				{ y: happyPupils, color: "#F9A79D", name: "Веселье"}
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

		
function findLargestSection(options) {
	let largestSectionIndex = 0;
	let largestSectionValue = options.data[0].dataPoints[0].y;
  
	for (let i = 1; i < options.data[0].dataPoints.length; i++) {
	  const sectionValue = options.data[0].dataPoints[i].y;
	  if (sectionValue > largestSectionValue) {
		largestSectionIndex = i;
		largestSectionValue = sectionValue;
	  }
	}
  
	const largestSection = options.data[0].dataPoints[largestSectionIndex];
	const largestSectionPercentage = ((largestSection.y / options.data[0].dataPoints.reduce((sum, dp) => sum + dp.y, 0)) * 100).toFixed(1);
	
	options.subtitles[0].text = `${largestSection.name} ${largestSectionPercentage}%`;
  
	return largestSection.name;
  }
  
  const largestSectionName = findLargestSection(options);

	useEffect(() => {

		const fetchClasses = async () => {
			try {

				const response = await axios.get(`https://www.api.yomon-emas.uz/api/users/users/${decode}/`);
				setPosition(response.data.status)
			} catch (error) {
				console.error(error);
			}
		};

		fetchClasses();
	}, []);

	const LateComersTeachers = () => {
			setLateComersTeacher(true)
		}

		const MissingTeachers = () => {
			setMissingTeacher(true)
		}

		const LateComersPupils = () => {
			setLateComersPupil(true)
		}

		const MissingPupils = () => {
			setMissingPupil(true)
		}
	return (
		<div className="school">
			<div className='container'>

				<div className="header_dashboard">
					<svg className='logo-dashboard' width="467" height="54" viewBox="0 0 467 54" fill="none" xmlns="http://www.w3.org/2000/svg">
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
					</svg>

					<button className='logout' style={{borderRadius: "50px"}} onClick={logOut}>Log Out</button>
					
					<div className='langTheme'>

						<button className='language_dashboard dashboard_button'>
							<svg className='language-dash dashboard_icon' width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
								<circle cx="25" cy="25" r="25" fill="#FA8072"/>
								<g clip-path="url(#clip0_407_223)">
									<path d="M25.6917 21.5115C25.6552 21.4427 26.0479 21.4052 26.1177 21.4052C26.1948 21.4146 25.9135 21.876 25.6917 21.5115ZM23.45 18.3115L23.5625 18.2792C23.6292 18.3365 23.4875 18.3781 23.5094 18.4208C23.599 18.5823 23.5312 18.6792 23.5177 18.7667C23.5031 18.8552 23.4094 18.8167 23.3625 18.8635C23.3073 18.9323 23.6312 18.9417 23.6354 18.9521C23.6469 18.9865 23.2448 19.0448 23.3187 19.1302C23.4187 19.2719 24.1771 18.9271 24.0562 18.9469C24.2906 18.8292 24.0865 18.8167 23.9552 18.749C23.9104 18.525 23.8729 18.1792 23.7333 18.0406L23.825 17.9344C23.6104 17.6229 23.45 18.3115 23.45 18.3115ZM37 25.5C37 32.4031 31.4031 38 24.5 38C17.5958 38 12 32.4031 12 25.5C12 18.5969 17.5958 13 24.5 13C31.4031 13 37 18.5969 37 25.5ZM28.3437 19.9052C28.3375 19.7531 28.1458 19.6094 27.9458 19.8729C27.8052 20.0542 27.8302 20.3302 27.7542 20.4531C27.6458 20.6354 28.3448 20.8062 28.3448 20.6344C28.3708 20.3458 29.1073 20.5687 29.251 20.6083C29.5094 20.6802 29.9208 20.3729 29.4708 20.2115C29.101 20.076 28.9062 19.9312 28.8729 19.6667C28.8729 19.6667 29.0688 19.4833 28.9833 19.4938C28.7563 19.5219 28.3437 20.3125 28.3437 19.9052ZM34.9021 25.5C34.9021 24.4219 34.7177 23.3333 34.5302 22.7583C34.4698 22.5771 34.3333 22.4333 34.1562 22.3646C33.8896 22.2604 32.7635 22.9865 32.5938 22.6292C32.4823 22.3906 32.2562 22.7812 31.9979 22.6375C31.8729 22.5687 31.525 22.101 31.3677 22.1583C31.0458 22.274 31.8615 23.1625 32.0844 23.2792C32.2937 23.1208 32.9719 22.7948 33.1177 23.2396C33.3969 24.0771 32.35 24.9948 31.8146 25.4781C31.0146 26.201 31.1646 25.0104 30.6198 24.5906C30.3333 24.3708 30.3365 23.9031 30.0469 23.7417C29.9177 23.6687 29.325 22.9865 29.3302 22.8948L29.3125 23.0677C29.2146 23.1417 29.0063 22.7885 28.9844 22.7333C28.9844 23.0406 29.4844 23.5302 29.65 23.776C29.9323 24.1979 30.0833 24.8125 30.4292 25.1573C30.6146 25.3427 31.3229 26.1094 31.5073 26.0927C31.7083 26.075 32.3438 25.6156 32.4562 25.6417C33.1271 25.8 30.8771 28.9802 30.6635 29.374C30.4875 29.7042 30.8073 30.5208 30.7812 30.9115C30.751 31.3625 30.3958 31.5083 30.0594 31.7542C29.699 32.0177 29.7833 32.5302 29.4802 32.7177C28.9417 33.049 28.5542 34.1271 27.7896 34.1219C27.5646 34.1208 26.6021 34.4969 26.476 34.1292C26.3781 33.8625 26.2469 33.6604 26.1083 33.3969C25.9729 33.1385 26.0927 32.8708 25.9281 32.6427C25.8146 32.4844 25.4333 32.125 25.399 31.9375C25.3969 31.776 25.5208 31.2854 25.6906 31.2C25.9292 31.0781 25.7365 30.7229 25.7073 30.5167C25.6573 30.1479 25.4292 29.8438 25.1552 29.6302C24.75 29.3188 24.9594 29.0708 25.0542 28.626C25.0542 28.4135 24.925 28.1344 24.6396 28.2177C24.0521 28.3885 24.2302 27.7594 23.8021 27.7875C23.4937 27.8094 23.2417 28.0052 22.9552 28.0917C22.5948 28.2 22.226 28.0062 21.8698 27.9615C20.4042 27.776 19.926 26.101 20.3083 24.8927C20.3469 24.6948 20.1896 24.3281 20.2583 24.175C20.4229 23.8083 20.7583 23.3969 21.0521 23.1187C21.2167 22.9625 21.4281 23.0021 21.6219 22.8802C21.9208 22.6917 21.925 22.3042 22.2177 22.0667C22.6344 21.7281 23.2031 21.7354 23.7469 21.6625C24.0365 21.624 25.1385 21.3854 25.3125 21.6C25.3125 21.6396 25.5115 22.2292 25.2927 22.1958C25.7437 22.2198 26.3865 22.976 26.8146 22.799C27.0344 22.7073 26.9542 22.0323 27.4052 22.3583C27.6781 22.5542 28.901 22.6417 29.1552 22.4302C29.3115 22.301 29.399 21.4615 29.2094 21.3667C29.3302 21.4865 28.5729 21.4958 28.5021 21.4688C28.3771 21.4229 28.2604 21.5875 28.0594 21.4948C28.1802 21.5521 27.3865 21.126 27.8323 20.8C27.6458 20.9365 27.4719 20.7615 27.2708 20.9115C27.1323 21.024 27.3354 21.099 27.1375 21.1969C26.8229 21.3562 26.5854 20.65 26.4667 20.5698C26.3458 20.4906 25.4104 19.8344 25.6646 20.2625L26.4865 21.0802C26.4458 21.1062 26.2708 20.7823 26.2708 21.0187C26.326 20.8781 26.2917 21.6219 26.1625 21.3802C26.1052 21.2875 26.2562 21.2354 26.1687 21.101C26.1687 21.0125 25.9312 20.926 25.8854 20.8656C25.7552 20.7042 25.4094 20.3479 25.2219 20.2625C25.1698 20.2385 24.426 20.3531 24.3635 20.3771C24.2906 20.4792 24.2281 20.5865 24.1771 20.701C24.0229 20.7583 23.8781 20.8323 23.7406 20.924L23.5771 21.2917C23.5062 21.3552 22.7802 21.5948 22.776 21.6042C22.8062 21.526 22.2688 21.426 22.3042 21.2698C22.3438 21.0979 22.526 20.5615 22.4792 20.3656C22.4292 20.1604 23.5979 20.6615 23.6729 20.1208C23.7031 19.8865 23.7208 19.6135 23.3469 19.574C23.4177 19.5823 24.0708 19.3177 24.1792 19.199C24.3313 19.024 24.6802 18.7385 24.9333 18.7385C25.2292 18.7385 25.1656 18.3083 25.3021 18.0979C25.4385 18.1531 25.2292 18.4896 25.3927 18.626C25.3823 18.5187 25.8562 18.6854 25.9021 18.6604C26.0104 18.6042 26.6146 18.6375 26.5208 18.3542C26.4167 18.0656 26.574 18.151 26.7094 18.0906C26.6865 18.1 27.0635 17.4458 27.1281 17.6604C27.0833 17.4396 26.6896 17.7375 26.5521 17.726C26.2344 17.701 26.3687 17.1844 26.4885 17.0333C26.5813 16.9135 26.2354 16.7667 26.2312 16.9958C26.225 17.3385 25.9062 17.649 25.9802 18.1042C26.0927 18.7906 25.2146 17.9385 25.1375 17.9854C24.8458 18.1625 24.6073 17.7625 24.7583 17.5229C24.9125 17.2781 25.2844 17.2896 25.4375 17.0271C25.5458 16.8417 25.6719 16.626 25.8385 16.4854C26.3958 16.0177 26.55 16.3917 27.1052 16.4427C27.6479 16.4927 27.2885 16.5719 27.2135 16.7802C27.1417 16.9781 27.5115 17.049 27.6396 16.8833C27.7125 16.7875 27.8781 16.5469 27.95 16.3687C28.0427 16.1375 28.8885 16.1635 28.2979 15.8104C27.9083 15.5781 26.2104 15.1104 25.0729 15.1104C24.8271 15.1104 24.6552 15.3844 24.4677 15.5396C24.0969 15.8469 23.1469 16.45 22.6187 16.2667C22.0781 16.0802 20.9208 16.9542 20.7354 16.9604C20.6677 16.9646 20.7396 16.3 21.1083 16.251C20.949 16.275 22.4073 15.5146 22.3677 15.3563C22.3198 15.1688 19.4521 16.2125 19.5802 16.4219C19.6417 16.5177 19.8917 16.5177 19.5635 16.7281C19.376 16.8417 19.176 17.5625 19 17.5625C18.474 17.7927 18.4406 17.1094 17.8552 17.9885L16.924 18.3635C15.5406 19.8333 14.5833 21.6948 14.2365 23.7625C14.2229 23.8448 14.5844 23.9979 14.6312 24.0542C14.7479 24.1938 14.7479 24.7958 14.8052 24.9927C14.949 25.4906 15.3042 25.7677 15.576 26.2208C15.7365 26.4906 16.0031 27.1729 15.9188 27.4563C16.0312 27.2708 17.0333 28.3052 17.2167 28.5208C17.6479 29.0281 17.9802 29.6427 17.2802 30.1448C17.0542 30.3073 17.624 31.3208 17.3302 31.5698L16.9542 31.6667C16.5833 31.8948 16.751 32.4542 16.976 32.6896C18.8698 34.6698 21.5385 35.9052 24.4969 35.9052C30.2437 35.9052 34.9021 31.2469 34.9021 25.5ZM22.9156 18.8781C23.0458 18.8208 23.2208 18.8229 23.2396 18.649C23.2552 18.4948 23.2854 18.601 23.3229 18.5448C23.3594 18.4896 23.2531 18.401 23.2083 18.3927C23.1417 18.3781 23.0958 18.4646 23.0531 18.501L22.9781 18.5208L22.9073 18.6115L22.9156 18.6615L22.825 18.7719C22.7365 18.8594 22.8271 18.9167 22.9156 18.8781Z" fill="white"/>
								</g>
								<defs>
									<clipPath id="clip0_407_223">
										<rect width="25" height="25" fill="white" transform="translate(12 13)"/>
									</clipPath>
								</defs>
							</svg>
						</button>

						<button className='theme_dashboard dashboard_button' onClick={changeTheme}>
							<svg className='theme-dash dashboard_icon' width="55" height="55" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
								<circle cx="27.5" cy="27.5" r="27.5" fill="#FA8072"/>
								<path d="M18.5838 39.0163C23.8397 39.4518 21.9571 33.8681 26.82 33.8165L28.9261 35.5743C29.4509 41.9199 21.6901 43.335 18.5838 39.0163ZM34.6999 30.8637C36.335 28.2982 41.3996 19.693 41.3996 19.693C41.8029 18.9792 40.9069 18.2344 40.2813 18.7614C40.2813 18.7614 32.7509 25.3087 30.5291 27.3838C28.7737 29.0247 28.7657 29.774 28.1973 32.4794L30.1223 34.0835C32.6741 33.0351 33.4086 32.893 34.6999 30.8637ZM20.9511 35.305C21.7142 34.0056 22.954 31.8938 26.0466 31.5673C26.5439 29.1759 26.7421 27.786 28.965 25.7098C30.5383 24.2408 34.6232 20.6578 37.0099 18.5724C35.8641 16.0424 32.265 13.9627 27.6393 14.0005C20.0493 14.0635 13.9397 20.2625 14.0004 27.8559C14.0268 31.1914 15.2391 34.2394 17.2317 36.6044C19.0857 37.0959 19.9542 37.0031 20.9511 35.305ZM28.9169 17.1607C30.1796 17.1538 31.2143 18.1702 31.2269 19.4329C31.2315 20.6968 30.2163 21.7349 28.9513 21.7429C27.6851 21.7532 26.6504 20.7346 26.6436 19.4696C26.6287 18.2023 27.6473 17.171 28.9169 17.1607ZM22.0453 19.4535C23.3081 19.4421 24.3462 20.4584 24.3508 21.7257C24.3645 22.993 23.3424 24.0231 22.082 24.0357C20.8147 24.0437 19.78 23.0262 19.772 21.7578C19.7617 20.4939 20.7769 19.4615 22.0453 19.4535ZM19.7502 26.3262C21.0175 26.3182 22.0534 27.3369 22.0602 28.6007C22.0717 29.8657 21.0519 30.9016 19.7846 30.9096C18.5185 30.9187 17.4872 29.9012 17.4803 28.6351C17.4677 27.3689 18.4875 26.3388 19.7502 26.3262ZM31.2441 36.1025C31.2682 38.668 30.2335 40.3627 29.3168 41.3584L29.2641 41.4088C35.2854 40.7317 39.6476 36.4772 36.4439 32.3694C34.8707 34.7149 33.5403 35.1675 31.2441 36.1025Z" fill="white"/>
							</svg>
						</button>

						<Link className='admin_link' to={`${position}/pupil`}>Доска {position === 'teacher' ? 'преподавателей' : position === 'admin' ? 'администратора' : position === 'psychologist' ? 'психолога' : 'родители'}</Link>

					</div>

				</div>

				<ul className="userList">
					<li className="userItem">
						<p className="item_text">Эмоции преподавателей</p>
						<div className="canvas">
							<CanvasJSChart options = {options}
							/>
						</div>
						
		<button className='dashboard_modal' style={{borderColor: theme, color: theme}} onClick={LateComersTeachers}>Опоздавшие : 1</button>
		<button className='dashboard_modal' style={{borderColor: theme, color: theme}} onClick={MissingTeachers}>Отсутствующие : 3</button>

					</li>

					<li className="userItem">
						<p className="item_text">Эмоции учеников</p>
						<div className="canvas">
							<CanvasJSChart options = {pupils}
							/>
						</div>
						
		<button className='dashboard_modal' style={{borderColor: theme, color: theme}} onClick={LateComersPupils}>Опоздавшие : 1</button>
		<button className='dashboard_modal' style={{borderColor: theme, color: theme}} onClick={MissingPupils}>Отсутствующие : 3</button>
					</li>
				</ul>
<LateComersTeacher lateComersTeacher={lateComersTeacher} setLateComersTeacher={setLateComersTeacher} />
			<LateComersPupil lateComersPupil={lateComersPupil} setLateComersPupil={setLateComersPupil}/>
			<MissingPupil missingPupil={missingPupil} setMissingPupil={setMissingPupil}/>
			<MissingTeacher missingTeacher={missingTeacher} setMissingTeacher={setMissingTeacher}/>
			</div>
		</div>
	);
}

export default Dashboard; 