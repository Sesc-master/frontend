import reviver from "../../JSONReviver";

export default async function getFreeClassrooms(weekday: number) : Promise<Array<Array<string>>> {
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