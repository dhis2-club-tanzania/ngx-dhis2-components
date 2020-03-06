import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HttpClientComponent } from './containers/http-client/http-client.component';
import { DictionaryComponent } from './containers/dictionary/dictionary.component';
import { OrgUnitFilterComponent } from './containers/org-unit-filter/org-unit-filter.component';
import { PeriodFilterComponent } from './containers/period-filter/period-filter.component';
import { DataFilterComponent } from './containers/data-filter/data-filter.component';
import { DimensionFilterComponent } from './containers/dimension-filter/dimension-filter.component';
import { SelectionFiltersComponent } from './containers/selection-filters/selection-filters.component';

const routes: Routes = [
  {
    path: 'http-client',
    component: HttpClientComponent
  },
  { path: 'dictionary', component: DictionaryComponent },
  { path: 'org-unit-filter', component: OrgUnitFilterComponent },
  { path: 'period-filter', component: PeriodFilterComponent },
  { path: 'data-filter', component: DataFilterComponent },
  { path: 'dimension-filter', component: DimensionFilterComponent },
  {
    path: 'selection-filters',
    component: SelectionFiltersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
