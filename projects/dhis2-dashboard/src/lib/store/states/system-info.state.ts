import { BaseState, initialBaseState } from './base.state';

export interface SystemInfoState extends BaseState {
  systemInfo: any;
}

export const initialSystemInfoState: SystemInfoState = {
  ...initialBaseState,
  systemInfo: null,
};
