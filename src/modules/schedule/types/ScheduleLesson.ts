export default class ScheduleLesson {
    subject: string;
    teacher: string;
    group: string;
    auditory: string;
    subgroup: number;
    number: number;
    isChanged?: boolean;
};

export const scheduleLessonGraphQLFields = ["subject", "teacher", "group", "auditory", "subgroup", "number"];