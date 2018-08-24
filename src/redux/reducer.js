import {UPDATECOMMAND, UPDATEEVENT} from './action';

let initState = {
    command: '',
    events: ['connect', 'message', 'found', 'lost']
};

function rootReducer(state = initState, action) {
    switch (action.type) {
        case UPDATECOMMAND:
            return {...state, command: action.command};
        case UPDATEEVENT:
            return {...state, events: action.events};
        default:
            return state
    }
}

export default rootReducer