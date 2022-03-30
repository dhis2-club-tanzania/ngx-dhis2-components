import { User } from '@iapps/ngx-dhis2-http-client';
import { BaseState, initialBaseState } from './base.state';

export interface UserState extends BaseState {
  currentUser: User;
}

export const initialUserState: UserState = {
  ...initialBaseState,
  currentUser: null,
};
