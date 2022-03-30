import { createReducer, on } from '@ngrx/store';
import { globalFilterChange } from '../actions/global-filter.actions';
import {
  globalFilterAdapter,
  initialGlobalFilterState,
  GlobalFilterState,
} from '../states/global-filter.state';

const reducer = createReducer(
  initialGlobalFilterState,
  on(globalFilterChange, (state, { globalFilter }) =>
    globalFilterAdapter.upsertOne(globalFilter, state)
  )
);

export function globalFilterReducer(state, action): GlobalFilterState {
  return reducer(state, action);
}
