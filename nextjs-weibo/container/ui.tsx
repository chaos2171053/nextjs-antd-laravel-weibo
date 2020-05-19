import React, { memo } from 'react'
import { connect } from "react-redux";
import { setUi, UiState } from '../store/modules/ui'
import MyToast from '../components/toast'
export interface IUiProps extends UiState {
    setUi: Function;
    ui: UiState;
}
const mapStateToProps = state => ({
    ui: state.ui
});
const mapDispatchToProps = {
    setUi,
};


function UIContainer(WarpperComponent) {
    function UI(props: IUiProps) {
        return (
            <>
                <WarpperComponent  {...props} />
            </>
        )
    }

    return connect(mapStateToProps, mapDispatchToProps)(memo(UI))
}

export default UIContainer;