export const UPDATECOMMAND = "updateCommand";
export const UPDATEEVENT = "updateEvents";

export function updateCommand(cmd) {
    return { type: UPDATECOMMAND, command: cmd }
}

export function updateEvents(events) {
    return { type: UPDATEEVENT, events }
}