import { Reducer } from 'redux';
import { IStoreAction } from "../types";

// types
const SET_UI = 'SET_UI';


export interface UiState {
    showToast: boolean;
    toastMsg?: string;
    toastTitle?: string;
}

const defaultUi: UiState = {
    showToast: false,
    toastMsg: ''

}

//Action Creator
export const setUi: (user: UiState) => IStoreAction<UiState> = (ui: UiState) => ({
    type: SET_UI,
    payload: ui,
});



//Reducer
const uiReducer: Reducer<UiState, IStoreAction<any>> = (
    state = defaultUi,
    action: IStoreAction<any>,
) => {
    const { type, payload } = action;
    switch (type) {
        case SET_UI:
            return {
                ...state,
                ...payload,
            };
        default:
            return state;
    }
};

export default uiReducer;