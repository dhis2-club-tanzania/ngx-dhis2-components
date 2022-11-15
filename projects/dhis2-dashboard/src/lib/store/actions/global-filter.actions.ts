import { createAction, props } from '@ngrx/store';
import { GlobalFilter } from '../states/global-filter.state';

export const globalFilterChange = createAction(
  '[Global Filter] Global filter change',
  props<{
    globalFilter: GlobalFilter;
  }>()
);
