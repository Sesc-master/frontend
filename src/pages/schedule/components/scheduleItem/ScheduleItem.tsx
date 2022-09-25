import React from "react";
import {TimetableElement} from "../../../../modules/schedule/format";
import Lesson from "./lesson/Lesson";
import styles from "../Components.module.scss"
import Time from "./time/Time";
import Paper from "@mui/material/Paper";

type IScheduleItem = {
    time : string [], 
    schedule: TimetableElement
}

const ScheduleItem = ({time, schedule}: IScheduleItem) => {
    return (
        <Paper className={styles.task}>
            <Time time={time}/>
            {schedule.lessons.map(lesson => (<Lesson lesson={lesson}/>))}
        </Paper>
    )
}

export default ScheduleItem;
