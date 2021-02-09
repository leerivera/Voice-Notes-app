

const INITIAL_STATE = null


const textReducer = (state =INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_TEXT':
           
            return action.payload

        default:
            return state;

    }
}

export default textReducer;