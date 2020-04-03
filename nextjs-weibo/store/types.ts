import { UserState } from './modules/user';
// import { AppState } from './module/app';

export interface IStoreState {
    // app: AppState;
    user: UserState;
}

export interface IStoreAction<T> {
    type: string;
    payload: T;
}
