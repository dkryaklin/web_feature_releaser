import { createStore } from 'redux'

function store(state = null, action) {
    if (action.type === 'SET_STORE') {
        return action.state;
    }
    return state;
}

export default createStore(store);