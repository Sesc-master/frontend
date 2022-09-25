import reviver from "../../JSONReviver";
import { IdableScheduleType, Schedule } from "../types/Schedule";

export async function getFreeClassrooms(weekday: number) : Promise<Array<Array<string>>> {
    return fetch("/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify({query: `{ getFreeClassrooms(weekday: ${weekday}) }`})
    })
        .then(response => response.text())
        .then(response => JSON.parse(response, reviver()).get("data").get("getFreeClassrooms"));
}

export async function getSchedule(type: IdableScheduleType, weekday: number, name: string): Promise<Schedule> {
    return fetch("/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify({query: `{ getScheduleByName(type: "${type}", name: "${name}", weekday: ${weekday}) {
            type,
            lessons { subject, teacher, group, uid, auditory, subgroup, number, weekday },
            diffs { subject, teacher, group, uid, auditory, subgroup, number, weekday }
        } }`})
    })
        .then(response => response.text())
        .then(response => JSON.parse(response, reviver([["type", "lessons", "diffs"], ["subject", "teacher", "group"]])).get("data").get("getScheduleByName"));
}
