import React, {useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import './styles/Global.scss'
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import {setupIonicReact, IonApp, IonContent, IonPage, IonHeader} from "@ionic/react";
import AppHeader from "./components/appHeader/AppHeader";
import {BrowserRouter as Router} from "react-router-dom";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Navbar from "./components/navbar/Navbar";
import Box from "@mui/material/Box";
import ProjectRoutes from "./components/projectRoot/ProjectRoutes";
import ModalPage from "./components/modalPage/ModalPage";
import {Modal} from "./modules/Modal";
import Grades from "./pages/schedule/scheduleModalPages/Grades";
import Subjects from "./pages/subjects/Subjects";
import ScheduleType from "./pages/schedule/scheduleModalPages/ScheduleType";
import Teachers from "./pages/schedule/scheduleModalPages/Teachers";
import {StorageKey} from "./modules/StorageKey";
import {setIsDiaryLoading} from "./modules/effector/DiaryStore";
import {useLoadDiary} from "./hooks/useLoadDiary";
import {setNavbarItems} from "./modules/effector/AppSettingsSrore";
import {setGrade, setIsTeacher, setTeacher} from "./modules/effector/TimetableStore";
import {useLoadTimetable} from "./hooks/useLoadTimetable";

setupIonicReact({
	mode: 'ios',
	animated: true,
	rippleEffect: true,
});

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});

const App = () => {
	useEffect(() => {
		bridge.send("VKWebAppInit", {});
	}, []);

	useEffect(() => {
		if (localStorage.getItem(StorageKey.Login) !== null){
			const {login, password, type} =
				JSON.parse(localStorage.getItem(StorageKey.Login) || "{}")
			setIsDiaryLoading(true)
			useLoadDiary(login, password, type);
		}

		if (localStorage.getItem(StorageKey.NavbarItems) !== null){
			const navbarItems : any = JSON.parse(localStorage.getItem(StorageKey.NavbarItems) || "{}")
			setNavbarItems(navbarItems)
		}

		if (localStorage.getItem(StorageKey.Timetable) !== null) {
			const {teacher, grade, isTeacher} = JSON.parse(localStorage.getItem(StorageKey.Timetable) || "{}");
			setTeacher(teacher);
			setGrade(grade);
			setIsTeacher(isTeacher);
			useLoadTimetable(grade, teacher, isTeacher);
		}
	}, [])

	return (
		<ThemeProvider theme={darkTheme}>
			<IonApp>
				<IonContent>
					<Router>
						<IonPage>
							<Navbar/>
							<IonHeader>
								<AppHeader />
							</IonHeader>
							<IonContent>
							<Box className="panel">
								<ProjectRoutes />
								<div className="end"/>
							</Box>
							<ModalPage name={Modal.Grades}>
								<Grades />
							</ModalPage>
							<ModalPage name={Modal.Subjects}>
								<Subjects />
							</ModalPage>
							<ModalPage name={Modal.Type}>
								<ScheduleType />
							</ModalPage>
							<ModalPage name={Modal.Teachers}>
								<Teachers />
							</ModalPage>
							</IonContent>
						</IonPage>
					</Router>
				</IonContent>
			</IonApp>
		</ThemeProvider>
	);
}

export default App;
