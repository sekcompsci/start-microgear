export const UPDATECOMMAND = "updateCommand";

export function updateCommand(cmd) {
    return { type: UPDATECOMMAND, command: cmd }
}