export const INCREMENT_COUNTER = "INCREMENT_COUNTER";
export const DECREMENT_COUNTER = "DECREMENT_COUNTER";

//Action Creator
export const incrementCounter = () => ({
    type: INCREMENT_COUNTER
});

export const decrementCounter = () => ({
    type: DECREMENT_COUNTER
});


//Reducer
const counterReducer = (state = { value: 0 }, action) => {
    switch (action.type) {
        case INCREMENT_COUNTER:
            return { ...state, value: state.value + 1 };
        case DECREMENT_COUNTER:
            return { ...state, value: state.value - 1 };
        default:
            return { ...state };
    }
};


export default counterReducer;