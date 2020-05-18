import { UserState } from './modules/user';
import { UiState } from './modules/ui';
// import { AppState } from './module/app';

export interface IStoreState {
    // app: AppState;
    user: UserState;
    ui: UiState;
}

export interface IStoreAction<T> {
    type: string;
    payload: T;
}
