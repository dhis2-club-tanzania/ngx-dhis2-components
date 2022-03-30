import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';

export interface GlobalFilter {
  id: string;
  dataSelections: any[];
}
export interface GlobalFilterState extends EntityState<GlobalFilter> {}

export const globalFilterAdapter: EntityAdapter<GlobalFilter> =
  createEntityAdapter<GlobalFilter>({});

export const initialGlobalFilterState: GlobalFilterState =
  globalFilterAdapter.getInitialState({});
