import {UPDATECOMMAND} from './action';

let initState = {
    command: ''
};

function rootReducer(state = initState, action) {
    switch (action.type) {
        case UPDATECOMMAND:
            return {...state, command: action.command};
        default:
            return state
    }
}

export default rootReducer