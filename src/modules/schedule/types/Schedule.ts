import ScheduleLesson from "./ScheduleLesson";

export type ScheduleType = "group" | "teacher" | "auditory";

export class Schedule {
    type: ScheduleType;
    lessons: Array<ScheduleLesson>;
    diffs: Array<ScheduleLesson>;
}