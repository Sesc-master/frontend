import {Schedule, ScheduleType} from "../types/Schedule";
import {scheduleLessonGraphQLFields} from "../types/ScheduleLesson";
import reviver from "../../JSONReviver";

export default async function getSchedule(type: ScheduleType, weekday: number, name: string): Promise<Schedule> {
    return fetch("/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify({query: `{ getScheduleByName(type: "${type}", name: "${name}", weekday: ${weekday}) {
            type,
            lessons { ${scheduleLessonGraphQLFields.join(", ")} },
            diffs { ${scheduleLessonGraphQLFields.join(", ")} }
        } }`})
    })
        .then(response => response.text())
        .then(response => JSON.parse(response, reviver([
            ["type", "lessons", "diffs"],
            scheduleLessonGraphQLFields
        ])).get("data").get("getScheduleByName"));
}